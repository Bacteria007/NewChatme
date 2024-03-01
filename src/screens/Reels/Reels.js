import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/colors/Appcolors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ReelHeader from '../../components/Headers/ReelHeader/ReelHeader';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import ReelFooter from '../../components/Headers/ReelHeader/ReelFooter';
import AppContext from '../../context/AppContext';
import Share from 'react-native-share';
import { Text } from 'react-native-paper';
import WebView from 'react-native-webview';
import Video from 'react-native-video'
import GenerateVideoHtml from './ReelsHtmlVideo';
import { ZoomVideo } from '../../helpers/UiHelpers/ZoomVideo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppActivityIndicator from '../../components/FlatlistComponents/AppActivityIndicator';
import Icon, { Icons } from '../../assets/Icons';


const Reels = props => {

  const { baseUrl, token, currentUser } = useContext(AppContext);
  //USE STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [uploadedReels, setUploadedReels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const videoRef = useRef(null);

  //    FUNCTIONS
  const shareVideo = async () => {
    const videoUri = `${baseUrl}${uploadedReels[currentIndex]?.uri}`;

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
  const onBuffer = e => {
    console.log('buffering....', e);
  };
  const onError = e => {
    console.log('error raised', e);
  };

  const likeVideo = async () => {
    console.log("like consle", `${uploadedReels[currentIndex]?.uri}`)
    await fetch(`${baseUrl}/likeVideo?videoUrl=${uploadedReels[currentIndex]?.uri}&userId=${currentUser.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        if (data.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          if (data.success) {
            setUploadedReels(prevState => {
              const updatedReels = [...prevState];
              updatedReels[currentIndex].likes = data.updatedVideo.likes;
              return updatedReels;
            });
          }
          console.log('like ????????', data)
        }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
  const dislikeVideo = async () => {
    console.log("like consle", `${uploadedReels[currentIndex]?.uri}`)
    await fetch(`${baseUrl}/dislikeVideo?videoUrl=${uploadedReels[currentIndex]?.uri}&userId=${currentUser.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        if (data.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          if (data.success) {
            setUploadedReels(prevState => {
              const updatedReels = [...prevState];
              updatedReels[currentIndex].likes = data.updatedVideo.likes;
              return updatedReels;
            })
          }
          console.log('dis????????', data)

        }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
  const UploadedReels = async () => {
    await fetch(`${baseUrl}/uploadedReels?userId=${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        if (data.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          const videosWithSources = data.UploadedVideos ? data.UploadedVideos.map(video => ({
            uri: video.video,
            desc: video.name,
            reelUploader: video.userId,
            isLiked: video.isLiked,
            likeCount: video.likeCount,
            createdAt: video.createdAt,
            likes: video.likes

          })) : [];

          console.log("alll reel res ==============", videosWithSources)

          // console.log("fetch reel response",videosWithSources)
          setUploadedReels(videosWithSources);
          setIsLoadingData(false);
          setIsLoading(false);
        }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  const changeIndex = ({ index }) => {
    setCurrentIndex(index);
    console.log('uploadedReels[index]+++++++++++++++++=',uploadedReels[index].uri)
    const videoId = uploadedReels[index]?.uri;
    if (videoId) {
      updateUserActivity(videoId);
    }
    // setIsVideoLiked(uploadedReels[index]?.isLiked || false);
    // setLikeCount(uploadedReels[index]?.likeCount || 0);
  };
  const updateUserActivity = async (videoId) => {
    const formdata = new FormData();
console.log("ye cal hova_______________-------------------")
    formdata.append('userId', currentUser.userId);
    formdata.append('videoUri', videoId);
   
    try {
      await fetch(`${baseUrl}/userActivity`, {
        method: 'POST',
        headers: {
          'Content-Type':  'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
  
      console.log('User activity updated successfully');
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  };

  //    USE EFFECTS

  useEffect(() => {
    UploadedReels()
    props.navigation.addListener('focus', () => {
      UploadedReels()
    });
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
        <ReelHeader navigation={props.navigation} />
        {isLoadingData && (
          <View style={ReelscreenStyle.LoaderView}>
                    <AppActivityIndicator/>

          </View>
        )}
        {uploadedReels.length != 0 ?
          <SwiperFlatList
            vertical={true}
            data={uploadedReels}
            onChangeIndex={changeIndex}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const HtmlVideo = GenerateVideoHtml(baseUrl, item, true, false)
              return (
                <View style={[ReelscreenStyle.flatlistContainerView]}>
                  <TouchableOpacity
                    style={[ReelscreenStyle.TouchableOpacityStyle]}
                    activeOpacity={1}
                    onPress={toggleVideoPlayback}>
                      
                    {isLoading ? (
                      <View style={ReelscreenStyle.LoaderView}>
        <AppActivityIndicator/>
                        
                      </View>
                    ) : (
                      // <WebView
                      //   originWhitelist={['*']}
                      //   source={{
                      //     html: `${HtmlVideo}`,
                      //   }}
                      //   style={ReelscreenStyle.backgroundVideo}
                      // />
                  <>
                          <Video
                          source={{ uri: `${baseUrl}${item.uri}` }}
                          ref={videoRef}
                          resizeMode="cover"
                          paused={currentIndex !== index || !isVideoPlaying}
                          repeat={true}
                          onBuffer={onBuffer}
                          onError={onError}
                          onLoad={() =>{ 
                          setIsVideoPlaying(true)
                          setIsLoading(false)}} // Set isLoading to false when video is loaded
                          style={ReelscreenStyle.backgroundVideo}
                          
                      />
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      {isVideoPlaying?'':<Icons.AntDesign name='play' size={wp('8.2%')} color={AppColors.white} />}
                      </View></>
                    )}
                  </TouchableOpacity>
                  <ReelFooter
                    callingScreen={'reel'}
                    onPressShare={() => shareVideo()}
                    onPressLike={() => likeVideo()}
                    onPressDislike={() => dislikeVideo()}
                    isVideoLiked={item.likes?.includes(currentUser.userId)}
                    item={item.reelUploader}
                    likeCount={item.likes?.length}
                    createdAt={item.createdAt}
                    navigation={props.navigation}
                  />
                </View>
              );
            }}

          />
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

export default Reels;