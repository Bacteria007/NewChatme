import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
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

const Discussions = (props) => {
  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const { baseUrl, getToken, token, currentUser } = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [contactList, setContactList] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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
        // console.log('cccccccccccccccc',data)
        if(data.message=="Please provide a valid token."){
          Alert.alert("Provide a valid token.")
        }else if(data.message=='Please provide a token.'){
          Alert.alert('Token required')
        }else{
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
    console.log('fetchContactList>>>>>>')
    getToken()
    fetchContactList().then(() => { setIsLoading(false) })
    props.navigation.addListener('focus', () => {
      fetchContactList();
    });
  }, [fetchContactList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
        <Primary_StatusBar />
        <AppHeader navigation={props.navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        {isLoading && <View style={Containers.centerContainer}><ActivityIndicator size="small" color={'black'} /></View>}
        <BotDiscussion navigation={props.navigation} />
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
                    <RenderComponent
                      name={item.contactData?item.contactData.name:null}
                      dp={item.contactData?item.contactData.profileImage:null}
                      callingScreen={"Discussions"}
                      discussions_item={item}
                      contact={contactList}    // Ye ContactList ka getter beja hai
                      navigation={props.navigation}

                    />
                  )
                }}
                // ListHeaderComponent={<BotDiscussion navigation={props.navigation} />}
                // ListHeaderComponentStyle={HomeNeoCards.flatlistHeaderComponent}
                ListFooterComponent={FooterComponent}

              />
              :
              !isLoading && (
                <View style={Containers.centerContainer}>
                  {/* <Text style={HomeNeoCards.noSearchResultText}>You have no friends.</Text> */}
                  <AddFriendBtn btnTitle={'Add Friends'} onPress={() => { props.navigation.navigate("DrawerStack", { screen: "Home", params: { screen: "Discover" } }) }} />
                </View>
              )
          )}
      </View>
    </SafeAreaView>
  )
}
export default Discussions