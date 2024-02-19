import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ScrollView, SafeAreaView, ActivityIndicator, ImageBackground } from 'react-native'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../context/AppContext';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ActivityIndicator as ActivityIndicatorPaper, IconButton, TouchableRipple } from 'react-native-paper';
import axios from 'react-native-axios';
import WebView from 'react-native-webview';
import AppColors from '../../assets/colors/Appcolors';
import Containers from '../../assets/styles/Containers';
import ReactNativeModal from 'react-native-modal';
import GenerateVideoHtml from '../Reels/ReelsHtmlVideo';
import MyActivityStyleSheet from '../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';
import { ThemeContext } from '../../context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';
import { Image } from 'react-native';
import FontStyle from '../../assets/styles/FontStyle';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import Video from 'react-native-video'
import AppActivityIndicator from '../../components/FlatlistComponents/AppActivityIndicator';

const PublicProfile = (props) => {
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const userId = currentUser.userId;
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const [allUploads, setAllUploads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileModal, setProfileModal] = useState(false);
  const [reelid, setReelid] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false)

  const [totalFriendsCount, setTotalFriendsCount] = useState(0)
  const { data } = props.route.params;
  console.log("public profile", data)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const hideModal = () => {
    setIsModalVisible(false)
  }

  // New function for fetching uploaded videos
  const fetchUploadedVideos = async () => {
    await fetch(`${baseUrl}/userReels?userId=${data._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(res => {
        //console.log("##### all reels response ####", data.UploadedVideos)
        if (res.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (res.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          const videosWithSources = res.UploadedVideos.map(video => ({
            _id: video._id,
            uri: video.video,
            desc: video.name,
            user: video.userId
          }));
          const myuploads = videosWithSources.filter(
            user => user.user._id === data._id, // id KI BASE PR SEARCH HO RAHI HAI
          );
          console.log('Myuploads --------^^^^^^^^^^^^^^^^^^^^  ', myuploads);
          setAllUploads(myuploads);
          // console.log('allUploads --------^^^^^^^^^^^^^^^^^^^^  ', allUploads);
          //console.log(videosWithSources);
        }
      })
      .catch(error => {
        //console.log(error);
        Alert('Error while fetching data');
      });
  };

  const deleteReel = async (item) => {
    //console.log("userid in frontend", userId)
    //console.log("reelId in frontend", item._id)

    const formData = new FormData();
    formData.append("reel_id", item._id)
    formData.append("user_id", userId)
    const response = await axios(`${baseUrl}/deleteReel`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      data: formData
    });
    if (response.data.message == "Please provide a valid token.") {
      Alert.alert("Provide a valid token.")
    } else if (response.data.message == 'Please provide a token.') {
      Alert.alert('Token required')
    }
    else if (response.data.deleted) {
      // Reel deleted successfully
      //console.log('Reel deleted');
    } else {
      console.error('Failed to delete reel');
    }
  }
  const fetchfriends = async () => {
    await fetch(`${baseUrl}/totalfriend?userId=${data._id}&currentUser=${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(res => {
        //console.log("##### all reels response ####", data.UploadedVideos)
        if (res.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (res.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          console.log("friend infooooooooooooo", res)

          setTotalFriendsCount(res.totalFrnds)
          if (data._id === currentUser.userId) {
            setAlreadyFriend(true)
          } else {
            if (res.alreadyFriend == 'pending') {
              setAlreadyFriend(false)
              setRequestSent(true)
            } else if (res.alreadyFriend == false) {
              setAlreadyFriend(false)
              setRequestSent(false)
            }
            else {
              setAlreadyFriend(true)
            }
          }
        }
      })
      .catch(error => {
        //console.log(error);
        Alert('Error while fetching data');
      });
  };
  const sendRequest = async contact => {
    setIsSending(true);
    try {
      const response = await fetch(
        `${baseUrl}/sendRequest?requesterId=${currentUser.userId}&responderId=${data._id}`,
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

        const res = await response.json();
        console.log('sendRequest========', res);
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
  const cancelRequest = async () => {
    console.log("''''''''''======''''''''''",);
    const result = await fetch(
      `${baseUrl}/cancelRequest?requesterId=${currentUser.userId}&responderId=${data._id}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (result.ok) {
      const resultJson = await result.json();
      setRequestSent(false)
      console.log('cancel successfully...', resultJson);
    } else if (result.status == 404) {
      console.log('request not found');
    } else {
      console.log('cannot cancel reuest');
    }
  };

  const onBuffer = e => {
    console.log('buffering....', e);
  };

  // ------------------------
  const onError = e => {
    console.log('error raised', e);
  };


  // EFFECTS
  useEffect(() => {
    fetchUploadedVideos(); // Call the new function to fetch uploaded videos
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 1000);
  }, []);
  useEffect(() => {
    fetchfriends()
  }, [])
  useEffect(() => {
    //console.log("reel id useefect", reelid)
  }, [reelid]);

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: theme.backgroundColor }}>
      <ScrollView style={{  flex: 1 }}>
        <InnerScreensHeader navigation={props.navigation} screenName={data.name} />
        <Image
          source={{ uri: `${baseUrl}${data.profileImage}` }}
          style={{
            height: hp('30%'),
            width: wp('100%'),
            resizeMode: 'cover',
          }}
        />
        <View style={{ flexDirection: 'row', width: wp('100'), paddingTop: hp('2.5') }}>
          <View style={{ justifyContent: 'center', width: wp('20'), alignItems: 'center' }}>
            <Image style={[{ height: hp('7%'), width: hp('7%'), borderRadius: wp('100') }]}
              source={{ uri: `${baseUrl}${data.profileImage}` }}
            />
          </View>
          <View style={{ paddingHorizontal: wp('5'), flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <View>
              <Text
                style={[{ fontSize: wp('7'), opacity: 0.8, fontFamily: FontStyle.regularFont, color: theme.profileNameColor, }]}>
                {data.name}
              </Text>
              <Text
                style={[{ fontSize: wp('4.5'), fontFamily: FontStyle.regularFont, color: AppColors.primary, opacity: 0.7 }]}>
                {totalFriendsCount} friends
              </Text>
            </View>
            {alreadyFriend === false &&
              <View style={{ justifyContent: 'center', alignItems: "center" }}>
                {
                  requestSent === true ? <TouchableOpacity
                    onPress={() => {
                      // setClickedItem(data);
                      cancelRequest();
                    }}
                    style={HomeNeoCards.addUserinGroup(AppColors.primary)}

                  >
                    <Text style={{
                      color: AppColors.white,
                      fontSize: hp('1.7'),
                      fontFamily: FontStyle.regularFont,
                    }}>Cancel</Text>
                  </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={() => {
                        // setClickedItem(data);
                        sendRequest();
                      }}
                      style={HomeNeoCards.addUserinGroup(AppColors.primary)}

                    >
                      <Text style={{
                        color: AppColors.white,
                        fontSize: hp('1.7'),
                        fontFamily: FontStyle.regularFont,
                      }}>Add</Text>
                    </TouchableOpacity>
                }
              </View>
            }
          </View>
        </View>
        <View style={MyActivityStyleSheet.reelsContainer}>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <AppActivityIndicator/>

               
            </View>
          ) : (
            <View style={Containers.centercontent}>
              {allUploads.length === 0 ? (
                <View style={MyActivityStyleSheet.lottieContainer}>
                  <Text style={HomeNeoCards.noSearchResultText}>No uploads.</Text>
                </View>
              ) : (
                <FlatList
                  data={allUploads}
                  key={1}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    console.log('...', item)
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentVideo(item);
                          setCurrentIndex(index);
                          props.navigation.navigate('UserUploads', { currentIndex: currentIndex, currentVideo: item, data: data })
                          setReelid(item._id)
                        }}
                      >
                        <View style={MyActivityStyleSheet.reelsView}>
                          <View
                            style={MyActivityStyleSheet.reelStyle}
                          >
                            <Video
                              source={{ uri: `${baseUrl}${item.uri}` }}
                              ref={videoRef}
                              resizeMode="cover"
                              paused={true}
                              repeat={true}
                              onBuffer={onBuffer}
                              onError={onError}
                              onLoad={() => setIsLoading(false)} // Set isLoading to false when video is loaded
                              style={MyActivityStyleSheet.reelStyle}

                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
              )}
              <ReactNativeModal
                visible={isModalVisible}
                coverScreen={true}
                style={MyActivityStyleSheet.reelsModal}
              >
                <View style={MyActivityStyleSheet.viewInModal}>
                  {currentIndex !== null && allUploads[currentIndex] ? (
                    <View>
                      <View style={MyActivityStyleSheet.modalReelHeader}>
                        <Text style={MyActivityStyleSheet.headerDescriptionText}>{allUploads[currentIndex].user.name}</Text>
                        <TouchableRipple
                          onPress={() => {
                            //console.log("cur============", allUploads[currentIndex])
                            deleteReel(allUploads[currentIndex]);
                            setIsModalVisible(false);
                          }}
                          rippleColor="rgba(0, 0, 0, 0.3)"
                        >
                          <IconButton
                            icon="delete"
                            iconColor={"black"}
                            size={20}
                          />
                        </TouchableRipple>
                        <TouchableRipple
                          onPress={() => setIsModalVisible(false)}
                          rippleColor="rgba(0, 0, 0, 0.3)"
                        >
                          <IconButton
                            icon="close"
                            iconColor={"black"}
                            size={20}
                          />
                        </TouchableRipple>
                      </View>
                      <WebView
                        containerStyle={MyActivityStyleSheet.webviewContainerStyle}
                        source={{ html: GenerateVideoHtml(baseUrl, allUploads[currentIndex], true, false) }}
                        style={MyActivityStyleSheet.webviewContainerStyle}
                        mediaPlaybackRequiresUserAction={false}
                      />
                    </View>
                  ) : null}
                </View>
              </ReactNativeModal>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default PublicProfile;