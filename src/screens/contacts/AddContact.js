
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,

  StyleSheet, Alert,
} from 'react-native';
import { Card } from "react-native-paper";
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows-fixes';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../../context/ThemeContext';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import Custom_StatusBar from '../../components/statusbars/Primary_StatusBar';
import TermsStyle from '../../assets/styles/tremsAndConditions/TermsStyle';
import { Icons } from '../../assets/Icons';
import Animated from "react-native-reanimated";
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalFunction from '../../utils/GlobalFunc';
import Primary_StatusBar from '../../components/statusbars/Primary_StatusBar';
import RenderComponent from '../../components/FlatlistComponents/RenderComponent';
import HeaderNew from '../../components/Headers/AppHeaders/HeaderNew';

const AddContact = ({ navigation }) => {

  //            **************                    USE STATES      *****************
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const { currentUserId, baseUrl } = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const gloabalFunction = GlobalFunction()
  const [contactList, setContactList] = useState([]);


  const fetchContactList = async () => {
    const userid = await AsyncStorage.getItem('user')

    console.log("desc", JSON.parse(userid))
    const parseId = JSON.parse(userid)
    await fetch(`${baseUrl}/allUsers?userId=${parseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async(response)=>{
        const data = await response.json();
          const contactInformation = data.contactList.map(item => ({  // ye iss liye kiya hai q k backend sy just id , name or phone number mil raha tha jb k mein id ko as a receiver id or sender id ko b bejna chahti thi jis k liye ye approach use ki mein ny 
            recieverId: item._id,
            name: item.name,
            userId:parseId,
            phoneNo: item.phoneNo,
          }));
        const filteredChats = contactInformation.filter(user =>
          user.recieverId != parseId,         // NAME KI BASE PR SEARCH HO RAHI HAI
          
        );
        setSearchedChat(filteredChats);
        setContactList(filteredChats);
        console.log('contacts list', filteredChats)
      }).catch((error)=>{
      console.error('Error fetching contact list:', error);
    })
  }

  useEffect(() => {
    fetchContactList();
  }, []);

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
  const handleLongPress = (item) => {
    // toggleLongPressModal();
    Alert.alert(
      'Delete Chat', 'All Media and chat history wil be deleted',
      [{ text: 'Delete', onPress: () => { deleteChat(item) } }],
      { cancelable: true },
    )
  }

  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <HeaderNew navigation={navigation} headerTitle={'Contacts'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <FlatList
        style={{ marginTop: 10 }}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={contactList}
        renderItem={({ item }) => <RenderComponent name={item.name} dp={null} callingScreen={"Contacts"} contacts_item={item} navigation={navigation} />}
        // keyExtractor={(item) => { item.id.toString() }}
        ListFooterComponent={gloabalFunction.renderFooter(flatListRef, contactList)}
      />
    </View>

  );
};

export default AddContact;