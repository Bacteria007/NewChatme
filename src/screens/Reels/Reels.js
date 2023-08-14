import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AppColors from '../../assets/colors/Appcolors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ReelHeader from '../../components/Headers/ReelHeader/ReelHeader';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import ReelFooter from '../../components/Headers/ReelHeader/ReelFooter';
import AppContext from '../../context/AppContext';
import Share from 'react-native-share';
import { Text } from 'react-native-paper';
import FontStyle from '../../assets/styles/FontStyle';
import Containers from '../../assets/styles/Containers';
import WebView from 'react-native-webview';
import GenerateVideoHtml from './ReelsHtmlVideo';

const Reals = props => {
  //   **********************************           VARIABLES               ****************************
  const { height, width } = Dimensions.get('window');
  const { baseUrl } = useContext(AppContext);

  //   **********************************          USE STATE               ****************************
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [uploadedReels, setUploadedReels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

      await Share.open(options);
    } catch (error) {
      console.log('Error sharing video:', error);
    }
  };

  // ------------------------
  const onBuffer = e => {
    console.log('buffering....', e);
  };

  // ------------------------
  const onError = e => {
    console.log('error raised', e);
  };

  // ------------------------
  const UploadedReels = async () => {
    fetch(`${baseUrl}/uploadedReels`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        const videosWithSources = data.UploadedVideos.map(video => ({
          uri: { uri: video.video }, // Convert the path to a source object
          desc: video.name,
        }));

        setUploadedReels(videosWithSources);
      })
      .catch(error => console.log(error));
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
    UploadedReels();
  }, [uploadedReels]);

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

  // RETURN
  return (
    <View style={[ReelscreenStyle.containerStyle]}>
      {/* HEADER COMPONENT OF REEL */}
      <ReelHeader navigation={props.navigation} />
      {uploadedReels.length != 0 ?
        <SwiperFlatList
          vertical={true}
          data={uploadedReels}
          onChangeIndex={changeIndex}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const HtmlVideo=GenerateVideoHtml(baseUrl,item)
            return (
              <View style={[ReelscreenStyle.flatlistContainerView]}>
                <TouchableOpacity
                  style={[ReelscreenStyle.TouchableOpacityStyle]}
                  activeOpacity={1}
                  onPress={toggleVideoPlayback}
                // onLongPress={() => {
                //   handleLongPress(item)
                //   console.log("reel item", item)
                // }}
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
                        html: `${HtmlVideo}` }}
                      style={[ReelscreenStyle.backgroundVideo]}
                    />
                  )}
                </TouchableOpacity>
                <ReelFooter onPressShare={() => shareVideo()} />
              </View>
            );
          }}

        />
        :
        <View style={Containers.centerContainer}>

          <Text
            style={{
              fontSize: 25,
              color: 'white',
              textAlign: 'center',
              fontFamily: FontStyle.boldFont,
            }}>
            Upload a new one by clicking that plus icon ↗️
          </Text>
        </View>
      }
    </View>
  );
};

export default Reals;
