import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../../context/ThemeContext';
import AppContext from '../../../context/AppContext';
import RenderComponent from '../../../components/FlatlistComponents/RenderComponent';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { Text } from 'react-native';
import UseScreenFocus from '../../../helpers/AutoRefreshScreen/UseScreenFocus';
import Containers from '../../../assets/styles/Containers';
import GroupListHeaderComponent from '../../../components/FlatlistComponents/GroupListHeader';
import FooterComponent from '../../../components/FlatlistComponents/FooterComponent';
import AddFriendBtn from '../../../components/Buttons/AddFriendsBtn';
import AppActivityIndicator from '../../../components/FlatlistComponents/AppActivityIndicator';
import TranslationFile from '../../../assets/translation/TranslationFile';

const AllGroups = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { baseUrl, currentUser, token,language } = useContext(AppContext)
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [searchedGroups, setSearchedGroups] = useState([]); // USE STATE ARRAY FOR SEARCHING DiSPLAY SEARCHED USERS
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allGroups, setAllGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      setGroupNotFound(filteredGroups.length === 0)
      setSearchedGroups(filteredGroups)
    }
  };
  const fetchAllGroups =  useCallback(async () => {
    // console.log(")))))",currentUser.userId)
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
        setIsLoading(false)
        console.log('all groups', groups)
        console.log('all groups length', allGroups.length)
      } else {
        console.log("no groups")
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("error fetching groups")
    }
  }, [baseUrl, currentUser.userId, token]);

  useEffect(() => {
    fetchAllGroups(); 
    navigation.addListener('focus', () => {
      fetchAllGroups() 
    });
  }, [fetchAllGroups])
  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <AppHeader navigation={navigation} headerTitle={TranslationFile[language].Groups} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <GroupListHeaderComponent navigation={navigation} />
      {isLoading && <View style={Containers.centerContainer}>
        <AppActivityIndicator/>
        </View>}
      {searchText !== '' && searchedGroups.length === 0 && groupNotFound === true ? (
        <View style={Containers.centerContainer}>
          <Text style={HomeNeoCards.noSearchResultText}>{TranslationFile[language].No_group_with_this_name}</Text>
        </View>
      ) : (
        allGroups.length != 0 ?
          <FlatList
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={searchedGroups != '' ? searchedGroups : allGroups}
            renderItem={({ item }) => <RenderComponent name={item.group_name} dp={item.group_dp} callingScreen={"Groups"} groups_item={item} navigation={navigation} noti={(val) => handleNotification(val)} />}
            ref={flatListRef}
            ListFooterComponent={FooterComponent}
          />
          : !isLoading && (
          <View style={Containers.centerContainer}>
            <Text style={HomeNeoCards.noSearchResultText}>{TranslationFile[language].You_have_no_groups}</Text>
            <AddFriendBtn btnTitle={TranslationFile[language].Create_New}  onPress={()=>{navigation.navigate("InnerScreens",{screen:"CreateGroup"})}}/>
          </View>
          )
      )}
    </View>

  );
};
export default AllGroups;
