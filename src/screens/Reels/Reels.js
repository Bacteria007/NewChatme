import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import AppColors from '../../assets/colors/Appcolors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import Animated from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const Reals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const onBuffer = e => {
    console.log('buffering....', e);
  };
  const onError = e => {
    console.log('error raised', e);
  };
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [colors, setColors] = useState([
    {
      uri: require('../../assets/video/Whatsapp_20220923125145.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923051345.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923125145.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923051345.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923125145.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923051345.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923125145.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
    {
      uri: require('../../assets/video/Whatsapp_20220923051345.mp4'),
      desc: 'description description description description description description description descdescription ription description description description description description description ',
    },
  ]);

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  const changeIndex = ({index}) => {
    setCurrentIndex(index);
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: wp('3%'),
          paddingTop: hp('1%'),
        }}>
        <Text
          style={{
            fontSize: wp('6.3%'),
            fontFamily: FontStyle.regularFont,
            color: AppColors.white,
            textShadowColor: AppColors.purple,
            textShadowOffset: {width: wp('0.7%'), height: wp('0.7%')},
            textShadowRadius: wp('0.5%'),
          }}>
          Reals
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: wp('31%'),
          }}>
          <TouchableOpacity>
            <AntDesign
              name="pluscircleo"
              size={wp('7.5%')}
              color={AppColors.white}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <AntDesign
              name="appstore-o"
              size={wp('7.2%')}
              color={AppColors.white}
            />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Feather
              name="activity"
              size={wp('8.2%')}
              color={AppColors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);
  return (
    <View style={{height: height, backgroundColor: AppColors.black}}>
      {renderHeader()}
      <SwiperFlatList
        vertical={true}
        data={colors}
        renderItem={({item, index}) => {
          return (
            <View style={{flex: 1, height: height}}>
              <TouchableOpacity
                style={{width: width, height: height, position: 'absolute'}}
                activeOpacity={1}
                onPress={toggleVideoPlayback}>
                <Video
                  source={item.uri} // Can be a URL or a local file.
                  ref={videoRef} // Store reference
                  resizeMode="cover"
                  // autoplayLoop
                  paused={currentIndex !== index || !isVideoPlaying}
                  repeat={true}
                  onBuffer={onBuffer} // Callback when remote video is buffering
                  onError={onError} // Callback when video cannot be loaded
                  style={styles.backgroundVideo}
                />
              </TouchableOpacity>
              <FontAwesome5
                name="play"
                style={{
                  fontSize: isVideoPlaying ? 0 : wp('12%'),
                  position: 'absolute',
                  top: height / 2.4,
                  left: width / 2.1,
                }}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingHorizontal: wp('3.5%'),
                  paddingVertical: hp('12%'),
                  flexDirection: 'row',
                  // backgroundColor:AppColors.greenBlue,
                  position:'absolute',
                  bottom:0,
                  right:0,left:0
                }}>
                <Animated.View style={{
                      width: wp('65%'),
                      // backgroundColor:AppColors.greenBlue
                }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // width: wp('50%')
                    }}>
                    <View
                      style={{
                        height: hp('4.5%'),
                        width: hp('4.5%'),
                        backgroundColor: AppColors.white,
                        borderRadius: 100,
                      }}>
                        <Image source={require('../../assets/imges/landscaper-homepage-work-01-600x351.jpg')} style={{height: hp('4.5%'),
                        borderRadius: 100,
                        width: hp('4.5%'),}}/>
                      </View>
                    <Text
                      style={{
                        fontSize: wp('4.5%'),
                        marginLeft: wp('1.5%'),
                        // textAlign:'center',
                        marginTop: wp('1%'),
                        fontFamily: FontStyle.semiBoldFont,
                        color: AppColors.white,
                        // backgroundColor:AppColors.white
                      }}>
                      User name
                    </Text>
                  </View>
                  {/* <View > */}
                  {/* <TouchableOpacity>
                    <Text
                      numberOfLines={1}
                      style={{color: AppColors.white, fontSize: wp('4.5%')}}>
                      {item.desc}
                    </Text>
                    </TouchableOpacity> */}
                    {/* 
                      <Text
                        style={{color: AppColors.white, fontSize: wp('4%')}}>
                        More
                      </Text>
                    </TouchableOpacity> */}
                  {/* </View> */}
                </Animated.View>
                <View style={{justifyContent:'center'}}>
                  <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="share"
                    size={wp('9%')}
                    color={AppColors.white}
                    // style={{backgroundColor:AppColors.black}}
                  /></TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        onChangeIndex={changeIndex}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: width,
    height: height,
  },
});

export default Reals;
