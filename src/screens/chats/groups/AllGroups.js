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

const AllGroups = ({ navigation }) => {
  //            **************                    USE STATES      *****************
  const { baseUrl } = useContext(AppContext)
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
    const userId = await AsyncStorage.getItem('user');
    console.log("user id in all groups", JSON.parse(userId));
    const parseId = JSON.parse(userId)
    try {
      const result = await fetch(`${baseUrl}/viewGroups/?userId=${parseId}`,

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
  // EFFECTS
  useEffect(() => {
    fetchAllGroups()
  }, [])
  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      <Primary_StatusBar />
      <HeaderNew navigation={navigation} headerTitle={'Groups'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateGroup")
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Neomorph

            darkShadowColor={AppColors.purple}
            lightShadowColor={AppColors.purple}
            swapShadows
            style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
          >
            <View style={styles.container}>
              <View style={styles.button(theme.dpCircleColor)}>
                <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor} />
              </View>
              <TouchableOpacity style={styles.plusButton}>
                <Icons.MaterialCommunityIcons name="plus" size={wp('3.8%')} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.gNameStyle(darkThemeActivator)}>New Group</Text>
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
        renderItem={({ item }) => <RenderComponent name={item.group_name} dp={null} callingScreen={"Groups"} groups_item={item} navigation={navigation} />}
        ref={flatListRef}
        ListFooterComponent={gloabalFunctions.renderFooter(flatListRef, allGroups)}
      />

      {/* <FAB buttonColor={theme.buttonsColor} iconTextColor={theme.buttonsTextColor} onClickAction={() => { navigation.navigate("CreateGroup") }} visible={true} iconTextComponent={<Icons.Ionicons name="create" color={theme.buttonTextColor} />} /> */}
    </View>

  );
};
export default AllGroups;
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.transparent
  },
  button: (color) => ({
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('7.5%'),
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  plusButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp('4.8%'),
    height: wp('4.8%'),
    borderRadius: wp('2.4%'),
    backgroundColor: 'purple', // WhatsApp green color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gNameStyle: darkThemeActivator => ({
    fontFamily: FontStyle.regularFont,
    fontSize: 17,
    color: darkThemeActivator ? "white" : "purple",
    marginLeft: 10,
    letterSpacing: 1,
    textShadowColor: darkThemeActivator ? "white" : 'rgba(255, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius

  }),
});