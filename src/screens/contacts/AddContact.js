import React, { useContext,useEffect, useState, useRef } from 'react';
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
const Discussions = ({ navigation }) => {

  //            **************                    USE STATES      *****************
  const { theme,darkThemeActivator } = useContext(ThemeContext)
  const {currentUserId,baseUrl}  = useContext(AppContext);
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const [contactList, setContactList] = useState([]);


  const fetchContactList = async () => {
    const userid=await AsyncStorage.getItem('user')

    console.log("desc",JSON.parse(userid))
    const parseId=JSON.parse(userid)
      try {
        const response=await fetch(`${baseUrl}/allUsers?userId=${parseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        const filteredChats = data.filter(user =>
          user._id!=parseId,         // NAME KI BASE PR SEARCH HO RAHI HAI
        );
        setSearchedChat(filteredChats);
        setContactList(filteredChats);
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
  const handleLongPress = (item) => {
    // toggleLongPressModal();
    Alert.alert(
      'Delete Chat', 'All Media and chat history wil be deleted',
      [{ text: 'Delete', onPress: () => { deleteChat(item) } }],
      { cancelable: true },
    )
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserChat', {itm: item,currentUserId:currentUserId});
        }}
        onLongPress={() => handleLongPress(item)}

      >
        <View
          style={HomeNeoCards.flatlistItemContainer}>
          {/* discussion content container */}
  {!darkThemeActivator?         
           ( <Neomorph lightShadowColor="#000" darkShadowColor='#fff' inner style={[HomeNeoCards.neomorphStyle,{backgroundColor:theme.discussionsCardColor}]} >
            {/* <View style={HomeNeoCards.dpImageView}>
              <TouchableOpacity>
                <Image
                  source={item.dpImage}
                  style={HomeNeoCards.dpImage}
                />
              </TouchableOpacity>
            </View> */}
            {/* msg view */}
            <View style={HomeNeoCards.nameAndMsgContainer}>
              <Text
                style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                {item.name}
              </Text>
              {/* <Text
                style={[HomeNeoCards.lastMsg, { color: theme.lastMsg }]}>
                {item.lastMsg}
              </Text> */}
            </View>
          </Neomorph>)
          :(
            <Card style={HomeNeoCards.cardStyle}>
              <View style={HomeNeoCards.cardView}>
            {/* <View style={HomeNeoCards.dpImageView}>
              <TouchableOpacity>
                <Image
                  source={item.dpImage}
                  style={HomeNeoCards.dpImage}
                />
              </TouchableOpacity>
            </View> */}
            {/* msg view */}
            <View style={HomeNeoCards.nameAndMsgContainer}>
              <Text
                style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                {item.name}
              </Text>
              {/* <Text
                style={[HomeNeoCards.lastMsg, { color: theme.lastMsg }]}>
                {item.lastMsg}
              </Text> */}
            </View>
          </View>
          </Card>
          )
  }
        </View>
      </TouchableOpacity>

    );
  };
  const renderFooter = () => {
    if (contactList.length > 10) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              scrollToTop();
            }}
            style={[TermsStyle.arrowupStyle, { backgroundColor: theme.discussionsCardColor, elevation: 0 }]}
          >
            <Icons.AntDesign name="arrowup" size={20} color={theme.profileName} />
          </TouchableOpacity>

        </View>
      );
    }
    else {
      return (
        <View style={[TermsStyle.arrowupStyle, { opacity: 0, }]}>
          <TouchableOpacity
            onPress={() => {
              scrollToTop();
            }}
            style={[TermsStyle.arrowupStyle, { backgroundColor: theme.discussionsCardColor, elevation: 0, display: 'none' }]}
          >
            <Icons.AntDesign name="arrowup" size={20} color={theme.profileName} />
          </TouchableOpacity>

        </View>
      );
    }
  };
  useEffect(() => {
    fetchContactList();
  }, []);

  return (
    <View style={HomeNeoCards.wholeScreenContainer}>
      {  /*start  top itny %, left %  ---  end bottom , left */}
      <LinearGradient colors={[theme.linearBlue, theme.linearPink]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} locations={[0.3, 0.9]}
        style={StyleSheet.absoluteFillObject}
      />
      <Custom_StatusBar />
      {/*vertical*/}
      {/* <LinearGradient colors={[AppColors.linearGradient.blue, AppColors.linearGradient.pink]} start={{ x: 0.9, y: 0.5 }} end={{ x: 0.1, y: 0.5 }}>   */}
      {/* <Animated.View style={[HomeNeoCards.animatedHeader, {
          transform: [{ translateY: myTranslateY }],
        }]}> */}
      {/* <Animated.View style={[{ backgroundColor: 'blue' }, headerStyle]}> */}
        <AppHeader navigation={navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      {/* </Animated.View> */}
       
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={contactList}
        renderItem={renderItem}
        // keyExtractor={(item) => { item.id.toString() }}
        ListFooterComponent={renderFooter}
        />
      {/* </LinearGradient> */}
      {/* </SafeAreaView> */}
    </View>

  );
};

export default Discussions;

 // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          //   { useNativeDriver: true },
          // )}

          // <View
          //     style={{
          //       height: hp('5%'),
          //       width: wp('27%'),
          //       borderRadius: hp('5%'),
          //       backgroundColor: AppColors.coolgray,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       // marginLeft:20
          //     }}>
          //     <Text style={{ color: 'white',letterSpacing:1 }}>My Uploads</Text>
          //   </View>
