import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { FlatList,RefreshControl, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import AppContext from '../../../context/AppContext';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import Containers from '../../../assets/styles/Containers';
import Initialize_Socket from "../../../helpers/Socket/Socket";
import FooterComponent from '../../../components/FlatlistComponents/FooterComponent';
import { ActivityIndicator } from 'react-native-paper';
import PrimaryBtn from '../../../components/Buttons/PrimaryBtn';
import AddFriendBtn from '../../../components/Buttons/AddFriendsBtn';
import ReactNativeModal from 'react-native-modal';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import { CreateNameSubString } from '../../../helpers/UiHelpers/CreateSubString';

const AllFriends = (props) => {
  //            **************                    USE STATES      *****************
  const { theme ,darkThemeActivator} = useContext(ThemeContext)
  const { baseUrl, getToken, token, currentUser } = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [contactList, setContactList] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const showProfileModal = () => setProfileModal(true)
  const hideProfileModal = () => setProfileModal(false)

  const updateUserMessagesIsRead = async (chatId) => {
    try {
      const response = await fetch(`${baseUrl}/updateUserMessagesIsRead?chatId=${chatId}&userId=${currentUser.userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        console.log('Messages updated in the backend.');
      } else {
        console.error('Failed to update messages in the backend.');
      }
    } catch (error) {
      console.error('Error updating messages in the backend:', error);
    }
  };

  const onRefresh = () => {
    // Perform the data fetching or refreshing logic here
    // For example, you can fetch new messages from the server
    // and update the state to trigger a re-render
    setRefreshing(true);

    // Simulate fetching new data (replace this with your actual data fetching logic)
    setTimeout(() => {
      // const newMessages = [...contactList]; // Fetch new messages
      // setContactList(newMessages);
      fetchContactList()
      setRefreshing(false);
    }, 1000); // Add a delay to simulate the fetching process
  };
  const fetchContactList = useCallback(async () => {

    try {
      await fetch(`${baseUrl}/userContactsWithMessages?userId=${currentUser.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const data = await response.json();
        // if(data.message=="Please provide a valid token."){
        //   Alert.alert("Provide a valid token.")
        // }else if(data.message=='Please provide a token.'){
        //   Alert.alert('Token required')
        // }else{
          console.log("discussion ma all contacts",data)
          if(data!=[]){
        const filterContact = data.filter(contact => {
          // Check if senderID and currentUser.id are equal and deletedBySender is true
          if (
            contact.userId === currentUser.userId &&
            contact.deletedBySender === true
          ) {
            return false; // Don't include this message in the filtered list
          } else if (
            contact.friendId === currentUser.userId &&
            contact.deletedByReceiver === true
          ) {
            return false; // Don't include this message in the filtered list
          }

          return true; // Include other messages in the filtered list
        });
        setContactList(filterContact);
        setIsLoading(false)

      }}).catch((error) => {
        console.error('Error fetching contact list:', error);
        setIsLoading(false)
      })


    } catch (error) {
      console.error('Error fetching contact list:', error);
    }

  }, [baseUrl, currentUser.userId, token]);
  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setSearchedChat(contactList);
      setUserNotFound(false);
    } else {
      const filteredChats = contactList.filter(user =>
        user.contactData.name.toLowerCase().includes(text.toLowerCase())
      );
      setUserNotFound(filteredChats.length === 0);
      setSearchedChat(filteredChats)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken();
        await fetchContactList();
        setIsLoading(false);
      } catch (error) {
        console.error('Error in useEffect:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  
    props.navigation.addListener('focus', () => {
      fetchData();
    });
  
    // No need to specify dependencies for this effect
  }, []);
  
  // useEffect(async() => {
  //   console.log('fetchContactList>>>>>>')
  //   await getToken()
  //   await fetchContactList().then(() => { setIsLoading(false) })
  //   props.navigation.addListener('focus', () => {
  //     fetchContactList();
  //   });
  // }, [fetchContactList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <InnerScreensHeader navigation={props.navigation} screenName="All Friends" />
        {isLoading && <View style={Containers.centerContainer}><ActivityIndicator size="small" color={'black'} /></View>}

        {searchText !== '' && searchedChat.length === 0 && userNotFound === true ? (
          <View style={Containers.centerContainer}>
            <Text style={HomeNeoCards.noSearchResultText}>No user with this name.</Text>
          </View>
        ) :
          (
            contactList.length != 0 ?
              <FlatList style={{ marginTop: 10 }}
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                data={searchedChat != '' ? searchedChat : contactList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                    onPress={() => {
                      updateUserMessagesIsRead(item._id)
                      props.navigation.navigate('InnerScreens', {
                        screen: 'UserChat',
                        params: { contact: item, allMsgs: item.allMessages ? item.allMessages : null },
                      });
                    }}
                  // onLongPress={() => {
                  //   if (callingScreen === 'Discussions') {
                  //     // handleLongPress(item)
                  //     handleLongPressforDelete(item);
                  //   }
                  // }}
                  >
                    <View style={HomeNeoCards.flatlistItemContainer}>
                      <Neomorph
                        darkShadowColor={AppColors.primary} // <- set this
                        lightShadowColor={AppColors.white} // <- this
                        swapShadows
                        style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}>
                        <TouchableOpacity
                          onPress={() => {
                            showProfileModal();
                            // console.log("dp", dp)
                          }}>
                          {item.contactData?.profileImage == null ? (
                            <View style={HomeNeoCards.dpVew}>
                              <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                                {callingScreen === 'Discussions' ? (
                                  <Icons.MaterialIcons
                                    name={'person'}
                                    size={29}
                                    color={theme.groupDpIconColor}
                                  />
                                ) : (
                                  <Icons.Ionicons
                                    name={'people'}
                                    size={23}
                                    color={theme.groupDpIconColor}
                                  />
                                )}
                              </View>
                            </View>
                          ) : (
                            <Image
                              source={{ uri: `${baseUrl}/${item.contactData?.profileImage}` }}
                              style={HomeNeoCards.dpImage}
                            />
                          )}
                        </TouchableOpacity>
              
                        {/* profile name view */}
                        <View style={HomeNeoCards.nameAndMsgContainer}>
                          <View style={HomeNeoCards.nameAndTimeContainer}>
                            <Text style={HomeNeoCards.profileName(theme.profileNameColor)}>
                              {item.contactData?.name && CreateNameSubString(item.contactData?.name)}
                            </Text>
                          </View>
                        </View>
                      </Neomorph>
                    </View>
                    <ReactNativeModal
                      visible={profileModal}
                      coverScreen={true}
                      style={HomeNeoCards.modalContainer}
                      animationIn="slideInUp"
                      animationOut="slideInDown"
                      onDismiss={hideProfileModal}
                      onBackdropPress={hideProfileModal}
                      onBackButtonPress={hideProfileModal}>
                      <View style={HomeNeoCards.modalView}>
                        <View style={HomeNeoCards.dpHeader}>
                          <Text style={HomeNeoCards.profileName(AppColors.black)}>
                            {item.contactData?.name
                              ? CreateNameSubString(item.contactData?.name)
                              : null}
                          </Text>
                        </View>
                        {item.contactData?.profileImage == null ? (
                          <View>
                            <Image
                                source={require('../../../assets/imges/default/userProfileDark.jpg')}
                                style={HomeNeoCards.dpInModal}
                              />
                          </View>
                        ) : (
                          <View>
                            <Image
                              source={{ uri: `${baseUrl}/${item.contactData?.profileImage}` }}
                              style={HomeNeoCards.dpInModal}
                            />
                          </View>
                        )}
                      </View>
                    </ReactNativeModal>
                  </TouchableOpacity>
                                )
                }}
                ListFooterComponent={FooterComponent}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#7E8DF5" // Customize the pull-to-refresh indicator color
                  />
                }
              />
              :
              !isLoading && (
                  <View style={Containers.centerContainer}>
                    <Text style={HomeNeoCards.noSearchResultText}>You have no friends.</Text>                 
                  <AddFriendBtn btnTitle={'Add Friends'} onPress={()=>{props.navigation.navigate("DrawerStack",{screen:"Home",params:{screen:"Discover"}})}}/>  
                </View>
              )
          )}
      </View>
    </SafeAreaView>
  )
}
export default AllFriends