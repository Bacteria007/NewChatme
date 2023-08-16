import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontStyle from '../../assets/styles/FontStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CallsScreenHeader from '../../components/Headers/CallsHeader/CallsScreenHeader';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
import moment from 'moment';
import HeaderNew from '../../components/Headers/AppHeaders/HeaderNew';

const Calls = ({ navigation }) => {
  const { baseUrl } = useContext(AppContext);

  //       ***************************                 STATES         **************************************
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const [searchedCalls, setSearchedCalls] = useState([]); // USE STATE FOR SEARCHING TEXT
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [allCallList, setAllCallList] = useState([]);
  const [currentUserID, setCurrentUserID] = useState('');

  //       ***************************                 VARIABLES         **************************************
  const iconSize = hp('2.5%');
  const currentDate = new Date().toLocaleDateString([], {
    month: 'short',
    day: '2-digit',
  });

  //       ***************************             USE EFFECT HOOK         **************************************
  useEffect(() => {
    fetchCallList();
  }, []);

  //       ***************************              FUNCTIONS         **************************************
  const fetchCallList = async () => {
    const userid = await AsyncStorage.getItem('user');
    const userName = await AsyncStorage.getItem('user_name');
    setCurrentUserID(userid);

    console.log('desc', JSON.parse(userid));
    const parseId = JSON.parse(userid);

    try {
      const response = await fetch(`${baseUrl}/allCalls?userId=${parseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setAllCallList(data); // Set the callList received from the response
    } catch (error) {
      console.error('Error fetching call list:', error);
    }
  };

  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search query is empty, show all users
      setSearchedCalls(allCalls);
    } else {
      // Filter users based on search query
      const filteredCalls = allCalls.filter(
        user => user.callerName.toLowerCase().includes(text.toLowerCase()), // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedCalls(filteredCalls);
    }
  };

  const reversedData =  allCallList.length>0?allCallList.slice().reverse():allCallList; // flatlist call wali ko reverse krny k liye

  //       ***************************            FLATLIST RENDER FUNCTION         **************************************
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onLongPress={() => handleLongPress(item)}>
        <View style={HomeNeoCards.flatlistItemContainer}>
            <Neomorph
              lightShadowColor="#e2e2e2"
              darkShadowColor="#000"
              inner
              style={[
                HomeNeoCards.neomorphStyle(theme.homeCardColor)]}>
              <View style={HomeNeoCards.dpImageView}>
                <TouchableOpacity>
                  {/* <Image
                    source={item.callerDpImage}
                    style={HomeNeoCards.dpImage}
                  /> */}
                </TouchableOpacity>
              </View>
              {/* msg view */}
              <View style={HomeNeoCards.name_CallIcon_Container}>
                <View style={HomeNeoCards.nameAndTimeContainer}>
                  <Text
                    style={[
                      HomeNeoCards.profileName(theme.profileNameColor)]}>
                    {item.userId === currentUserID ? (
                      <>
                        <Text>{item.recieverName}</Text>
                      </>
                    ) : (
                      <>
                        <Text>{item.userName}</Text>
                      </>
                    )}
                  </Text>
                  <View style={HomeNeoCards.timeAndCallType}>
                    {item.userId === currentUserID ? (
                      <>
                        {item.OutgoingCall == 'outgoing' ? (
                          <Icons.MaterialCommunityIcons
                            name="call-made"
                            color='red'
                            size={iconSize}
                          />
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      <>
                        {item.OutgoingCall == 'incoming' ? (
                          <Icons.MaterialCommunityIcons
                            name="call-received"
                            color={'red'}
                            size={iconSize}
                          />
                        ) : (
                          ''
                        )}
                      </>
                    )}
                    <Text
                      style={[HomeNeoCards.lastMsg(theme.lastMsgColor)]}>
                      {item.callDate === currentDate ? 'Today' : item.callDate},{' '}
                      {moment(item.callTime).format('hh:mm a ')}
                    </Text>
                  </View>
                </View>
                <View style={HomeNeoCards.callIconView}>
                  {item.callName === 'audio' ? (
                    <Icons.Ionicons
                      name="call-sharp"
                      size={wp('6%')}
                      color={AppColors.black}
                    />
                  ) : (
                    <Icons.FontAwesome5
                      name="video"
                      size={wp('5%')}
                      color={AppColors.black}
                    />
                  )}
                </View>
              </View>
            </Neomorph>
        
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={HomeNeoCards.wholeScreenContainer(theme.backgroundColor)}>
      {/* <CallsScreenHeader
        navigation={navigation}
        headerTitle={'Calls'}
        handleSearchOnChange={handleSearch}
        searchQuery={searchText}
      /> */}
      <HeaderNew navigation={navigation} headerTitle={'Calls'} handleSearchOnChange={handleSearch} searchQuery={searchText} />
      <FlatList
        style={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        data={searchedCalls == '' ? reversedData : searchedCalls}
        renderItem={renderItem}
      // keyExtractor={(item) => { item.callerId.toString() }}
      // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
      />

    </View>
  );
};

export default Calls;
