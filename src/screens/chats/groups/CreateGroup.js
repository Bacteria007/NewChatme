import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, TextInput, Alert, Image, } from 'react-native';
import AppContext from '../../../context/AppContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import { Icons } from '../../../assets/Icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import CommonApis from '../../../components/HelperFunctions/GlobalApiz/Apis';
import AppColors from '../../../assets/colors/Appcolors';
import { Surface } from 'react-native-paper';
import FontStyle from '../../../assets/styles/FontStyle';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import {Primary_StatusBar} from '../../../components/statusbars/Primary_StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeModal from 'react-native-modal';
const CreateGroup = ({ navigation }) => {
  // STATES
  const { baseUrl, storedUser } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [allUsers, setAllUsers] = useState([]);
  const [groupName, setgroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const commonApis = CommonApis();
  const [selectedMembersCount, setSelectedMembersCount] = useState(0);

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
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const filteredUsers = data.filter(
        user => user._id != storedUser.userId, // id KI BASE PR SEARCH HO RAHI HAI
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
    const adminId = await AsyncStorage.getItem('user');
    const parseId = await JSON.parse(adminId);

    const admin_data = await commonApis.UserDetails();
    console.log(
      'admin data============================================',
      admin_data,
    );
    // setSelectedMembers( [...selectedMembers, admin_data]);
    selectedMembers.push(admin_data);
    console.log('selectedMembers', selectedMembers);
    const formData = new FormData();
    formData.append('group_name', name);
    formData.append('group_admin', storedUser.userId);
    formData.append('members', JSON.stringify(selectedMembers));
    if (selectedMembers.length > 0) {
      await axios({
        method: 'post',
        url: `${baseUrl}/creategroup`,
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
        },
        data: formData,
      })
        .then(async res => {
          // const result=await res.json()
          console.log('group create=========', res.data);
          console.log('group length===============', res.data.members.length);
          setSelectedMembers([]);
          // Change isSelected field to false for all members in selectedMembers array
          setSelectedMembers(prevSelected =>
            prevSelected.map(member => ({ ...member, isSelected: false })),
          );
        })
        .catch(error => {
          console.log('error in creatng group', error);
        });
    } else {
      Alert.alert('pleaes add at least one member');
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={HomeNeoCards.flatlistItemContainer}>
        <Neomorph
          darkShadowColor={AppColors.primary} // <- set this
          lightShadowColor={AppColors.primary}// <- this
          swapShadows
          style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
        >
          {!item.profileImage ? (
            <View style={HomeNeoCards.dpVew}>
              <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>

                <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />

              </View>
            </View>
          ) : (
            <Image source={{ uri: `${baseUrl}${item.profileImage}` }} style={HomeNeoCards.dpImage} />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
            <View style={HomeNeoCards.callNameAndTimeContainer}>
              <Text
                style={HomeNeoCards.profileName(theme.profileNameColor)}>
                {item.name}
              </Text>
            </View>

            {/* select member*/}
            <TouchableOpacity
              onPress={() => toggleSelection(item)}
              style={{
                height: hp('5%'),
                width: wp('13%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.isSelected ? (
                <View style={styles.doneButton(AppColors.primary)}>
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
      {/* <InnerScreensHeader screenName={"Create Group"} navigation={navigation}/> */}
      <Primary_StatusBar />
      <View style={styles.headerContainer}>
        <View style={styles.header(theme.backgroundColor)}>
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
      <View style={styles.container}>
        {selectedMembers.length > 0 ? (
          <Surface>
            <View style={styles.memberlistContainer}>
              <ScrollView horizontal>
                {selectedMembers.map(member => {
                  return (
                    <View key={member._id} style={styles.selectedMember}>
                      <Text style={{fontFamily:FontStyle.mediumFont,fontSize:wp('3'),color:AppColors.primary}}>{member.name.length>7?member.name.substring(0,7)+'..':member.name}</Text>
                      <Text style={{fontFamily:FontStyle.mediumFont,fontSize:wp('2.5'),color:AppColors.coolgray}}>{member.phoneNo}</Text>
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
          style={{marginTop:15}}
        />
        <ReactNativeModal
          visible={visible}
          onBackButtonPress={hideModal}
          onDismiss={hideModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            margin: 0,
            justifyContent: 'flex-end',
            height: hp('30')
          }}>
          <Surface>
            <View style={styles.modalView}>
              <TextInput
                autoFocus={true}
                cursorColor={AppColors.primary}
                style={{
                  borderBottomWidth: wp('0.1%'),
                  borderBottomColor: AppColors.primary,
                  width: wp('100%'),
                  paddingHorizontal: 10
                }}
                selectTextOnFocus={true}
                value={groupName}
                onChangeText={e => {
                  setgroupName(e);
                }}
                placeholder="Group Name"
                keyboardType='default'
              />
              <TouchableOpacity

                style={{
                  width: wp('40'),
                  alignSelf: 'center',
                  backgroundColor: theme.buttonsColor,
                  justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: wp('20')
                }}
                onPress={() => createNewGroup(groupName).then(() => { hideModal(), setgroupName(''), navigation.navigate('Groups') })}>
                <Text
                  style={{ color: theme.buttonsTextColor, fontFamily: FontStyle.regularFont }}>
                  Create Now
                </Text>
              </TouchableOpacity>
            </View>
          </Surface>
        </ReactNativeModal>
      </View>
    </SafeAreaView >
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp('100'),
    width: wp('100'),
  },
  memberlistContainer: {
    flexDirection: 'row',
    height: hp('15'),
    width: wp('100'),
    // borderBottomColor: AppColors.primary,
    // borderBottomWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: AppColors.Mauve,

  },
  doneButton: (btnColor) => ({
    height: hp('4.5'),
    width: hp('4.5'),
    borderRadius: hp('4.5'),
    backgroundColor: btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    elevation: 4,
  }),
  selectedMember: {
    height: hp('10'),
    width: hp('10'),
    borderRadius: hp('5'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  header: (bgcolor) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    backgroundColor: bgcolor,
  }),
  headerContainer: {
    height: hp('7'),
    width: wp('100')

  },
  modalView: {
    // backgroundColor: "#D8BFD8",
    height: hp('25'),
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },


});


{/* <Button
          mode="contained"
          style={{
            width: wp('40'),
            alignSelf: 'center',
            margin: 10,
            backgroundColor: theme.buttonsColor,
          }}
          onPress={() => toggleModal()}>
          <Text>Create Now</Text>
        </Button>         
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              height: hp('30'),
              width: wp('87'),
              alignSelf: 'center',
              padding: wp('4'),
              borderRadius: 5,
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              label="Group Name"
              mode="outlined"
              value={groupName}
              onChangeText={e => {
                setgroupName(e);
              }}
              placeholder="Group Name"
              selectTextOnFocus
            />
            <Button
              mode="contained"
              style={{
                width: wp('40'),
                alignSelf: 'center',
                margin: 10,
                backgroundColor: theme.buttonsColor,
              }}
              onPress={() => createNewGroup(groupName).then(() => { hideModal(), setgroupName('') })}>
              <Text
                style={{ color: theme.buttonsTextColor, fontFamily: FontStyle.regularFont }}>
                Create Group
              </Text>
            </Button>
          </Modal>
        </Portal> */}