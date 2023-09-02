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
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'react-native';
import FontStyle from '../../../assets/styles/FontStyle';
import GroupStyles from '../../../assets/styles/GroupScreenStyle/AllGroups';
import UseScreenFocus from '../../../components/HelperFunctions/AutoRefreshScreen/UseScreenFocus';
import GlobalFunction from '../../../components/HelperFunctions/GlobalApiz/GlobalFunc';
import Containers from '../../../assets/styles/Containers';

const AllGroups = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { baseUrl, currentUser,token } = useContext(AppContext)
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedGroups, setSearchedGroups] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allGroups, setAllGroups] = useState([])
  const gloabalFunctions = GlobalFunction()

  const [groupNotFound, setGroupNotFound] = useState(false)

  // FUNCTIONS
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }
  const handleSearch = text => {
    setSearchText(text)
    if (text === '') {
      // If search query is empty, show all users
      setSearchedGroups(allGroups)
      setGroupNotFound(false)
    } else {
      // Filter users based on search query
      const filteredGroups = allGroups.filter(group => group.group_name.toLowerCase().includes(text.toLowerCase()))
      setGroupNotFound(filteredGroups.length===0)
      setSearchedGroups(filteredGroups)
    }
  };
  const fetchAllGroups = async () => {
    try {
      const result = await fetch(`${baseUrl}/viewGroups/?userId=${currentUser.userId}`, { 
        method: 'GET', 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
         } 
      });
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

  UseScreenFocus(fetchAllGroups)

  useEffect(() => {
    fetchAllGroups()
  }, [])
  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <AppHeader navigation={navigation} headerTitle={'Groups'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
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
      </TouchableOpacity>
      {searchText !== '' && searchedGroups.length === 0 && groupNotFound === true ? (
          <View style={Containers.centerContainer}>
          <Text style={{ color: AppColors.coolgray, fontSize: 20, textAlign: 'center', fontFamily: FontStyle.regularFont }}>No group with this name.</Text>
          </View>
        ) : (
      <FlatList
        style={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        data={searchedGroups == '' ? (allGroups.length > 0 ? allGroups :  (<View style={Containers.centerContainer}>
          <Text style={{ color: AppColors.coolgray, fontSize: 20, textAlign: 'center', fontFamily: FontStyle.regularFont }}>You have no groups</Text>
        </View>)) : searchedGroups}
        renderItem={({ item }) => <RenderComponent name={item.group_name} dp={null} callingScreen={"Groups"} groups_item={item} navigation={navigation} noti={(val) => handleNotification(val)} />}
        ref={flatListRef}
        ListFooterComponent={gloabalFunctions.renderFooter(flatListRef, allGroups)}
      />
        )}
    </View>

  );
};
export default AllGroups;
