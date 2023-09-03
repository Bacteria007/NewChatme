import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ScrollView, SafeAreaView } from 'react-native'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../../context/AppContext';
import LottieView from 'lottie-react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import axios from 'react-native-axios';
import WebView from 'react-native-webview';
import AppColors from '../../../assets/colors/Appcolors';
import Containers from '../../../assets/styles/Containers';
import ReactNativeModal from 'react-native-modal';
import GenerateVideoHtml from '../../reels/ReelsHtmlVideo';
import MyActivityStyleSheet from '../../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';
import { ThemeContext } from '../../../context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
            uri: { uri: video.video },
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
            <View style={MyActivityStyleSheet.lottieContainer}>
              <LottieView style={MyActivityStyleSheet.loadingLottieStyle} autoPlay loop
                source={require('../../../assets/animations/Lottieanimations/loading2.json')}
              />
              <Text style={MyActivityStyleSheet.loadingLottieText}>
                Loading! Please Wait
              </Text>
            </View>
          ) : (
            <View style={Containers.centercontent}>
              {allUploads.length === 0 ? (
                <View style={MyActivityStyleSheet.lottieContainer}>
                  <LottieView autoPlay loop style={MyActivityStyleSheet.noUploadsLottieStyle}
                    source={require('../../../assets/animations/Lottieanimations/l12.json')} />
                  <Text style={MyActivityStyleSheet.noUploadsText(theme.profileNameColor)}>
                    You don't have any uploads.
                  </Text>
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
                          <View
                            style={MyActivityStyleSheet.reelStyle}
                          >
                            <WebView
                              originWhitelist={['*']}
                              source={{ html: `${HtmlVideo}` }}
                              style={MyActivityStyleSheet.reelStyle}
                              scrollEnabled={false}
                              showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                              setDisplayZoomControls={false}
                              setBuiltInZoomControls={false}
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
      </View>
    </SafeAreaView>

  );
};

export default MyActivity;