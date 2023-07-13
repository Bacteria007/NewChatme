import React, { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground, Animated,StyleSheet
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
import { Neomorph, Shadow } from 'react-native-neomorph-shadows-fixes';
import { Card } from 'react-native-paper';
import DiscussionStyle from '../../../assets/styles/DiscussionStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgWave from "../../../assets/imges/svgBackgroungs/LG.svg";
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../../../context/ThemeContext';
const Discussions = ({ navigation }) => {

  //            **************                    USE STATES      *****************
  const { darkThemeActivator } = useContext(AppContext);
  const {theme}=useContext(ThemeContext)
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [filteredUsers, setFilteredUsers] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }
  // Animated Variables
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerHeight = hp('16%')
  const myDiffClamp = Animated.diffClamp(scrollY, 0, headerHeight)
  const myTranslateY = myDiffClamp.interpolate({
    inputRange: [0, headerHeight], outputRange: [0, -headerHeight]
  });

  const allChats = [
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 1',
      lastMsg: 'Hello Aqsa',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 2',
      lastMsg: 'Hello Hina',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa 3',
      lastMsg: 'Hello Aqsa',
    },
    {
      dpImage: require('../../../assets/imges/girlGuitar.jpg'),
      profileName: 'Afshan 4',
      lastMsg: 'Hello Afshan',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina 5',
      lastMsg: 'Hello Hina',
    },
    {
      dpImage: require('../../../assets/imges/w11.jpg'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Aqsa',
    },
    {
      dpImage: require('../../../assets/imges/bacteria.jpeg'),
      profileName: 'Rabia',
      lastMsg: 'Hello Rabia',
    },
    {
      dpImage: require('../../../assets/imges/mic.jpg'),
      profileName: 'Hina',
      lastMsg: 'Hello Hina',
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserChat', { item: item });
        }}
      // style={{backgroundColor:'blue',marginTop:20}}
      >
        <View
          style={DiscussionStyle.flatlistItemContainer}>
          {/* discussion content container */}
          {/* <Shadow inner style={DiscussionStyle.shadowStyle}  > */}
          <Neomorph lightShadowColor="#e2e2e2" darkShadowColor='#000' inner style={[DiscussionStyle.neomorphStyle,{backgroundColor:theme.discussionsCardColor}]} >
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
                style={[DiscussionStyle.profileName,{color:theme.profileName}]}>
                {item.profileName}
              </Text>
              <Text
                style={[DiscussionStyle.lastMsg,{color:theme.lastMsg}]}>
                {item.lastMsg}
              </Text>
            </View>
            {/* </Shadow> */}
          </Neomorph>
        </View>
      </TouchableOpacity>

    );
  };
  return (
    <View style={DiscussionStyle.wholeScreenContainer}>
      {  /*start  top itny %, left %  ---  end bottom , left */}
      <LinearGradient colors={[theme.linearBlue,theme.linearPink]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} locations={[0.3, 0.9]}
       style={StyleSheet.absoluteFillObject}
        />
        {/*vertical*/}
        {/* <LinearGradient colors={[AppColors.linearGradient.blue, AppColors.linearGradient.pink]} start={{ x: 0.9, y: 0.5 }} end={{ x: 0.1, y: 0.5 }}>   */}
        <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.statusBarBg} />
        {/* <Animated.View style={[DiscussionStyle.animatedHeader, {
          transform: [{ translateY: myTranslateY }],
        }]}> */}

        <AppHeader navigation={navigation} headerTitle={'ChatMe'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        {/* </Animated.View> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredUsers == '' ? allChats : filteredUsers}
          renderItem={renderItem}
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