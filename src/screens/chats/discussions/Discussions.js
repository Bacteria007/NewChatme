import React, { useContext, useState, useRef } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Animated, StyleSheet, Alert, ScrollView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import AppColors from '../../../assets/colors/Appcolors';
import AppContext from '../../../context/AppContext';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows-fixes';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../../../context/ThemeContext';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import Custom_StatusBar from '../../../components/statusbars/Primary_StatusBar';
import TermsStyle from '../../../assets/styles/tremsAndConditions/TermsStyle';
import { Icons } from '../../../assets/Icons';
const Discussions = ({ navigation }) => {

  //            **************                    USE STATES      *****************
  const { theme } = useContext(ThemeContext)
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedChat, setSearchedChat] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS



  // Animated Variables
  // const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerHeight = hp('16%')
  const myDiffClamp = Animated.diffClamp(scrollY, 0, headerHeight)
  const myTranslateY = myDiffClamp.interpolate({
    inputRange: [0, headerHeight], outputRange: [0, -headerHeight]
  });
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const [allChats, setAllChats] = useState([
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 1',
      lastMsg: 'Hello Aqsa', id: 'f3c2890d-78f6-55ef-a345-b4a6f09944bd'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 2',
      lastMsg: 'Hello Hina', id: 'df839b69-22cc-592b-903d-6ea6bb00c9b8'
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 3',
      lastMsg: 'Hello Aqsa', id: 'f868c534-68d3-5eef-8bea-202d8059d728'
    },
    {
      dpImage: require('../../../assets/imges/girlGuitar.jpg'),
      profileName: 'Afshan 4',
      lastMsg: 'Hello Afshan', id: '687d4c53-5967-5707-9be5-39396236b068'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 5',
      lastMsg: 'Hello Hina', id: '5c8dfdeb-dc02-5db1-b2e4-d4f078b5d9ba'
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 6',
      lastMsg: 'Hello Aqsa', id: '0e7fdd30-b307-5088-976e-fde17a2a3381'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia 7',
      lastMsg: 'Hello Rabia', id: 'acb7c970-f2a9-5528-ac6d-b3c089b42264'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 8',
      lastMsg: 'Hello Hina', id: '61969e85-a20e-5548-9db5-81cdb8d41bdb'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia 9',
      lastMsg: 'Hello Afshan', id: 'bc42bb34-e9d6-5710-a941-48833bdbad5c'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 10',
      lastMsg: 'Hello Afshan', id: '2c6a1ce5-9f7a-55f9-82e2-292f5336dc9c'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia 11',
      lastMsg: 'Hello Afshan', id: 'db5db6d2-c48f-5423-922e-163915fb1ef2'
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 12',
      lastMsg: 'Hello Afshan', id: '2d19e477-ab85-5993-923b-d140b3f6925a'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 13',
      lastMsg: 'Hello Afshan', id: 'cff01137-1f9d-50b0-98ee-cea5c99e2e0b'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 14',
      lastMsg: 'Hello Afshan', id: 'bbc280e7-0e81-5b71-a86f-93bddeebfef9'
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 15',
      lastMsg: 'Hello Afshan', id: '1c62e987-6974-527f-a18d-313ebb0965b0'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia 16',
      lastMsg: 'Hello Afshan', id: 'b4af84ef-146c-578f-b0ad-601bdedd6687'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan', id: '6e1a9007-389e-5cbc-8f35-b7593ddb8c96'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan', id: 'e9fb268a-42ee-5f19-a633-97bd4e2fa009'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan', id: '97ad6eaa-9aa0-5358-92a9-1cc3f45fae83'
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan', id: '06b6f16e-d5ae-52db-8d9e-1ec8f33e32ae'
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan', id: '93bae30b-81c4-5390-8ccf-f287119d8d21'
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia last',
      lastMsg: 'Hello Afshan', id: 'ee3d8eb9-f9dd-56e8-b66e-efa704437fec'
    },
  ]);
  //  **********************   FINCTION  ***********************************
  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search query is empty, show all users
      setSearchedChat(allChats);
    } else {
      // Filter users based on search query
      const filteredChats = allChats.filter(user =>
        user.profileName.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedChat(filteredChats);
    }
  };

  const deleteChat = (item) => {
    const upDatedChats = allChats.filter((element) => element.id !== item.id);
    setAllChats(upDatedChats);
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
          navigation.navigate('UserChat', { item: item });
        }}
        onLongPress={() => handleLongPress(item)}

      >
        <View
          style={HomeNeoCards.flatlistItemContainer}>
          {/* discussion content container */}
          <Shadow swapShadows style={[HomeNeoCards.shadowStyle, { backgroundColor: theme.discussionsCardColor }]}>
            {/* <Neomorph lightShadowColor="#e2e2e2" darkShadowColor='#000' inner style={[HomeNeoCards.neomorphStyle,{backgroundColor:theme.discussionsCardColor}]} > */}
            <View style={HomeNeoCards.dpImageView}>
              <TouchableOpacity>
                <Image
                  source={item.dpImage}
                  style={HomeNeoCards.dpImage}
                />
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={HomeNeoCards.nameAndMsgContainer}>
              <Text
                style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                {item.profileName}
              </Text>
              <Text
                style={[HomeNeoCards.lastMsg, { color: theme.lastMsg }]}>
                {item.lastMsg}
              </Text>
            </View>
          </Shadow>
          {/* </Neomorph> */}

        </View>
      </TouchableOpacity>

    );
  };
  const renderFooter = () => {
    if (allChats.length > 10) {
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
  //////////////////

  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // const handleScroll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   scrollY.setValue(offsetY);

  //   // Determine if the header should be visible or hidden
  //   if (offsetY > 100) {
  //     setHeaderVisible(false);
  //   } else {
  //     setHeaderVisible(true);
  //   }
  // };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

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
      <Animated.View style={{ height: headerVisible ? 200 : 0, opacity: headerVisible ? 1 : 0 }}>
        <AppHeader navigation={navigation} headerTitle={'Chats'} handleSearchOnChange={handleSearch} searchQuery={searchText} />

      </Animated.View>
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={searchedChat == '' ? allChats : searchedChat}
        renderItem={renderItem}
        keyExtractor={(item) => { item.id.toString() }}
        ListFooterComponent={renderFooter}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
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

          const handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          );