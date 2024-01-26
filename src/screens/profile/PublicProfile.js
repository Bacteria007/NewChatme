import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ScrollView, SafeAreaView,ActivityIndicator  } from 'react-native'
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
  const [totalFriendsCount, setTotalFriendsCount] = useState(0)
  const { data} = props.route.params;
console.log("public profile",data)
const showProfileModal = () => {
  setProfileModal(true);
};
const hideProfileModal = () => {
  setProfileModal(false);
};

  const showModal = () => {
    setIsModalVisible(true)
  }
  const hideModal = () => {
    setIsModalVisible(false)
  }

  // New function for fetching uploaded videos
  const fetchUploadedVideos = async () => {
   await  fetch(`${baseUrl}/userReels?userId=${data._id}`, {
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
            uri: { uri: video.video },
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
    await fetch(`${baseUrl}/totalfriend?userId=${data._id}`, {
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
          setTotalFriendsCount(data.totalFrnds)
        }
      })
      .catch(error => {
        //console.log(error);
        Alert('Error while fetching data');
      });
  };

  
  // EFFECTS
  useEffect(() => {
    fetchUploadedVideos(); // Call the new function to fetch uploaded videos
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 1000);
  }, []);
  useEffect(()=>{
    fetchfriends()
  },[])
  useEffect(() => {
    //console.log("reel id useefect", reelid)
  }, [reelid]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={MyActivityStyleSheet.mainContainer(theme.backgroundColor)}>
        <InnerScreensHeader navigation={props.navigation} screenName={data.name} />
        <View style={{margin:wp('5')}}>
        <TouchableRipple
                    rippleColor={'rgba(0,0,0,1)'}
                    borderless
                    // style={[ProfileScreenStyleSheet.img]}
                    onPress={() => {
                      showProfileModal();
                      console.log(`${baseUrl}${currentUser.profileImage}`);
                    }}>
                    <Image
                      source={{ uri: `${baseUrl}${data.profileImage}` }}
                      style={[{
                        height: hp('13%'),
                        width: hp('13%'),
                        borderRadius: wp('100'),
                        backgroundColor: AppColors.periWinkle,
                      }]}
                    />
                  </TouchableRipple>
                  <Text
                style={[{fontSize: wp('7'), fontFamily: FontStyle.mediumFont,opacity:0.9,color:AppColors.black,marginTop:hp('1')}]}>
                {data.name}
              </Text>
              <Text
                style={[{fontSize: wp('5.8'), fontFamily: FontStyle.regularFont,color:AppColors.black,opacity:0.9}]}>
                {data.country}
              </Text>
              <Text
                style={[{fontSize: wp('4.5'), fontFamily: FontStyle.regularFont,color:AppColors.primary,opacity:0.8,}]}>
                {totalFriendsCount} friends
              </Text>

        </View>
        <View style={MyActivityStyleSheet.reelsContainer}>
          {isLoading ? (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={20} color={AppColors.black} style={{alignSelf:'center'}}/>
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
              <ReactNativeModal
        visible={profileModal}
        coverScreen={true}
        style={HomeNeoCards.modalContainer}
        animationIn="slideInUp"
        animationOut="slideInDown"
        onDismiss={hideProfileModal}
        onBackdropPress={hideProfileModal}
        onBackButtonPress={hideProfileModal}>
        <View style={HomeNeoCards.modalView}>
          {data.profileImage == null ? (
            <View style={HomeNeoCards.dpVew}>
              <Image
                source={require('../../assets/imges/default/userProfileDark.jpg')}
                style={{
                  height: hp('45%'),
                  width: hp('45%'),
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : (
            <Image
              source={{ uri: `${baseUrl}${data.profileImage}` }}
              style={{
                height: hp('40%'),
                width: hp('40%'),
                resizeMode: 'cover',
              }}
            />
          )}
        </View>
      </ReactNativeModal>

            </View>
          )}
        </View>
      </View>
    </SafeAreaView>

  );
};

export default PublicProfile;