import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../../context/AppContext';
import Video from 'react-native-video';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyActivity = ({ navigation }) => {
  const { baseUrl } = useContext(AppContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const [allUploads, setAllUploads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New function for fetching uploaded videos
  const fetchUploadedVideos = async () => {
    const userid = await AsyncStorage.getItem('user');

    const parseId = JSON.parse(userid);
    fetch(`${baseUrl}/uploadedReels`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        const videosWithSources = data.UploadedVideos.map(video => ({
          _id: video.userId,
          uri: { uri: video.video },
          desc: video.name,
        }));

        const myuploads = videosWithSources.filter(
          user => user._id === parseId, // NAME KI BASE PR SEARCH HO RAHI HAI
        );
        setAllUploads(myuploads);
        console.log('Myuploades   ', myuploads);
        console.log(videosWithSources);
      })
      .catch(error => {
        console.log(error);
        Alert('Error while fetching data');
      });
  };

  useEffect(() => {
    fetchUploadedVideos(); // Call the new function to fetch uploaded videos
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 2000);
  }, []);

  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName="My uploads" />

      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={require('../../../assets/animations/Lottieanimations/loading2.json')}
            autoPlay
            loop
            style={{
              height: hp('30'),
              width: wp('60'),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: 'orange',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Loading! Please Wait
          </Text>
        </View>
      ) : (
        <View>
          {allUploads.length === 0 ? (
            <View>
              <LottieView
                source={require('../../../assets/animations/Lottieanimations/oops3.json')}
                autoPlay
                loop
                style={{
                  height: hp('60'),
                  width: wp('80'),
                  left: 50,
                  marginTop: -20,
                }}
              />
              <Text
                style={{
                  marginTop: -100,
                  fontSize: 20,
                  color: 'black',
                  textAlign: 'center',
                }}>
                You don't have any uploads.
              </Text>
            </View>
          ) : (
            <FlatList
              data={allUploads}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View style={{ height: wp('34%'), width: wp('34%') }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentVideo(item);
                      setCurrentIndex(index);
                      setIsModalVisible(true);
                    }}>
                    <Video
                      source={{ uri: `${baseUrl}${item.uri.uri}` }}
                      resizeMode="cover"
                      muted={true}
                      style={{ height: wp('33%'), width: wp('33%') }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      )}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        transparent={false}
        backdropOpacity={0.5}
        useNativeDriver>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setIsModalVisible(false)}>
          {currentIndex !== null && allUploads[currentIndex] ? (
            <Video
              source={{ uri: `${baseUrl}${allUploads[currentIndex].uri.uri}` }}
              resizeMode="cover"
              muted={false}
              style={{ height: hp('60%'), width: wp('90%') }}
              repeat={true}
              ref={videoRef}
            />
          ) : null}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MyActivity;
