import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/colors/Appcolors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import ReelFooter from '../../components/Headers/ReelHeader/ReelFooter';
import AppContext from '../../context/AppContext';
import Share from 'react-native-share';
import { Text } from 'react-native-paper';
import Video from 'react-native-video';
import GenerateVideoHtml from '../Reels/ReelsHtmlVideo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../context/ThemeContext';
import UserUploadsHeader from '../../components/Headers/ReelHeader/UserUploadsHeader';
import AppActivityIndicator from '../../components/FlatlistComponents/AppActivityIndicator';
import WebView from 'react-native-webview';
import MyActivityStyleSheet from '../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const UserUploads = props => {
  const { baseUrl, token, currentUser } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const { data, currentVideo } = props.route.params;
  console.log("UserUploads", data)

  // USE STATE
  const [currentIndex, setCurrentIndex] = useState(props.route.params.currentIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [uploadedReels, setUploadedReels] = useState([])
  // console.log("uploadedReels ---------------------", uploadedReels)
  // USE REF
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);
  // FUNCTIONS

  const onBuffer = e => {
    console.log('buffering....', e);
  };
  const onError = e => {
    console.log('error raised', e);
  };

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
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

  const likeVideo = async () => {
    console.log("like consle", `${uploadedReels[currentIndex]?.uri}`)
    await fetch(`${baseUrl}/likeVideo?videoUrl=${uploadedReels[currentIndex]?.uri}&userId=${currentUser.userId}`, {
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
            setUploadedReels(prevState => {
              const updatedReels = [...prevState];
              updatedReels[currentIndex].likes = res.updatedVideo.likes;
              return updatedReels;
            });
            // setIsVideoLiked(true)
            // setLikeCount(res.likeCount)
            console.log('liked success')
          }
          else {
            // setIsVideoLiked(false)
            console.log('cannot like')
          }

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
      .then(async res => {
        if (res.message == "Please provide a valid token.") {
          Alert.alert("Provide a valid token.")
        } else if (res.message == 'Please provide a token.') {
          Alert.alert('Token required')
        } else {
          if (res.success) {
            setUploadedReels(prevState => {
              const updatedReels = [...prevState];
              updatedReels[currentIndex].likes = res.updatedVideo.likes;
              return updatedReels;
            });
            // setIsVideoLiked(false)
            // setLikeCount(res.likeCount)
            console.log('disliked success')
          }
          else {
            // setIsVideoLiked(false)
            console.log('cannot dislike')
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
          const videosWithSources = res.UploadedVideos ? res.UploadedVideos.map(video => ({
            _id: video._id,
            uri: video.video,
            desc: video.name,
            user: video.userId,
            isLiked: video.isLiked,
            likeCount: video.likeCount,
            likes: video.likes,
            createdAt: video.createdAt,

          })) : [];
          const myuploads = videosWithSources.filter(user => user.user._id === data._id);
          console.log('Myuploads --------^^^^^^^^^^^^^^^^^^^^  ', myuploads);
          setUploadedReels(myuploads);
          setIsLoading(false);
          // setIsVideoLiked(videosWithSources[currentIndex].isLiked);
          // setLikeCount(videosWithSources[currentIndex].likeCount);

          // console.log('allUploads --------^^^^^^^^^^^^^^^^^^^^  ', allUploads);
          //console.log(videosWithSources);
        }
      })
      .catch(error => {
        //console.log(error);
        Alert('Error while fetching data');
      });
  };

  // USE EFFECTS

  useEffect(() => {
    fetchUploadedVideos();
  }, []);
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex, videoRef.current]);
  return (
    <GestureHandlerRootView>
      <View style={[ReelscreenStyle.containerStyle]}>
        <UserUploadsHeader navigation={props.navigation} />
        {/* {isLoadingData && (
          <View style={ReelscreenStyle.LoaderView(theme.backgroudColor)}>
            <AppActivityIndicator/>
          </View>
        )} */}
        {uploadedReels.length != 0 ?
          <SwiperFlatList
            vertical={true}
            data={uploadedReels}
            onChangeIndex={({ index }) => {
              setCurrentIndex(index);
            }}
            index={currentIndex}
            // showPagination
            // paginationDefaultColor={AppColors.white}
            // paginationStyleItem={{ width: 10, height: 10, marginLeft: 3, marginRight: 3 }}
            // paginationStyleContainer={{ bottom: 10 }}
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
                      <View style={ReelscreenStyle.LoaderView(theme.backgroundColor)}>
                        <AppActivityIndicator />
                      </View>
                    ) : (
                      <View style={MyActivityStyleSheet.reelsView}>
                       <Video
                        source={{ uri: `${baseUrl}${item.uri}` }}
                        ref={videoRef}
                        resizeMode="cover"
                        paused={currentIndex !== index || !isVideoPlaying}
                        repeat={true}
                        onBuffer={onBuffer}
                        onError={onError}
                        onLoad={() => setIsLoading(false)} // Set isLoading to false when video is loaded
                        style={ReelscreenStyle.backgroundVideo}

                      />
                      </View>
                    )}
                  </TouchableOpacity>
                  <ReelFooter
                    callingScreen={'uploads'}
                    onPressShare={() => shareVideo()}
                    onPressLike={() => likeVideo()}
                    onPressDislike={() => dislikeVideo()}
                    isVideoLiked={item.likes?.includes(currentUser.userId)}
                    item={item.user}
                    navigation={props.navigation}
                    createdAt={item.createdAt}
                    likeCount={item.likes?.length}
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

export default UserUploads;
