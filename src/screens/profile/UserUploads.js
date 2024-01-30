import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/colors/Appcolors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ReelHeader from '../../components/Headers/ReelHeader/ReelHeader';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import ReelFooter from '../../components/Headers/ReelHeader/ReelFooter';
import AppContext from '../../context/AppContext';
import Share from 'react-native-share';
import { Text } from 'react-native-paper';
import WebView from 'react-native-webview';
import GenerateVideoHtml from '../Reels/ReelsHtmlVideo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { ZoomVideo } from '../../helpers/UiHelpers/ZoomVideo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../context/ThemeContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
const { height, width } = Dimensions.get('window');

const UserUploads = props => {
  //   **********************************           VARIABLES               ****************************
  const { baseUrl, token ,currentUser} = useContext(AppContext);
  const { theme } = useContext(ThemeContext)

  const { data, currentVideo } = props.route.params;
  const [currentIndex, setCurrentIndex] = useState(props.route.params.currentIndex);
  //   **********************************          USE STATE               ****************************
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isVideoLiked, setIsVideoLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [uploadedReels, setUploadedReels] = useState([])
  

console.log("uploadedReels ---------------------",uploadedReels)
  //   **********************************          USE REF               ****************************
  const videoRef = useRef(null);
  //   **********************************          FUNCTIONS               ****************************
  const shareVideo = async () => {
    const videoUri = `${baseUrl}${uploadedReels[currentIndex]?.uri.uri}`;

    try {
      const options = {
        message: 'Check out this awesome video!', // Message to share
        url: videoUri, // Video URL
      };

      const shareResult = await Share.open(options);
      console.log('s', shareResult)
    } catch (error) {
      console.log('Error sharing video:', error);
    }
  };
  const likeVideo = async () => {
    console.log("like consle", `${uploadedReels[currentIndex]?.uri.uri}`)
    await fetch(`${baseUrl}/likeVideo?videoUrl=${uploadedReels[currentIndex]?.uri.uri}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async res => {
        if (res.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (res.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          if (res.success) {
            setIsVideoLiked(true)
            setLikeCount(res.likeCount)
          }
          else {
            setIsVideoLiked(false)
          }

        }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
  const dislikeVideo = async () => {
    console.log("like consle", `${uploadedReels[currentIndex]?.uri.uri}`)
    await fetch(`${baseUrl}/dislikeVideo?videoUrl=${uploadedReels[currentIndex]?.uri.uri}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async res => {
        if (res.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (res.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          if (res.success) {
            setIsVideoLiked(false)
            setLikeCount(res.likeCount)
          }
          else {
            setIsVideoLiked(false)
          }

        }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
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
            uri: { uri: video.video },
            desc: video.name,
            user: video.userId
          }));
          const myuploads = videosWithSources.filter(
            user => user.user._id === data._id, // id KI BASE PR SEARCH HO RAHI HAI
          );
          console.log('Myuploads --------^^^^^^^^^^^^^^^^^^^^  ', myuploads);
          setUploadedReels(myuploads);
          setIsVideoLiked(videosWithSources[currentIndex].isLiked);
          setLikeCount(videosWithSources[currentIndex].likeCount);

          // console.log('allUploads --------^^^^^^^^^^^^^^^^^^^^  ', allUploads);
          //console.log(videosWithSources);
        }
      })
      .catch(error => {
        //console.log(error);
        Alert('Error while fetching data');
      });
  };

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  // ------------------------
  const changeIndex = ({ index }) => {
    setCurrentIndex(index);
  };
  //   **********************************          USE EFFECTS               ****************************

  // useEffect(() => {
  //   UploadedReels().then(() => { setIsLoadingData(false) })
  //   props.navigation.addListener('focus', () => {
  //     UploadedReels().then(() => { setIsLoadingData(false) })
  //   });
  // }, []);
  useEffect(() => {
    fetchUploadedVideos(); // Call the new function to fetch uploaded videos
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex, videoRef.current]);
  return (
    <GestureHandlerRootView>
      <View style={[ReelscreenStyle.containerStyle]}>
        {/* HEADER COMPONENT OF REEL */}
        {/* <StatusBar backgroundColor={"black"} barStyle={'light-content'}/> */}
        {/* <ReelHeader navigation={props.navigation} /> */}
        <InnerScreensHeader navigation={props.navigation} screenName="Posts"/>
        {/* {isLoadingData && (
          <View style={ReelscreenStyle.LoaderView}>
            <ActivityIndicator
              size="large"
              color={AppColors.white}
              style={ReelscreenStyle.LoaderStyle}
            />
          </View>
        )} */}
        {uploadedReels.length != 0 ?
        <View style={{flex:1}}>
          <SwiperFlatList
            vertical={true}
            data={uploadedReels}
            onChangeIndex={({ index }) => {
              setCurrentIndex(index);
            }}
            index={currentIndex}
            showPagination
            paginationDefaultColor="transparent"
            paginationStyleItem={{ width: 10, height: 10, marginLeft: 3, marginRight: 3 }}
            paginationStyleContainer={{ bottom: 10 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const HtmlVideo = GenerateVideoHtml(baseUrl, item, true, false)
              return (
                <View style={[{
                  // flex: 1,
                  height: height
                }]}>
                  <TouchableOpacity
                    style={[ReelscreenStyle.TouchableOpacityStyle]}
                    activeOpacity={1}
                    onPress={()=>{toggleVideoPlayback
                      videoRef.current.seek(0);}}
                  >
                    {isLoading ? (
                      <View style={ReelscreenStyle.LoaderView}>
                        <ActivityIndicator
                          size="large"
                          color={AppColors.white}
                          style={ReelscreenStyle.LoaderStyle}
                        />
                      </View>
                    ) : (
                      <WebView
                        originWhitelist={['*']}
                        source={{
                          html: `${HtmlVideo}`
                        }}
                        style={{ flex: 1, position: 'absolute', top: 0, left: 0, width: width, height: height / 2, overflow: 'hidden' }}

                      />
                      // <ZoomVideo source={item}/>
                    )}

                  </TouchableOpacity>
                  <ReelFooter onPressShare={() => shareVideo()} onPressLike={() => likeVideo()} onPressDislike={()=>dislikeVideo()} isVideoLiked={isVideoLiked} likeCount={likeCount} item={item.user} navigation={props.navigation}/>
                </View>
              );
            }}
            // bounces={false} 
            // animated={true} 
          />
          </View>
          :
          !isLoadingData && (<View style={ReelscreenStyle.lottieView}>
            <Text style={ReelscreenStyle.lottieText}>
              no reels yet.
            </Text>
          </View>
          )
        }
      </View>
    </GestureHandlerRootView>
  );
};

export default UserUploads;
