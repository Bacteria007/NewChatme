import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, RefreshControl, View, SafeAreaView, Text, TouchableOpacity, BackHandler } from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import AppContext from '../../../context/AppContext';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import BotDiscussion from './BotDscussion';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import Containers from '../../../assets/styles/Containers';
import Initialize_Socket from "../../../helpers/Socket/Socket";
import FooterComponent from '../../../components/FlatlistComponents/FooterComponent';
import { ActivityIndicator } from 'react-native-paper';
import PrimaryBtn from '../../../components/Buttons/PrimaryBtn';
import AddFriendBtn from '../../../components/Buttons/AddFriendsBtn';
import AppActivityIndicator from '../../../components/FlatlistComponents/AppActivityIndicator';
import UseScreenFocus from '../../../helpers/AutoRefreshScreen/UseScreenFocus';
import { initializeZego, uninitZegoFunc } from '../../../helpers/ZegoCloudFunction/ZegoInitFunction';
import TranslationFile from '../../../assets/translation/TranslationFile';

const Discussions = (props) => {
  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const { baseUrl, getToken, token, currentUser ,language} = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [contactList, setContactList] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchContactList()
    setRefreshing(false);
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
        console.log("discussion ma all contacts", data)
        if (data != []) {
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

        }
      }).catch((error) => {
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
    props.navigation.addListener('focus', () => {
      console.log('📞📞📞📞📞init zego in app');
      initializeZego(currentUser.userId, currentUser.name);
    });
  }, []);

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
    fetchData()
    props.navigation.addListener('focus', () => {
      fetchContactList()
    });

  }, [fetchContactList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
        <Primary_StatusBar />
        <AppHeader navigation={props.navigation} headerTitle={TranslationFile[language].Chats} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        <BotDiscussion navigation={props.navigation} />
        {isLoading && <View style={Containers.centerContainer}>
          <AppActivityIndicator />
        </View>}
        {searchText !== '' && searchedChat.length === 0 && userNotFound === true ? (
          <View style={Containers.centerContainer}>
            <Text style={HomeNeoCards.noSearchResultText}>{TranslationFile[language].No_user_with_this_name}</Text>
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
                    <RenderComponent
                      name={item.contactData?.name}
                      dp={item.contactData?.profileImage}
                      callingScreen={"Discussions"}
                      discussions_item={item}
                      contactsSetList={(cl) => {    // Ye ContactList ka setter beja hai
                        setContactList(cl)
                      }}
                      contact={contactList}
                      navigation={props.navigation}
                    />
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
                  <Text style={HomeNeoCards.noSearchResultText}>{TranslationFile[language].You_have_no_friends}</Text>
                  <AddFriendBtn btnTitle={TranslationFile[language].Add_Friends} onPress={() => { props.navigation.navigate("DrawerStack", { screen: "Home", params: { screen: "Discover" } }) }} />
                </View>
              )
          )}
      </View>
    </SafeAreaView>
  )
}
export default Discussions