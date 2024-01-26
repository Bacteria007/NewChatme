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
import GenerateVideoHtml from './ReelsHtmlVideo';
import { ZoomVideo } from '../../helpers/UiHelpers/ZoomVideo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const UserUploads = props => {
  //   **********************************           VARIABLES               ****************************
  const { baseUrl, token ,currentUser} = useContext(AppContext);
const{videoId}=props.route.params
  //   **********************************          USE STATE               ****************************
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [uploadedReels, setUploadedReels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

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
  // ------------------------
  const UploadedReels = async () => {
    fetch(`${baseUrl}/uploadedReels/userReels?userId=${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        // if(data.message=="Please provide a valid token."){
        //   Alert.alert("Provide a valid token.")
        // }else if(data.message=='Please provide a token.'){
        //   Alert.alert('Token required')
        // }else{
        const videosWithSources = data.UploadedVideos.map(video => ({
          uri: { uri: video.video }, // Convert the path to a source object
          desc: video.name,
          reelUploader: video.userId
        }));

        // console.log("fetch reel response",videosWithSources)
        setUploadedReels(videosWithSources);
        setIsLoadingData(false)
        // }
      })
      .catch(error => console.log(error));
    setIsLoadingData(false)
  };
  // ------------------------
  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  // ------------------------
  const changeIndex = ({ index }) => {
    setCurrentIndex(index);
  };
  //   **********************************          USE EFFECTS               ****************************

  useEffect(() => {
    UploadedReels().then(() => { setIsLoadingData(false) })
    props.navigation.addListener('focus', () => {
      UploadedReels().then(() => { setIsLoadingData(false) })
    });
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
        {isLoadingData && (
          <View style={ReelscreenStyle.LoaderView}>
            <ActivityIndicator
              size="large"
              color={AppColors.white}
              style={ReelscreenStyle.LoaderStyle}
            />
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
                    onPress={toggleVideoPlayback}
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
                        style={[ReelscreenStyle.backgroundVideo]}

                      />
                      // <ZoomVideo source={item}/>
                    )}

                  </TouchableOpacity>
                  <ReelFooter onPressShare={() => shareVideo()} item={item.reelUploader} />
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
