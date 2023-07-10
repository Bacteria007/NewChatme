import React, { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import FontStyle from '../../../assets/styles/FontStyle';
import AppColors from '../../../assets/colors/Appcolors';
import AppSubHeader from '../../../components/Headers/AppHeaders/AppSubHeader';
import Status_bar from '../../../components/Headers/Status_bar';
import AppContext from '../../../context/AppContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';

const Discussions = ({ navigation }) => {


  //            **************                    USE STATES      *****************


  const isDarkMode = useColorScheme() === 'dark';
  const { darkThemeActivator, changeTheme } = useContext(AppContext);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [filteredUsers, setFilteredUsers] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS

  const allChats = [
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/girlGuitar.jpg'),
      profileName: 'Afshan',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
    },
  ];


  //  **********************              FINCTION FOR HANDLING SEARCHBAR       ***********************************
  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search query is empty, show all users
      setFilteredUsers(allChats);
    } else {
      // Filter users based on search query
      const filtered = allChats.filter(user =>
        user.profileName.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setFilteredUsers(filtered);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // style={{borderRadius:10,backgroundColor:'rgba(255,255,255,1)'}}
          onPress={() => {
            navigation.navigate('UserChat', { item: item });
          }}>
          {/* discussion content container */}
          <Neomorph
            // lightShadowColor="#e2e2e2"
            // darkShadowColor='#ddd'
            // lightShadowColor="#5FFAE0"
            // lightShadowColor="#d3a0dc"
            lightShadowColor="#DA68C9"
            darkShadowColor="#DA68C9"
            // swapShadows
            inner
            style={{
              shadowOpacity: 0.3,
              shadowRadius: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
              height: hp('11%'),
              width: wp('95%'),
            }}>
            {/* dp view */}
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity>
                <Image
                  source={item.dpImage}
                  style={{
                    height: hp('6%'),
                    width: hp('6%'),
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text
                style={{
                  fontFamily: FontStyle.regularFont,
                  color: darkThemeActivator ? AppColors.white : AppColors.black,
                  fontSize: 17,
                }}>
                {item.profileName}
              </Text>
              <Text
                style={{
                  fontFamily: FontStyle.regularFont,
                  color: darkThemeActivator
                    ? AppColors.lightwhite
                    : AppColors.gray,
                  fontSize: 11,
                }}>
                {item.lastMsg}
              </Text>
            </View>
            {/* </View> */}
          </Neomorph>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        height: hp('100%'),
        backgroundColor: darkThemeActivator
          ? AppColors.darkTheme
          : AppColors.white,
      }}>
      {/* <ImageBackground
      source={require('../../../assets/imges/img3.jpeg')} style={{ height: hp('100%'), width: wp('100%') }} blurRadius={100}
    > */}
      {/* <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.white} darkModeContent={'light-content'} lightModeContent={'dark-content'} /> */}
      <StatusBar
        barStyle={darkThemeActivator ? 'light-content' : 'dark-content'}
        backgroundColor={
          darkThemeActivator ? AppColors.darkTheme : AppColors.white
        }
      />
      <AppHeader navigation={navigation} headerTitle={'ChatMe'} />
      <AppSubHeader
        handleSearchOnChange={handleSearch}
        searchQuery={searchText}
      />
      <FlatList
        data={filteredUsers == '' ? allChats : filteredUsers}
        renderItem={renderItem}
      />
      {/* </ImageBackground> */}
    </View>
  );
};

export default Discussions;

// subheader
