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

import AppContext from '../../context/AppContext';
import moment from 'moment';
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
import UseScreenFocus from '../../helpers/AutoRefreshScreen/UseScreenFocus';
import ChangedChatHeader from '../../components/Headers/ChatHeader/ChangedChatHeader';
import Containers from '../../assets/styles/Containers';

const Calls = ({ navigation }) => {
  const { baseUrl, token, currentUser } = useContext(AppContext);

  //       ***************************                 STATES         **************************************
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const [searchedCalls, setSearchedCalls] = useState([]); // USE STATE FOR SEARCHING TEXT
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [allCallList, setAllCallList] = useState([]);
  const [changeHeader, setChangeHeader] = useState(false);
  const [callId, setCallId] = useState('');
  const [callNotFound, setCallNotFound] = useState(false);



  //       ***************************                 VARIABLES         **************************************
  const iconSize = hp('2.5%');
  const currentDate = new Date().toLocaleDateString([], {
    month: 'short',
    day: '2-digit',
  });

  //       ***************************             USE EFFECT HOOK         **************************************
  useEffect(() => {
    fetchCallList();
    navigation.addListener('focus', () => {
      fetchCallList();
    });
  }, []);

  //       ***************************              FUNCTIONS         **************************************
  const fetchCallList = async () => {
    try {
      await fetch(`${baseUrl}/allCalls?userId=${currentUser.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(async response => {
          const data = await response.json();
          if (data.message == 'Please provide a valid token.') {
            Alert.alert('Provide a valid token.');
          } else if (data.message == 'Please provide a token.') {
            Alert.alert('Token required');
          } else {
            const filterCallList = data.filter(call => {

              if (
                call.userId === currentUser.userId &&
                call.deletedBySender === true
              ) {
                return false; // Don't include this message in the filtered list
              } else if (
                call.recieverId === currentUser.userId &&
                call.deletedByReceiver === true
              ) {
                return false; // Don't include this message in the filtered list
              }

              return true; // Include other messages in the filtered list
            });

            setAllCallList(filterCallList); // Set the callList received from the response

          }
        })
        .catch(error => {
          console.error('Error fetching call list:', error);
        });
    } catch (error) {
      console.error('Error fetching call list:', error);
    }
  };

  const handleSearch = text => {
    console.log('???????', allCallList)
    setSearchText(text);
    if (text === '') {
      setSearchedCalls(allCallList);
      setCallNotFound(false);
    } else {
      const filteredCalls = allCallList.filter(caller => caller.callData.name.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchedCalls(filteredCalls);
      setCallNotFound(filteredCalls.length === 0);

    }
  };

  const reversedData =
    allCallList.length > 0 ? allCallList.slice().reverse() : allCallList; // flatlist call wali ko reverse krny k liye

  // DELETE WALA FUNCTION

  const DeleteCall = async callId => {

    const formData = new FormData();
    formData.append('_id', callId);
    formData.append('userId', currentUser.userId);

    try {
      const response = await fetch(`${baseUrl}/deleteCall`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json(); // Parse the response body as JSON
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {


        const updatedcallList = allCallList.filter(call => {
          if (call._id === callId) {

            return false; // Remove the deleted message
          }
          return true; // Keep other messages
        });
        setAllCallList(updatedcallList);

        setChangeHeader(!changeHeader);
      }
    } catch (error) {
      console.error('Error deleting call:', error);
    }
  };

  //       ***************************            FLATLIST RENDER FUNCTION         **************************************
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={
          () => {
            setChangeHeader(true)
            setCallId(item._id)
          }
        }
      >
        <View style={HomeNeoCards.flatlistItemContainer}>
          <Neomorph

            darkShadowColor={AppColors.primary}
            swapShadows
            style={[HomeNeoCards.neomorphStyle(theme.homeCardColor)]}
          >
            <View style={HomeNeoCards.dpImageView}>
              <TouchableOpacity >

                <>
                  <Image
                    source={{ uri: `${baseUrl}${item.callData.profileImage}` }}
                    style={[
                      HomeNeoCards.dpImage,
                      { justifyContent: 'center', alignItems: 'center' },
                    ]}
                  />
                </>

              </TouchableOpacity>
            </View>

            <View style={HomeNeoCards.name_CallIcon_Container}>
              <View style={HomeNeoCards.callNameAndTimeContainer}>
                <Text
                  style={[HomeNeoCards.profileName(theme.profileNameColor)]}>

                  <Text>{item.callData.name}</Text>

                </Text>
                <View style={HomeNeoCards.timeAndCallType}>
                  {item.isIncomingOrOutgoing == 'outgoing' ? (
                    <Icons.MaterialCommunityIcons
                      name="call-made"
                      color="red"
                      size={iconSize}
                    />
                  ) : (
                    <Icons.MaterialCommunityIcons
                      name="call-received"
                      color={'green'}
                      size={iconSize}
                    />
                  )}

                  <Text style={[HomeNeoCards.lastMsg(theme.lastMsgColor)]}>
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
                    color={AppColors.Mauve}
                  />
                ) : (
                  <Icons.FontAwesome5
                    name="video"
                    size={wp('5%')}
                    color={AppColors.Mauve}
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

      {changeHeader !== true ?
        <AppHeader
          navigation={navigation}
          headerTitle={'Calls'}
          handleSearchOnChange={handleSearch}
          searchQuery={searchText}
        />
        :
        <ChangedChatHeader
          ID={callId}
          navigation={navigation}
          setChangeHeader={setChangeHeader}
          DeleteFunction={() => {
            DeleteCall(callId)
          }}
        />
      }
      {searchText !== '' && searchedCalls.length === 0 && callNotFound === true ? (
        <View style={Containers.centerContainer}>
          <Text style={HomeNeoCards.noSearchResultText}>No caller with this name.</Text>
        </View>
      ) :
        (
          allCallList.length != 0 ?
            <FlatList
              style={{ marginTop: 10 }}
              showsVerticalScrollIndicator={false}
              data={searchedCalls == '' ? reversedData : searchedCalls}
              renderItem={renderItem}
            // keyExtractor={(item) => { item.callerId.toString() }}
            // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
            />
            :
            <View style={Containers.centerContainer}>
              {/* <LottieView source={require('../../../assets/animations/Lottieanimations/l8.json')} autoPlay style={MyActivityStyleSheet.noUploadsLottieStyle} /> */}
              <Text style={HomeNeoCards.noSearchResultText}>No calls yet.</Text>
            </View>
        )}
    </View>
  );
};

export default Calls;
