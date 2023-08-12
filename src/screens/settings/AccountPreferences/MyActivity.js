import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
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
import { IconButton, Modal, PaperProvider, Portal, TouchableRipple } from 'react-native-paper';
import axios from 'react-native-axios';

const MyActivity = ({ navigation }) => {
  const { baseUrl } = useContext(AppContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const videoRef = useRef(null);
  const [allUploads, setAllUploads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reelid, setReelid] = useState(null);

  // New function for fetching uploaded videos
  const fetchUploadedVideos = async () => {
    const userid = await AsyncStorage.getItem('user');

    const parseId = JSON.parse(userid);
    fetch(`${baseUrl}/uploadedReels`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log("##### all reels response ####",data.UploadedVideos)
       
        const videosWithSources = data.UploadedVideos.map(video => ({
          _id: video._id,
          uri: { uri: video.video },
          desc: video.name,
          user:video.userId
        }));
        const myuploads = videosWithSources.filter(
          user => user.userId === parseId, // id KI BASE PR SEARCH HO RAHI HAI
        );
        console.log('Myuploads --------^^^^^^^^^^^^^^^^^^^^  ', myuploads);
        setAllUploads(videosWithSources);
        console.log('allUploads --------^^^^^^^^^^^^^^^^^^^^  ', allUploads);
        console.log(videosWithSources);
      })
      .catch(error => {
        console.log(error);
        Alert('Error while fetching data');
      });
  };

  const deleteReel = async (item) => {
    const userid = await AsyncStorage.getItem('user');
    const parseId = JSON.parse(userid);
    console.log("userid in frontend", parseId)
    console.log("reelId in frontend", item._id)

    const formData = new FormData();
    formData.append("reel_id", item._id)
    formData.append("user_id", parseId)
    const response = await axios(`${baseUrl}/deleteReel`, {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    });
    if (response.data.deleted) {
      // Reel deleted successfully
      console.log('Reel deleted');
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
    console.log("reel id useefect",reelid)
  }, [allUploads,reelid]);

  return (

    <PaperProvider>
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
                        setReelid(item._id)
                        console.log("reel id",item._id)
                      }}

                    >
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
        <Portal>
          <Modal
            visible={isModalVisible}
          // onDismiss={() => setIsModalVisible(false)}
          >
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

              {currentIndex !== null && allUploads[currentIndex] ? (
                <>
                  <View style={{ height: hp('7%'), width: wp('90%'), backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'left', flex: 1, marginLeft: 5, color: 'black' }}>You Video: {allUploads[currentIndex].uri.uri}</Text>
                    <TouchableRipple
                      onPress={() => {
                        console.log("cur============", allUploads[currentIndex])
                        deleteReel(allUploads[currentIndex])
                      }}
                      rippleColor="rgba(0, 0, 0, 0.6)"

                    >
                      <IconButton
                        icon="delete"
                        iconColor={"black"}
                        size={20}
                      />
                    </TouchableRipple>
                    <TouchableRipple
                      onPress={() => setIsModalVisible(false)}
                      rippleColor="rgba(0, 0, 0, .6)"

                    >
                      <IconButton
                        icon="close"
                        iconColor={"black"}
                        size={20}
                      />
                    </TouchableRipple>
                  </View>
                  <Video
                    source={{ uri: `${baseUrl}${allUploads[currentIndex]._id}` }}
                    resizeMode="cover"
                    muted={false}
                    style={{ height: hp('50%'), width: wp('90%') }}
                    repeat={true}
                    ref={videoRef}
                  />
                </>


              ) : null}
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default MyActivity;
