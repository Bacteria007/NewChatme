import React, { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  useColorScheme,
  ImageBackground, Animated, StyleSheet
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
import { Card } from 'react-native-paper';
import DiscussionStyle from '../../../assets/styles/DiscussionStyle';
const Discussions = ({ navigation }) => {


  //            **************                    USE STATES      *****************


  const isDarkMode = useColorScheme() === 'dark';
  const { darkThemeActivator, changeTheme } = useContext(AppContext);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [filteredUsers, setFilteredUsers] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerHeight = hp('16%')
  const myDiffClamp = Animated.diffClamp(scrollY, 0, headerHeight)
  const myTranslateY = myDiffClamp.interpolate({
    inputRange: [0, headerHeight], outputRange: [0, -headerHeight]
  });

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
        style={DiscussionStyle.flatlistContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserChat', { item: item });
          }}>
          {/* discussion content container */}
          <Neomorph
            lightShadowColor="#e2e2e2"
            darkShadowColor='#ddd'
            inner
            style={DiscussionStyle.neomorphStyle}>
            {/* <Card style={DiscussionStyle.cardStyle}>
            <View style={DiscussionStyle.cardView}> */}
            {/* dp view */}
            <View style={DiscussionStyle.dpImageView}>
              <TouchableOpacity>
                <Image
                  source={item.dpImage}
                  style={DiscussionStyle.dpImage}
                />
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={DiscussionStyle.nameAndMsgContainer}>
              <Text
                style={DiscussionStyle.profileName}>
                {item.profileName}
              </Text>
              <Text
                style={DiscussionStyle.lastMsg}>
                {item.lastMsg}
              </Text>
            </View>

            {/* </View>
            </Card> */}

          </Neomorph>
        </TouchableOpacity>

      </View>
    );
  };
  return (
    <View
      style={DiscussionStyle.wholeScreenContainer}>
      {/* <ImageBackground
      source={require('../../../assets/imges/img3.jpeg')} style={{ height: hp('100%'), width: wp('100%') }} blurRadius={100}
    > */}
      <StatusBar
        barStyle={darkThemeActivator ? 'light-content' : 'dark-content'}
        backgroundColor={
          darkThemeActivator ? AppColors.darkTheme : AppColors.white
        }
      />
      <Animated.View style={[DiscussionStyle.animatedHeader, {
        transform: [{ translateY: myTranslateY }],
      }]}>
        <AppHeader navigation={navigation} headerTitle={'ChatMe'} handleSearchOnChange={handleSearch}
          searchQuery={searchText} />
      </Animated.View>
      <Animated.FlatList
        data={filteredUsers == '' ? allChats : filteredUsers}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      />
      {/* </ImageBackground> */}
    </View>
  );
};

export default Discussions;