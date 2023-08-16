import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  View, Alert, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Icons } from "../../../assets/Icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../../context/ThemeContext';
import AppContext from '../../../context/AppContext';
import FAB from 'react-native-fab';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import GlobalFunction from '../../../utils/GlobalFunc';
import Primary_StatusBar from '../../../components/statusbars/Primary_StatusBar';
import HeaderNew from '../../../components/Headers/AppHeaders/HeaderNew';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'react-native';
import FontStyle from '../../../assets/styles/FontStyle';
import GroupStyles from '../../../assets/styles/GroupScreenStyle/AllGroups';
import PushNotification ,{Importance} from "react-native-push-notification";

const AllGroups = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { baseUrl,storedUser } = useContext(AppContext)
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedGroups, setSearchedGroups] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allGroups, setAllGroups] = useState([])
  const gloabalFunctions = GlobalFunction()


  // FUNCTIONS
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }
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

  const fetchAllGroups = async () => {
    // const userId = await AsyncStorage.getItem('user');
    // console.log("user id in all groups", JSON.parse(userId));
    // const parseId = JSON.parse(userId)
    try {
      const result = await fetch(`${baseUrl}/viewGroups/?userId=${storedUser.userId}`,

        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },

      );
      if (result.ok) {
        const groups = await result.json()
        setAllGroups(groups)
        console.log('all groups', allGroups)
        console.log('all groups length', allGroups.length)
      } else {
        console.log("no groups")
      }
    } catch (error) {
      console.log("error fetching groups")
    }
  }

  const createPushNotificatioon = () => {
    PushNotification.createChannel(
      {
        channelId: "1233",
        channelName: "channel",
        // soundName: "in_ring123.mp3",
        // sound: "android.resource://com.chatme/raw/in_ring123", // Use the correct Android asset URI
        // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        // vibrate: true, // (optional),
        // color:'skyblue',
        // id:""  to replace the old notifi with new
      }
    )
    console.log('soud=========',)
  }
  // EFFECTS
  useEffect(() => {
    createPushNotificatioon()
  }, [])
  useEffect(() => {
    fetchAllGroups()
  }, [])
  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <HeaderNew navigation={navigation} headerTitle={'Groups'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateGroup");
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Neomorph

            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.primary}
            swapShadows
            style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
          >
            <View style={GroupStyles.plusButnContainer}>
              <View style={GroupStyles.button(theme.dpCircleColor)}>
                <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor} />
              </View>
              <TouchableOpacity style={GroupStyles.plusButton}>
                <Icons.MaterialCommunityIcons name="plus" size={wp('3.8%')} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={GroupStyles.newGroupNameStyle(darkThemeActivator)}>New Group</Text>
          </Neomorph>

        </View>
        {/* FFF8F8 */}
        {/* <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../../../assets/imges/groups/createGroup.jpg')} style={{height:heightPercentageToDP('6%'),width:heightPercentageToDP('6'),borderRadius:heightPercentageToDP('6'),borderColor:'grey',borderWidth:2}}/>
            </View> */}
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        data={searchedGroups == '' ? allGroups.length > 0 ? allGroups : [] : searchedGroups}
        renderItem={({ item }) => <RenderComponent name={item.group_name} dp={null} callingScreen={"Groups"} groups_item={item} navigation={navigation} noti={(val) => handleNotification(val)} />}
        ref={flatListRef}
        ListFooterComponent={gloabalFunctions.renderFooter(flatListRef, allGroups)}
      />


    </View>

  );
};
export default AllGroups;
