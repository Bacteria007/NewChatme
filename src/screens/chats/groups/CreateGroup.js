import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  // TextInput,
  Alert,
} from 'react-native';
import AppContext from '../../../context/AppContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import CommonApis from '../../../utils/Apis';
// import { FAB } from 'react-native-paper';
import FAB from 'react-native-fab';
import AppColors from '../../../assets/colors/Appcolors';
import {
  Button,
  TextInput,
  Modal,
  Portal,
  Provider,
  Surface,
} from 'react-native-paper';
import FontStyle from '../../../assets/styles/FontStyle';

const CreateGroup = () => {
  // STATES
  const { baseUrl } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [allUsers, setAllUsers] = useState([]);
  const [groupName, setgroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const commonApis = CommonApis();
  const refRBSheet = useRef();
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
        user => user._id != parseId, // id KI BASE PR SEARCH HO RAHI HAI
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
            // yaha msla ye hy k jab wo us item ko click kry ga to usy selected member wali array mn rak sy ga mgr isseected ko true nai kry ga wo flase e jati hy
            // usko agr mn khud true kron to sari working khrab ho jati ku k us k true false ki base pe add ho rha 
            // If selecting, add to selectedMembers
            setSelectedMembers(prevSelected => [...prevSelected, item]);
          } else {
            // selected member wali array mn agr wo item pehly sy hy or user ny phr sy click kiya mtlab cross pr click kiya to wo usko remove krdy ga selecetd member wali array sy
          // If deselecting, remove from selectedMembers
            setSelectedMembers(prevSelected =>
              prevSelected.filter( selectedUser => selectedUser._id !== item._id),
            );
          }
          return { ...user, isSelected: !user.isSelected };
        }
        console.log("all ",allUsers)
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
    formData.append('group_admin', parseId);
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
      <View style={[HomeNeoCards.flatlistItemContainer]}>
        {/* discussion content container */}
        <Neomorph
        darkShadowColor={AppColors.purple}
          swapShadows
          style={{
            shadowRadius: 0.6,
            borderRadius: wp('1.5'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: hp('10%'),
            width: wp('95%'),
            backgroundColor: theme.homeCardColor,
          }}>
          <View style={HomeNeoCards.nameAndMsgContainer}>
            <Text
              style={HomeNeoCards.profileName(theme.profileNameColor)}>
              {item.name}
            </Text>
            <Text style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
              {item.phoneNo}
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
              // <Neomorph  swapShadows style={[HomeNeoCards.addUserinGroup,{width:wp('17')}]}>
              //   <Text style={{ color: "black" }}>Remove</Text>
              // </Neomorph>
              <View style={styles.doneButton(theme.addBtnColor)}>
                <Icons.Entypo name="cross" size={23} color={theme.addBtnTextColor} />
              </View>
            ) : (
              // <Avatar.Icon size={30} icon={"cross"} color='white' style={{backgroundColor:'red'}}/>
              <Neomorph swapShadows style={HomeNeoCards.addUserinGroup(theme.addBtnColor)}>
                <Text style={{ color: theme.addBtnTextColor }}>Add</Text>
                {/* <Icons.Ionicons name='person-add-sharp' size={20} color={theme.addBtnTextColor} /> */}
              </Neomorph>
            )}
          </TouchableOpacity>
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
    <Provider>
      <View style={styles.container}>
        <Surface>
          {selectedMembers.length > 0 ? (
            <View style={styles.memberlistContainer}>
              <ScrollView horizontal>
                {selectedMembers.map(member => {
                  return (
                    <View key={member._id} style={styles.selectedMember}>
                      <Text>{member.name}</Text>
                      <Text>{member.phoneNo}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
        </Surface>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allUsers.length > 0 ? allUsers : null}
          renderItem={renderItem}
        />
        <FAB
          buttonColor={theme.buttonsColor}
          iconTextColor={theme.buttonsTextColor}
          onClickAction={() => {
            showModal();
            // refRBSheet.current.open()
          }}
          visible={visible ? false : true}
          iconTextComponent={<Icons.AntDesign name="arrowright" />}
        />
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
                backgroundColor:theme.buttonsColor,
              }}
              onPress={() => createNewGroup(groupName).then(()=>{hideModal(),setgroupName('')})}>
              <Text
                style={{ color:theme.buttonsTextColor, fontFamily: FontStyle.regularFont }}>
                Create Group
              </Text>
            </Button>
          </Modal>
        </Portal>
        {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <TextInput label={"Group Subject"} mode='outlined' value={groupName} onChangeText={(e) => { setgroupName(e) }} placeholder='Group Name' />
        <Button mode='contained' style={{ width: wp('70'), alignSelf: 'center', margin: 10}} onPress={() => createNewGroup(groupName)}>
          <Text style={{ color: 'white' }}>Create Group</Text>
        </Button>
      </RBSheet> */}
      </View>
    </Provider>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgprimary,
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
  },
  doneButton:(btnColor)=>({
    height: hp('4.5'),
    width: hp('4.5'),
    borderRadius: hp('4.5'),
    backgroundColor: btnColor ,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    elevation: 4,
  }),
  selectedMember: {
    height: hp('12'),
    width: hp('12'),
    borderRadius: hp('12'),
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
});
