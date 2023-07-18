import React, { useContext, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
   Animated, StyleSheet,Alert
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
import { Icons } from "../../../assets/Icons";
import TermsStyle from '../../../assets/styles/tremsAndConditions/TermsStyle';

const AllGroups = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const{theme,darkThemeActivator}=useContext(ThemeContext)
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedGroups, setSearchedGroups] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
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

  const [allGroups,setAllGroups] =useState([
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa 1',
      lastMsg: 'Hello Aqsa',
      id:'fd778586-523b-5986-b467-9a5756eeb282'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina 2',
      lastMsg: 'Hello Hina',
      id:'358626a1-9280-51b8-9595-63e43b049d24'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa 3',
      lastMsg: 'Hello Aqsa',
      id:'8650517a-b9a9-5f4c-b94e-dff2a4d6e262'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Afshan 4',
      lastMsg: 'Hello Afshan',
      id:'f2d36fca-1934-5c30-a1a7-e3e90312c0d3'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina 5',
      lastMsg: 'Hello Hina',
      id:'7cec4113-5507-5e2f-bf23-4f6cc0b77043'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Aqsa',
      id:'6a1b8aed-1544-5245-ab7f-e4757edbf1cd'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Rabia',
      lastMsg: 'Hello Rabia',
      id:'f503e3b5-a1c0-5c08-b4f3-4cde6f35db60'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Hina',
      id:'dc49e13a-64f2-5068-822a-907b4c009a82'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
      id:'9bc3ab13-9dc1-508c-9aba-e0f3a79bd1da'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'0076ee92-4d83-5806-b5ff-4b1a32bd78e0'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
      id:'4d66b4df-e496-5465-96ad-6e00e6206c90'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
      id:'d56467a6-e9d8-57a4-980c-a5d19c5afcb3'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'e141fbbf-b131-5543-a322-5b2877f41312'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'b0dbd2ee-7249-580d-ae02-28273d082a72'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
      id:'0abb1897-d7a2-5d23-9bea-2eb3d427c177'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
      id:'8784af39-c2db-53a9-a237-5e59a4d299ce'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'b0b15a77-10ab-56d3-978f-e19bd3aa1393'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Rabia',
      lastMsg: 'Hello Afshan',
      id:'0c55fac8-ac35-5262-8cfd-d9e3ec00564d'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'10fc7054-1337-5257-82dc-29be44edc544'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Aqsa',
      lastMsg: 'Hello Afshan',
      id:'8a155701-c993-5353-ae41-59656a27241c'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'Hina',
      lastMsg: 'Hello Afshan',
      id:'d79e4614-881e-5065-bff2-1bc3f4ff44bf'
    },
    {
      dpImage: require('../../../assets/imges/groups/peoplefill.png'),
      profileName: 'last group',
      lastMsg: 'Hello Afshan',
      id:'ed0d1a71-57e0-59c0-a9c1-d46651c799a9'
    },
  ]);
  //  **********************              FINCTION FOR HANDLING SEARCHBAR       ***********************************
   const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };
  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search query is empty, show all users
      setSearchedGroups(allGroups);
    } else {
      // Filter users based on search query
      const filteredGroups = allGroups.filter(user =>
        user.profileName.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedGroups(filteredGroups);
    }
  };
  const deleteGroup = (item) => {
    const upDatedGroupsArray = allGroups.filter((element) => element.id !== item.id);
    setAllGroups(upDatedGroupsArray);
  }
  const handleLongPress = (item) => {
    // toggleLongPressModal();
    Alert.alert(
      'Delete Chat', 'All Media and chat history wil be deleted',
      [{ text: 'Delete', onPress: () => { deleteGroup(item) } }],
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
      // style={{backgroundColor:'blue',marginTop:20}}
      >
        <View
          style={HomeNeoCards.flatlistItemContainer}>
          {/* discussion content container */}
     { !darkThemeActivator ?
          (<Neomorph lightShadowColor="#e2e2e2" darkShadowColor='#000' inner style={[HomeNeoCards.neomorphStyle,{backgroundColor:theme.discussionsCardColor}]} >
            <View style={[HomeNeoCards.iconView,{backgroundColor:theme.groupDpCircle}]}>
              <TouchableOpacity>
                {/* <Image
                 source={item.dpImage}
                  style={[HomeNeoCards.dpIcon]}
                /> */}
                <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor}/>
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={HomeNeoCards.nameAndMsgContainer}>
              <Text
                style={[HomeNeoCards.profileName,{color:theme.profileName}]}>
                {item.profileName}
              </Text>
              <Text
                style={[HomeNeoCards.lastMsg,{color:theme.lastMsg}]}>
                {item.lastMsg}
              </Text>
            </View>
          </Neomorph>)
          :
(<Card style={HomeNeoCards.cardStyle}>
              <View style={HomeNeoCards.cardView}>
                            <View style={[HomeNeoCards.iconView,{backgroundColor:theme.groupDpCircle}]}>
              <TouchableOpacity>
                {/* <Image
                 source={item.dpImage}
                  style={[HomeNeoCards.dpIcon]}
                /> */}
                <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor}/>
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={HomeNeoCards.nameAndMsgContainer}>
              <Text
                style={[HomeNeoCards.profileName,{color:theme.profileName}]}>
                {item.profileName}
              </Text>
              <Text
                style={[HomeNeoCards.lastMsg,{color:theme.lastMsg}]}>
                {item.lastMsg}
              </Text>
            </View>
        </View></Card>
          )
  }
        </View>
      </TouchableOpacity>

    );
  };
  const renderFooter = () => {
   if(allGroups.length>10){ return (
      <View>
        <TouchableOpacity
          onPress={() => {
            scrollToTop();
          }}
          style={[TermsStyle.arrowupStyle,{backgroundColor:theme.discussionsCardColor,elevation:0}]}
        >
        <Icons.AntDesign name="arrowup" size={20} color={theme.profileName} />
        </TouchableOpacity>

      </View>
    );
    }  else{
      return (
        <View style={[TermsStyle.arrowupStyle,{opacity:0,}]}>
          <TouchableOpacity
            onPress={() => {
              scrollToTop();
            }}
            style={[TermsStyle.arrowupStyle,{backgroundColor:theme.discussionsCardColor,elevation:0,display:'none'}]}
          >
          <Icons.AntDesign name="arrowup" size={20} color={theme.profileName}/>
          </TouchableOpacity>
  
        </View>
      );
    }
  };
  return (
    <View style={HomeNeoCards.wholeScreenContainer}>
      {/* <ImageBackground blurRadius={0} source={require('../../../assets/imges/svgBackgroungs/darkblue.png')} resizeMethod='resize' resizeMode='cover' style={{ height: hp('100%'), width: wp('100%'), }}> */}
      {  /*start  top itny %, left %  ---  end bottom , left */}
      {/*horizontal*/}
      <LinearGradient colors={[theme.linearBlue,theme.linearPink]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} locations={[0.3, 0.9]}
       style={[StyleSheet.absoluteFillObject]}
        />
        {/*vertical*/}
        {/* <LinearGradient colors={[AppColors.linearGradient.blue, AppColors.linearGradient.pink]} start={{ x: 0.9, y: 0.5 }} end={{ x: 0.1, y: 0.5 }}>   */}

        {/* <SvgWave style={{ position: 'absolute' }} /> */}
        <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.statusBarBg} />
        {/* <Animated.View style={[HomeNeoCards.animatedHeader, {
          transform: [{ translateY: myTranslateY }],
        }]}> */}

        <AppHeader navigation={navigation} headerTitle={'Groups'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
        {/* </Animated.View> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchedGroups == '' ? allGroups : searchedGroups}
          renderItem={renderItem}
          keyExtractor={(item) => { item.id.toString() }}
          ref={flatListRef}
          ListFooterComponent={renderFooter}

          // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
        />

    </View>

  );
};

  export default AllGroups;