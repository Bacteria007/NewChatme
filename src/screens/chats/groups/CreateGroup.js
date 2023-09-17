import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, ScrollView, TextInput, Alert, Image, ActivityIndicator, } from 'react-native';
import AppContext from '../../../context/AppContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import { Icons } from '../../../assets/Icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import CommonApis from '../../../components/HelperFunctions/GlobalApiz/Apis';
import AppColors from '../../../assets/colors/Appcolors';
import { Surface } from 'react-native-paper';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeModal from 'react-native-modal';
import CreateGroupScreenStyle from '../../../assets/styles/GroupScreenStyle/CreateGroupScreenStyle';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import FontStyle from '../../../assets/styles/FontStyle';

const CreateGroup = ({ navigation }) => {
  // STATES
  const { baseUrl, currentUser,token } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [allUsers, setAllUsers] = useState([]);
  const [groupName, setgroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const commonApis = CommonApis();
  const [selectedMembersCount, setSelectedMembersCount] = useState(0);
  const [isCreating, setIsCreating] = useState(false)

  const incrementMemberCount = () => {
    setSelectedMembersCount(prevCount => prevCount + 1);
  };

  const decrementMemberCount = () => {
    setSelectedMembersCount(prevCount => prevCount - 1);
  };

  //
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const toggleModal = () => setVisible(!visible);
  // FUNCTIONS

  const fetchAllUsers = async () => {
    const userid = await AsyncStorage.getItem('user');
    const parseId = await JSON.parse(userid);

    try {
      const response = await fetch(`${baseUrl}/allAvailableUsers`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const filteredUsers = data.filter(
        user => user._id != currentUser.userId, // id KI BASE PR SEARCH HO RAHI HAI
      );
      // Add the 'isSelected' field to each item in the filteredUsers array
      const usersWithIsSelectedField = filteredUsers.map(user => ({
        ...user,
        isSelected: false, // Set the initial value for 'isSelected' as false
      }));

      setAllUsers(usersWithIsSelectedField);
    } catch (error) {
      console.error('Error fetching all users', error);
    }
  };
  const toggleSelection = item => {
    // jo database mn ssy array i hy users ki us mn isSelected field agr false hy to us item ko selected member wali array mn add krdo
    setAllUsers(prevUsers =>
      prevUsers.map(user => {
        if (user._id === item._id) {
          if (!item.isSelected) {
            setSelectedMembers(prevSelected => [...prevSelected, item]);
            incrementMemberCount()
          } else {
            setSelectedMembers(prevSelected =>
              prevSelected.filter(selectedUser => selectedUser._id !== item._id),

            );
            decrementMemberCount()
          }
          return { ...user, isSelected: !user.isSelected };
        }
        console.log("all ", allUsers)
        return user;
      }),
    );
  };
  const createNewGroup = async name => {
    if (selectedMembers.length >= 2) {
      if(name!=''){
      setIsCreating(true)
    const admin_data = await commonApis.UserDetails();
    console.log('admin data=========', admin_data);
    selectedMembers.push(admin_data);
    console.log('selectedMembers', selectedMembers);
    const formData = new FormData();
    formData.append('group_name', name);
    formData.append('group_admin', currentUser.userId);
    formData.append('members', JSON.stringify(selectedMembers));
    // if (selectedMembers.length >=2) {
      await axios({
        method: 'post',
        url: `${baseUrl}/creategroup`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then(async res => {
          // if(res.data.message=="Please provide a valid token."){
          //   Alert.alert("Provide a valid token.")
          // }else if(res.data.message=='Please provide a token.'){
          //   Alert.alert('Token required')
          // }else{
          console.log('group create=========', res.data);
          console.log('group length===============', res.data.members.length);
          setIsCreating(true)
          setSelectedMembers([]);
          
          // Change isSelected field to false for all members in selectedMembers array
          setSelectedMembers(prevSelected =>
            prevSelected.map(member => ({ ...member, isSelected: false })),
          );
          const yaha=res.data.members.isSelected(false);
          console.log("yaha+++++++++++++++",yaha)
          // navigation.navigate('Groups');
        // }
        })
        .catch(error => {
          console.log('error in creatng group', error);
        });
      } else{

        Alert.alert('pleaes enter subject of group');
      }
      } else {
        Alert.alert('pleaes add at least 3 member');
      }
    // } else {
    //   Alert.alert('pleaes add at least 3 member');
    // }
  };
  const renderItem = ({ item }) => {
    console.log("---craedet---",item)
    return (
      <View style={HomeNeoCards.flatlistItemContainer}>
        <Neomorph
          darkShadowColor={AppColors.primary} // <- set this
          lightShadowColor={AppColors.primary}// <- this
          swapShadows
          style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              {!item.profileImage ? (
                <View style={HomeNeoCards.dpVew}>
                  <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                    <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />
                  </View>
                </View>
              ) : (
                <Image source={{ uri: `${baseUrl}${item.profileImage}` }} style={HomeNeoCards.dpImage} />
              )}
                <Text  style={CreateGroupScreenStyle.profileName(theme.profileNameColor)}>
                  {item.name}
                </Text>
            </View>
            {/* select btn*/}
            <TouchableOpacity
              onPress={() => toggleSelection(item)}
              style={CreateGroupScreenStyle.addBtn}>
              {item.isSelected ? (
                <View style={CreateGroupScreenStyle.doneButton(AppColors.primary)}>
                  <Icons.AntDesign name="close" size={21} color={theme.addBtnTextColor} />
                </View>
              ) : (
                // <Avatar.Icon size={30} icon={"cross"} color='white' style={{backgroundColor:'red'}}/>
                <Neomorph swapShadows style={HomeNeoCards.addUserinGroup(AppColors.primary)}>
                  <Text style={{ color: theme.addBtnTextColor }}>Add</Text>
                  {/* <Icons.Ionicons name='person-add-sharp' size={20} color={theme.addBtnTextColor} /> */}
                </Neomorph>
              )}
            </TouchableOpacity>
          </View>
        </Neomorph>
      </View>
    );
  };
  // HOOKS
  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    console.log(
      'selected members useffect###########################',
      selectedMembers,
    );
  }, [selectedMembers]);
  // selectedmember array mn jab member ad kry to foran nai hoty dosri dfa click krny pr hoty is liye ye lgaya ta k jab array update ho useeffect chal jaye
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Primary_StatusBar />
      <View style={CreateGroupScreenStyle.headerContainer}>
        <View style={CreateGroupScreenStyle.header(theme.backgroundColor)}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icons.Ionicons
                name="arrow-back"
                size={wp('7%')}
                color={theme.headerIconsColor}
                style={{ marginLeft: wp('2%') }}
              />
            </TouchableOpacity>
            <Text style={[DrawerHeaderStyle.screenNameStyle, { color: theme.headerIconsColor }]}>Create Group</Text>
          </View>
          <TouchableOpacity onPress={() => { toggleModal() }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont }}>Create</Text>
              {selectedMembers.length > 0 ?
                <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont }}>({selectedMembersCount})</Text>
                : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={CreateGroupScreenStyle.container}>
        {selectedMembers.length > 0 ? (
          <Surface>
            <View style={CreateGroupScreenStyle.memberlistContainer}>
              <ScrollView horizontal>
                {selectedMembers.map(member => {
                  console.log("-------memeber img-------",member)
                  return (
                    <View key={member._id} style={CreateGroupScreenStyle.nameAndDpOfSelected}>
                      <Image style={CreateGroupScreenStyle.memberDp} source={{ uri: `${baseUrl}${member.profileImage}` }} />
                      <Text style={CreateGroupScreenStyle.memberName}>{member.name?(member.name.length > 7 ? member.name.substring(0, 7) + '..' : member.name):'no user name'}</Text>
                    </View>
                  );
                })}
              </ScrollView>
              {/* <Text style={[HomeNeoCards.profileName(theme.profileNameColor),{textAlign:'center'}]}>Selected Members</Text> */}
            </View>
          </Surface>

        ) : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allUsers.length > 0 ? allUsers : null}
          renderItem={renderItem}
          style={{ marginTop: 15 }}
        />
        <ReactNativeModal
          visible={visible}
          onBackButtonPress={hideModal}
          onDismiss={hideModal}
          animationIn='bounceIn'
          animationOut='bounceOut'
          animationType='bounce'
          avoidKeyboard={false}
          style={CreateGroupScreenStyle.modalStyle}>
          {/* <Surface> */}
          <View style={CreateGroupScreenStyle.modalView}>
            <TextInput
              autoFocus={true}
              cursorColor={AppColors.primary}
              style={{
                borderBottomWidth: wp('0.1%'),
                borderBottomColor: AppColors.primary,
                width: wp('100%'),
                paddingHorizontal: 10,
                fontFamily:FontStyle.regularFont,
              }}
              placeholderTextColor={theme.profileNameColor}
              selectTextOnFocus={true}
              value={groupName}
              onChangeText={e => {
                setgroupName(e);
              }}
              placeholder="Group Subject"
              keyboardType='default'
            />
            <TouchableOpacity
              style={CreateGroupScreenStyle.createBtn}
              onPress={() => createNewGroup(groupName).then(() => { hideModal(), setgroupName('') })}>
              {isCreating ?
                <ActivityIndicator size="small" color={"white"} /> :
                <Text
                  style={{ color: theme.buttonsTextColor, fontFamily: FontStyle.regularFont }}>
                  Create Now
                </Text>
              }
            </TouchableOpacity>
          </View>
          {/* </Surface> */}
        </ReactNativeModal>
      </View>
    </SafeAreaView >
  );
};

export default CreateGroup;