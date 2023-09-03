import React, { useContext, useEffect, useState, useRef } from 'react';
import { FlatList, View, SafeAreaView, Text, StyleSheet } from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import AppContext from '../../../context/AppContext';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import BotDiscussion from './BotDscussion';
import GlobalFunction from '../../../components/HelperFunctions/GlobalApiz/GlobalFunc';
import AppColors from '../../../assets/colors/Appcolors';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import FontStyle from '../../../assets/styles/FontStyle';
import Containers from '../../../assets/styles/Containers';
import LottieView from 'lottie-react-native';
import MyActivityStyleSheet from '../../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';


const Discussions = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const { baseUrl,getToken,token,currentUser } = useContext(AppContext);
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
  // UseScreenFocus(initializeZego)
  // UseScreenFocus(stColor)
  
  const fetchContactList = async () => {

    // console.log("discussion ma ", currentUser.userId)
    try {
      const response = await fetch(`${baseUrl}/userContacts?userId=${currentUser.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json();
      // if(data.message=="Please provide a valid token."){
      //   Alert.alert("Provide a valid token.")
      // }else if(data.message=='Please provide a token.'){
      //   Alert.alert('Token required')
      // }else{
        setContactList(data);
      // }
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
      const filteredChats = contactList.filter(user =>
        user.contactData.name.toLowerCase().includes(text.toLowerCase())
      );
      setUserNotFound(filteredChats.length === 0);
      setSearchedChat(filteredChats)
    }
  }

  useEffect(() => {
    getToken()
    fetchContactList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
        <Primary_StatusBar />
        <AppHeader navigation={navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        <View style={Containers.centercontent}>
          <BotDiscussion navigation={navigation} />
        </View>
        {searchText !== '' && searchedChat.length === 0 && userNotFound === true ? (
          <View style={Containers.centerContainer}>
            <Text style={styles.noFriendsText}>No user with this name.</Text>
          </View>
        ) :
          (
            contactList.length != 0 ?
              <FlatList style={{ marginTop: 10 }}
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                data={searchedChat != '' ? searchedChat : contactList}
                renderItem={({ item }) => (
                  <RenderComponent
                    name={item.contactData.name}
                    dp={item.contactData.profileImage}
                    callingScreen={"Discussions"}
                    discussions_item={item}
                    navigation={navigation}
                  />
                )}
                ListFooterComponent={globalFunctions.renderFooter(flatListRef, contactList)}
              />
              :
              <View style={Containers.centerContainer}>
                <LottieView source={require('../../../assets/animations/Lottieanimations/l8.json')} autoPlay style={MyActivityStyleSheet.noUploadsLottieStyle} />
                <Text style={styles.noFriendsText}>Add friends.</Text>
              </View>
          )}
      </View>
    </SafeAreaView>
  )
}
export default Discussions;

const styles = StyleSheet.create({
  noFriendsText: {
    color: AppColors.coolgray,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: FontStyle.regularFont
  },
})