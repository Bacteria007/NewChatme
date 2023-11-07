import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../context/ThemeContext';
import Containers from '../../assets/styles/Containers';
import AppContext from '../../context/AppContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
import AppColors from '../../assets/colors/Appcolors';
import { Icons } from '../../assets/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import { ActivityIndicator } from 'react-native';
import FooterComponent from '../../components/FlatlistComponents/FooterComponent';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import { capitalizeFirstLetter } from '../../helpers/UiHelpers/CapitalizeFirstLetter';
import { CreateNameSubString } from '../../helpers/UiHelpers/CreateSubString';

const AllUsers = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [people, setPeople] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const [allPendingRequests, setAllPendingRequests] = useState([]);
  const [waitingRequests, setWaitingRequests] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [seacrhedPeople, setSeacrhedPeople] = useState('');
  const [someoneNotFound, setSomeoneNotFound] = useState(false); // FUNCTIONS-----------------------------

  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      // If search query is empty, show all users
      setSeacrhedPeople(people);
      setSomeoneNotFound(false);
    } else {
      // Filter users based on search query
      const filteredPeople = people.filter(someone =>
        someone.name.toLowerCase().includes(text.toLowerCase()),
      );
      setSomeoneNotFound(filteredPeople.length === 0);
      setSeacrhedPeople(filteredPeople);
    }
  };
  const fetchPendingRequest = async () => {
    try {
      const result = await fetch(
        `${baseUrl}/pendingRequests?userId=${currentUser.userId}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.ok) {
        const allFetchedRequests = await result.json();
        // //console.log('all pending req.........', allFetchedRequests)
        // if (allFetchedRequests.data.message == "Please provide a valid token.") {
        //     Alert.alert("Provide a valid token.")
        // } else if (allFetchedRequests.data.message == 'Please provide a token.') {
        //     Alert.alert('Token required')
        // } else{

        setAllPendingRequests(allFetchedRequests);
        return allFetchedRequests;
        // }
      } else {
        console.log('error fetching pending request');
      }
    } catch (error) {
      console.log('error fetching pending request', error);
    }
  };
  const fetchWaitingRequest = async () => {
    try {
      const result = await fetch(
        `${baseUrl}/waitingRequests?userId=${currentUser.userId}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.ok) {
        const allFetchedRequests = await result.json();
        // //console.log('all pending req.........', allFetchedRequests)
        setWaitingRequests(allFetchedRequests);
        return allFetchedRequests;
      } else {
        console.log('error fetching pending request');
      }
    } catch (error) {
      console.log('error fetching pending request', error);
    }
  };
  const fetchPeople = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/nonFriendUsers?userId=${currentUser.userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      //yha b khud e kr lyna token k error msgs ko deal blky jha jha tmny kam kia un sab ma khud e krlo jesy deal krna
      if (response.ok) {
        console.log('reqz::::::::::', waitingRequests);
        const data = await response.json();
        console.log('data::::::::::', data);
        await fetchPendingRequest();
        await fetchWaitingRequest();
        setPeople(data);
        setIsLoading(false);
      } else {
        console.log('error fetching people');
        setIsLoading(false)
      }
    } catch (error) {
      console.log('error fetching people', error);
      setIsLoading(false)
    }
  };
  const sendRequest = async contact => {
    setIsSending(true);
    try {
      const response = await fetch(
        `${baseUrl}/sendRequest?senderId=${currentUser.userId}&receiverId=${contact._id}`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setIsSending(false);
        setRequestSent(true);
        setBadgeCount(prevCount => prevCount + 1);

        // Fetch pending and waiting requests
        const pdata = await fetchPendingRequest();
        console.log('pdata###########', pdata);
        const wdata = await fetchWaitingRequest();
        console.log('wdata*********', wdata);

        const res = await response.json();
        console.log('sendRequest========', res);

        // Update people array to mark the user as requested
        // setPeople(prevPeople => {
        //     return prevPeople.map(user => {
        //         if (user._id === res.senderId._id) {
        //             return { ...user, requested: true };
        //         }
        //         return user;
        //     });
        // });
      } else {
        console.log('Error in sending request');
        setIsSending(false);
        setRequestSent(false);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setIsSending(false);
      setRequestSent(false);
    }
  };
  const cancelRequest = async contact => {
    console.log("''''''''''======''''''''''", contact);
    const result = await fetch(
      `${baseUrl}/cancelRequest?senderId=${currentUser.userId}&receiverId=${contact._id}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (result.ok) {
      await fetchPendingRequest();
      await fetchWaitingRequest();
      const resultJson = await result.json();
      console.log('cancel successfully...', resultJson);
    } else if (result.status == 404) {
      console.log('request not found');
    } else {
      console.log('cannot cancel reuest');
    }
  };

  // Hooks---------------------------------
  useEffect(() => {
    fetchPeople().then(() => setIsLoading(false))
    console.log('people', people);
    navigation.addListener('focus', () => {
      fetchPeople();
    });
  }, []);
  useEffect(() => {
    fetchPendingRequest();
    console.log('allPendingRequests', allPendingRequests);
    navigation.addListener('focus', () => {
      fetchPendingRequest();
    });
  }, []);
  useEffect(() => {
    fetchWaitingRequest();
    console.log('waitingRequests', waitingRequests);
    navigation.addListener('focus', () => {
      fetchWaitingRequest();
    });
  }, []);
  // }, );
  useEffect(() => {
    console.log('issending', isSending);
  }, [isSending, requestSent]);
  // =============
  const renderPeople = item => {
    // console.log("item__",item)

    return (
      <View style={HomeNeoCards.flatlistItemContainer}>
        <Neomorph
          darkShadowColor={AppColors.primary} // <- set this
          swapShadows
          style={[
            HomeNeoCards.neomorphStyle(theme.homeCardColor),
            { justifyContent: 'space-between' },
          ]}>
          <View style={{ flexDirection: 'row' }}>
            {!item.profileImage ? (
              <View style={HomeNeoCards.dpVew}>
                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                  <Icons.MaterialIcons
                    name={'person'}
                    size={29}
                    color={theme.groupDpIconColor}
                  />
                </View>
              </View>
            ) : (
              <Image
                source={{ uri: `${baseUrl}${item.profileImage}` }}
                style={HomeNeoCards.dpImage}
              />
            )}
            {/* profile name view */}
            <View style={styles.nameView}>
              <Text style={HomeNeoCards.profileName(theme.profileNameColor)}>
                {capitalizeFirstLetter(CreateNameSubString(item.name))}
              </Text>
            </View>
          </View>

          {waitingRequests.length > 0 &&
            waitingRequests.some(
              waitingRequest => waitingRequest.senderId._id == item._id,
            ) ? (
            <Text style={styles.reqText}>Requested...</Text>
          ) : allPendingRequests.length > 0 &&
            allPendingRequests.some(
              pendingRequest => pendingRequest.receiverId._id == item._id,
            ) ? (
            <TouchableOpacity onPress={() => cancelRequest(item)}>
              <Neomorph
                swapShadows
                style={HomeNeoCards.addUserinGroup(AppColors.Mauve)}>
                <Text style={styles.addCancelText}>Cancel</Text>
              </Neomorph>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setClickedItem(item);
                sendRequest(item);
              }}>
              <Neomorph
                swapShadows
                darkShadowColor='black'
                style={HomeNeoCards.addUserinGroup(AppColors.primary)}>
                {clickedItem === item && isSending ? (
                  <ActivityIndicator size="small" color={'white'} />
                ) : (
                  <Text style={styles.addCancelText}>Add</Text>
                )}
              </Neomorph>
            </TouchableOpacity>
          )}
        </Neomorph>
      </View>
    );
  };
  return (
    <View style={Containers.whiteCenterContainer(theme.backgroundColor)}>
      <View>
        <AppHeader
          headerTitle={'People'}
          navigation={navigation}
          searchQuery={searchText}
          handleSearchOnChange={handleSearch}
        />
        {isLoading && <View style={ReelscreenStyle.LoaderView}><ActivityIndicator size="small" color={'black'} /></View>}
        {searchText !== '' &&
          seacrhedPeople.length === 0 &&
          someoneNotFound === true ? (
          <View style={Containers.centerContainer}>
            <Text style={HomeNeoCards.noSearchResultText}>
              No user this name.
            </Text>
          </View>
        ) : people.length != 0 ? (
          <FlatList
            data={seacrhedPeople == '' ? people : seacrhedPeople}
            renderItem={({ item }) => renderPeople(item)}
            ListFooterComponent={FooterComponent}

          />
        ) : (
          !isLoading && (<View style={Containers.centerContainer}>
            <Text style={HomeNeoCards.noSearchResultText}>
              No people were found.
            </Text>
          </View>)
        )}
      </View>
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: wp('4%'),
    right: wp('90%'),
    backgroundColor: 'red',
    borderRadius: wp('2%'),
    width: wp('5%'),
    height: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: wp('3%'),
  },
  nameView: { paddingHorizontal: wp('4'), justifyContent: 'center' },
  reqText: {
    color: AppColors.gray,
    fontSize: hp('1.5'),
    fontFamily: FontStyle.regularFont,
  },
  addCancelText: {
    color: AppColors.white,
    fontSize: hp('1.5'),
    fontFamily: FontStyle.regularFont,
  },
});
