import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, ScrollView, Image, } from 'react-native';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import { Icons } from '../../../assets/Icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import { FAB } from 'react-native-paper';
import { NewGroupScreen_StatusBar, Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateGroupScreenStyle from '../../../assets/styles/GroupScreenStyle/CreateGroupScreenStyle';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import NewGroup from './NewGroup';
import { CheckBox } from '@rneui/themed';
import CustomSearchBar from '../../../components/SearchBars/CustomSearchBar';
import { capitalizeFirstLetter } from '../../../helpers/UiHelpers/CapitalizeFirstLetter';
import FooterComponent from '../../../components/FlatlistComponents/FooterComponent';

const CreateGroup = ({ navigation }) => {
  // STATES
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersCount, setSelectedMembersCount] = useState(0);
  const [toggleScreen, setToggleScreen] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedMembers, setSearchedMembers] = useState([])

  const incrementMemberCount = () => {
    setSelectedMembersCount(prevCount => prevCount + 1);
  };
  const decrementMemberCount = () => {
    setSelectedMembersCount(prevCount => prevCount - 1);
  };

  //  // FUNCTIONS

  const handleSearch = (text) => {
    console.log("LLLLLL", allUsers)
    setSearchText(text)

    if (text === '') {
      // If search query is empty, show all users
      setSearchedMembers(allUsers)
    } else {
      const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
      setSearchedMembers(filteredUsers)
    }
  }
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
      // console.log(usersWithIsSelectedField)
    } catch (error) {
      console.error('Error fetching all users', error);
    }
  };

  const toggleSelection = (item) => {
    // if not selected then select and add in selected array
    if (!item.isSelected) {
      setSelectedMembers((prevSelected) => [...prevSelected, item]);
      incrementMemberCount();
    }
    // if already selected then deselect remove from selected array
    else {
      setSelectedMembers((prevSelected) =>
        prevSelected.filter((selectedUser) => selectedUser._id !== item._id)
      );
      decrementMemberCount();
    }
    item.isSelected = !item.isSelected;
  };

  const deselectMember = item => {
    console.log("jjj", item)
    setAllUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user._id === item._id) {
          return { ...user, isSelected: false };
        }
        return user;
      });
    });

    setSelectedMembers(prevSelected => prevSelected.filter(selectedUser => selectedUser._id !== item._id));
    decrementMemberCount()
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = index === (allUsers.length - 1);
    console.log("fgfhgk", isLastItem)
    return (
      <TouchableOpacity onPress={() => { toggleSelection(item) }}>
        <View style={CreateGroupScreenStyle.flatlistItemStyle(theme.homeCardColor)}>
          {/* Profile Image */}
          <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
            {!item.profileImage ? (
              <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />
            ) : (
              <Image source={{ uri: `${baseUrl}${item.profileImage}` }} style={CreateGroupScreenStyle.dpImage} />
            )}
          </View>
          {/* Right Section (Checkbox and Profile Name) */}
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp('75'), paddingLeft: wp('5') }}>
              <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                <Text style={CreateGroupScreenStyle.profileName(theme.profileNameColor)}>
                  {capitalizeFirstLetter(item.name)}
                </Text>
                <Text style={CreateGroupScreenStyle.phoneText}>
                  {item.phoneNo}
                </Text>
              </View>
              <CheckBox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={item.isSelected}
                checkedColor={AppColors.primary}
                uncheckedColor={AppColors.gray}
                onPress={() => {
                  toggleSelection(item)
                }}
                containerStyle={{ marginRight: wp('-0.2'), padding: 0 }}

              />
            </View>
          </View>
        </View>
        {!isLastItem &&
          <View style={CreateGroupScreenStyle.horizontalLineStyle}></View>
        }
      </TouchableOpacity>

    );
  };
  // HOOKS
  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setSelectedMembers([{
      "_id": currentUser.userId,
      "name": currentUser.name,
      "phoneNo": currentUser.phoneNumber,
      "profileImage": currentUser.profileImage,
    }]);
    // OR
    // setSelectedMembers([admin_data])
  }, []);
  // useEffect(() => {
  //   console.log(
  //     'selected members useffect###########################',
  //   selectedMembers,
  //   );
  // }, [selectedMembers]);
  // selectedmember array mn jab member ad kry to foran nai hoty dosri dfa click krny pr hoty is liye ye lgaya ta k jab array update ho useeffect chal jaye
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {toggleScreen === 1 ?
        <>
          <Primary_StatusBar />
          <InnerScreensHeader screenName={"Create Group"} navigation={navigation} />
          <View style={CreateGroupScreenStyle.container(theme.backgroundColor)}>
            <CustomSearchBar searchQuery={searchText} handleSearchOnChange={handleSearch} />
            {selectedMembers.length > 1 && (
              <View style={CreateGroupScreenStyle.memberlistContainer(darkThemeActivator)}>

                <ScrollView horizontal>
                  {selectedMembers
                    .filter(member => member._id !== currentUser.userId) // Filter out the current user
                    .map(member => {
                      return (
                        <View key={member._id} style={CreateGroupScreenStyle.nameAndDpOfSelected}>
                          <View style={{ position: 'relative' }}>
                            {!member.profileImage ?
                              // <View style={CreateGroupScreenStyle.circleAroundMemberDp}>
                                <View style={CreateGroupScreenStyle.memberDpInCreateGroup}>
                                  <Icons.MaterialIcons name={'person'} size={29} color={theme.profileNameColor} />
                                </View>
                              :
                              <Image style={CreateGroupScreenStyle.memberDpInCreateGroup} source={{ uri: `${baseUrl}${member.profileImage}` }} />
                             
                            }
                            <TouchableOpacity onPress={() => { deselectMember(member) }} style={CreateGroupScreenStyle.deSelectIconBtn}>
                              <Icons.AntDesign name="close" size={10} color="white" />
                            </TouchableOpacity>
                          </View>
                          <Text style={CreateGroupScreenStyle.memberName}>
                            {member.name ? (member.name.length > 7 ? capitalizeFirstLetter(member.name.substring(0, 7)) + '..' : capitalizeFirstLetter(member.name)) : 'no user name'}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            )}

            {selectedMembers.length > 0 && darkThemeActivator && <View style={{ borderWidth: 0.4, borderColor: AppColors.gray, width: wp('100') }}></View>}
            <View style={{ width: wp('100'), flex: 1, borderTopRightRadius: wp('8'), borderTopLeftRadius: wp('8'), alignSelf: 'flex-end', paddingTop: 10, }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={searchedMembers.length != 0 ? searchedMembers : allUsers.length > 0 ? allUsers : null}
                renderItem={renderItem}
                style={{ marginTop: 15 }}
                ListFooterComponent={FooterComponent}
              />
            </View>
            <FAB
              icon="arrow-right"
              style={CreateGroupScreenStyle.fab}
              onPress={() => {
                // setToggleScreen(0)
                navigation.navigate("InnerScreens", { screen: "NewGroup", params: { selectedMembers: selectedMembers, deselectMember: (item) => deselectMember(item) } })
              }}
              color={AppColors.white}
            />
          </View>
        </>
        // {/* ================================================ CREATE NOW SCREEN ============================================================= */}
        :
        <NewGroup navigation={navigation} selectedMembers={selectedMembers} deselectMember={(item) => deselectMember(item)} />
      }
    </SafeAreaView>
  );
};

export default CreateGroup;
