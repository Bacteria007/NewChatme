import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  FlatList,
  View,
  Alert,
} from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Primary_StatusBar from '../../../components/statusbars/Primary_StatusBar';
import GlobalFunction from '../../../utils/GlobalFunc';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import BotDiscussion from './BotDscussion';
import HeaderNew from '../../../components/Headers/AppHeaders/HeaderNew';
import AppSubHeader from '../../../components/Headers/AppHeaders/AppSubHeader';
import PushNotification from "react-native-push-notification";
import UseScreenFocus from '../../ScreenFocus.js/UseScreenFocus';
const Discussions = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const { baseUrl, storedUser,getStoredUserDetails } = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const globalFunctions = GlobalFunction()
  const [contactList, setContactList] = useState([]);
   
  UseScreenFocus(getStoredUserDetails)

  //  const u=globalFunctions.fetchUserId();

  //  useEffect(()=>{
  //   console.log("-------------",u)
  //   u
  //  },[u])

  const fetchContactList = async () => {
   
    // console.log("discussion ma ", storedUser.userId)
    try {
      const response = await fetch(`${baseUrl}/userContactList?userId=${storedUser.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json();
      // console.log('discussion from server', data)
      setContactList(data);
    } catch (error) {
      console.error('Error fetching contact list:', error);
    }

  }

  //  **********************   FINCTION  ***********************************
  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      // If search query is empty, show all users
      setSearchedChat(contactList);
    } else {
      // Filter users based on search query
      const filteredChats = contactList.filter(user =>
        user.name.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedChat(filteredChats);
    }
  };

  const deleteChat = (item) => {
    const upDatedChats = contactList.filter((element) => element.id !== item.id);
    setContactList(upDatedChats);
  }
  

  useEffect(() => {
    fetchContactList();
  }, [contactList]);

  return (

    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <AppHeader navigation={navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <BotDiscussion navigation={navigation} />
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={searchedChat == '' ? contactList : searchedChat}
        renderItem={({ item }) => <RenderComponent name={item.name} dp={item.profileImage} callingScreen={"Discussions"} discussions_item={item} navigation={navigation} />}
        ListFooterComponent={globalFunctions.renderFooter(flatListRef, contactList)}
      />
    </View>
  );
};

export default Discussions;