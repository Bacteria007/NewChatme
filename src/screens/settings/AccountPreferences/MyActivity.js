import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../../context/AppContext';
import LottieView from 'lottie-react-native';
import { ActivityIndicator as ActivityIndicatorPaper, IconButton, TouchableRipple } from 'react-native-paper';
import axios from 'react-native-axios';
import WebView from 'react-native-webview';
import AppColors from '../../../assets/colors/Appcolors';
import Containers from '../../../assets/styles/Containers';
import ReactNativeModal from 'react-native-modal';
import GenerateVideoHtml from '../../Reels/ReelsHtmlVideo';
import MyActivityStyleSheet from '../../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';
import { ThemeContext } from '../../../context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import Video from 'react-native-video'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
const MyActivity = ({ navigation }) => {
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const userId = currentUser.userId;
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const [allUploads, setAllUploads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reelid, setReelid] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  // ------------------------
  const changeIndex = ({ index }) => {
    setCurrentIndex(index);
    // setIsVideoLiked(uploadedReels[index]?.isLiked || false);
    // setLikeCount(uploadedReels[index]?.likeCount || 0);
  };
  const onBuffer = e => {
    console.log('buffering....', e);
  };

  // ------------------------
  const onError = e => {
    console.log('error raised', e);
  };
  const showModal = () => {
    setIsModalVisible(true)
  }
  const hideModal = () => {
    setIsModalVisible(false)
  }

  // New function for fetching uploaded videos
  const fetchUploadedVideos = async () => {
    fetch(`${baseUrl}/userReels?userId=${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        //console.log("##### all reels response ####", data.UploadedVideos)
        if (data.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          const videosWithSources = data.UploadedVideos.map(video => ({
            _id: video._id,
            uri: video.video,
            desc: video.name,
            user: video.userId
          }));
          const myuploads = videosWithSources.filter(
            user => user.user._id === currentUser.userId, // id KI BASE PR SEARCH HO RAHI HAI
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


  // EFFECTS
  useEffect(() => {
    fetchUploadedVideos(); // Call the new function to fetch uploaded videos

    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 1000);
  }, []);
  useEffect(() => {
    //console.log("reel id useefect", reelid)
  }, [reelid]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={MyActivityStyleSheet.mainContainer(theme.backgroundColor)}>
        <InnerScreensHeader navigation={navigation} screenName="My uploads" />
        <View style={MyActivityStyleSheet.reelsContainer}>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={20} color={AppColors.black} style={{ alignSelf: 'center' }} />
            </View>
          ) : (
            <View style={Containers.centercontent}>
              {allUploads.length === 0 ? (
                <View style={MyActivityStyleSheet.lottieContainer}>
                  <Text style={HomeNeoCards.noSearchResultText}>You have no uploads.</Text>
                </View>
              ) : (
                <FlatList
                  data={allUploads}
                  key={1}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    const HtmlVideo = GenerateVideoHtml(baseUrl, item, false, true);
                    console.log('/////ttttt', item)
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentVideo(item);
                          setCurrentIndex(index);
                          showModal();
                          setReelid(item._id)
                          //console.log("reel id", item._id)
                        }}
                      >
                        <View style={MyActivityStyleSheet.reelsView}>
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
                            console.log("cur============", allUploads[currentIndex])
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

                          onPress={() => {
                            setIsModalVisible(false)
                            console.log("cur============", allUploads[currentIndex].uri)
                            console.log("cur============", currentIndex)

                          }}
                          rippleColor="rgba(0, 0, 0, 0.3)"
                        >
                          <IconButton
                            icon="close"
                            iconColor={"black"}
                            size={20}
                          />
                        </TouchableRipple>
                      </View>
                      {isLoading ? (
                        <View style={ReelscreenStyle.LoaderView}>
                          <ActivityIndicator
                            size="large"
                            color={AppColors.white}
                            style={ReelscreenStyle.LoaderStyle}
                          />
                        </View>
                      ) : (
                        <Video
                          source={{ uri: `${baseUrl}${allUploads[currentIndex].uri}` }}
                          ref={videoRef}
                          resizeMode="center"
                          paused={false}
                          repeat={false}
                          onBuffer={onBuffer}
                          onError={onError}
                          onLoad={() => setIsLoading(false)} // Set isLoading to false when video is loaded
                          style={{
                            width: wp('80'),
                            height: hp('80'),
                            flex: 1,
                          }}
                          onEnd={hideModal}
                        />
                      )}
                    </View>
                  ) : null}
                </View>
              </ReactNativeModal>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>

  );
};

export default MyActivity;