import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  FlatList,
  View,
  Alert,
  SafeAreaView, Text
} from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import BotDiscussion from './BotDscussion';
import UseScreenFocus from '../../../components/HelperFunctions/AutoRefreshScreen/UseScreenFocus';
import GlobalFunction from '../../../components/HelperFunctions/GlobalApiz/GlobalFunc';

import AppColors from '../../../assets/colors/Appcolors';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import FontStyle from '../../../assets/styles/FontStyle';
import Containers from '../../../assets/styles/Containers';
import { initializeZego } from '../../../components/HelperFunctions/ZegoCloudFunction/ZegoInitFunction';

const Discussions = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const { baseUrl,getToken, storedUser,token,currentUser, getStoredUserDetails } = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const globalFunctions = GlobalFunction()
  const [contactList, setContactList] = useState([]);

   const [userNotFound, setUserNotFound] = useState(false)
  const [statusbarColor, setStatusbarColor] = useState(AppColors.white);
  const stColor=()=>{
    setStatusbarColor(AppColors.white)
  }
  // UseScreenFocus(getStoredUserDetails)
  UseScreenFocus(initializeZego)
  UseScreenFocus(stColor)
  
  const fetchContactList = async () => {

    // console.log("discussion ma ", currentUser.userId)
    try {
      const response = await fetch(`${baseUrl}/userContactList?userId=${currentUser.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json();
      if(data.message=="Please provide a valid token."){
        Alert.alert("Provide a valid token.")
      }else if(data.message=='Please provide a token.'){
        Alert.alert('Token required')
      }else{
        setContactList(data);
      }
      // console.log('discussion from server', data)
    } catch (error) {
      console.error('Error fetching contact list:', error);
    }

  }
  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setSearchedChat(contactList);
      setUserNotFound(false);
    } else {
      console.log('if----------------searchText:', searchText);
      console.log('if----------------searchedChat:', searchedChat);
      console.log('if----------------userNotFound:', searchText);
      const filteredChats = contactList.filter(user =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUserNotFound(filteredChats.length === 0);
      setSearchedChat(filteredChats);
      console.log('else++++++++++++++++searchText:', searchText);
      console.log('else++++++++++++++++searchedChat:', searchedChat);
      console.log('else++++++++++++++++userNotFound:', userNotFound);
    }
  }
  const deleteChat = (item) => {
    const upDatedChats = contactList.filter((element) => element.id !== item.id);
    setContactList(upDatedChats);
  }

  // UseScreenFocus(fetchContactList)

  useEffect(() => {
    getToken()
    fetchContactList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
        <Primary_StatusBar />
        <AppHeader navigation={navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <BotDiscussion navigation={navigation} />
        </View>
        {searchText !== '' && searchedChat.length === 0 && userNotFound === true ? (
          <View style={Containers.centerContainer}>
            <Text style={{ color: AppColors.coolgray, fontSize: 20, textAlign: 'center', fontFamily: FontStyle.regularFont }}>No user with this name.</Text>
          </View>
        ) : (
          <FlatList
            style={{ marginTop: 10 }}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={searchedChat == '' ? (contactList.length > 0 ? contactList : (<View style={Containers.centerContainer}>
              <Text style={{ color: AppColors.coolgray, fontSize: 20, textAlign: 'center', fontFamily: FontStyle.regularFont }}>You have no friends yet.</Text>
            </View>)) : searchedChat}
            renderItem={({ item }) => (
              <RenderComponent
                name={item.name}
                dp={item.profileImage}
                callingScreen={"Discussions"}
                discussions_item={item}
                navigation={navigation}
              />
            )}
            ListFooterComponent={globalFunctions.renderFooter(flatListRef, contactList)}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
export default Discussions