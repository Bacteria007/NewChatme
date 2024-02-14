import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import AppContext from '../../context/AppContext';
import Pdf from 'react-native-pdf';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TouchableRipple } from 'react-native-paper';
import AppColors from '../../assets/colors/Appcolors';
import { ThemeContext } from '../../context/ThemeContext';
import ReactNativeModal from 'react-native-modal';
import { Icons } from '../../assets/Icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { ZoomImage } from '../../helpers/UiHelpers/ZoomImage';
import { Icon } from '@rneui/base';
import Slider from '@react-native-community/slider';

const RenderChats = ({ msgItem, setChangeHeader, setMsgId, changeHeader, msgId, receiver }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const { darkThemeActivator, theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [updateInterval, setUpdateInterval] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // New state to track if audio is playing

  const rippleColor = 'rgba(0,0,0,0.1)';
  const rippleColor2 = AppColors.tab;

  const handleOnPress = () => {
    if (msgItem.image) {
      if (visible) {
        hideModal();
      } else if (!visible && changeHeader) {
        setChangeHeader(false);
        setMsgId(null);
      } else {
        showModal();
      }
    } else {
      setChangeHeader(false);
      setMsgId(null);
    }
  };

  const handleLongPress = () => {
    setChangeHeader(true);
    setMsgId(msgItem._id);
  };

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);



  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const pause_play = (audioUrl) => {
    console.log("pause/play called with: ", audioUrl);

    const sound = new Sound(`${baseUrl}${audioUrl}`, '', (error) => {
      if (error) {
        console.log(audioUrl)
        console.error('Error initializing audio player:', error);
      } else if (!isPlaying) {
        console.log("play")
        setAudioPlayer(sound)
        setIsPlaying(true)
        sound.play(() => {
          setIsPlaying(true);
          const duration = sound.getDuration();
          setDuration(duration);
          const interval = setInterval(() => {
            sound.getCurrentTime((seconds) => {
              setCurrentTime(seconds);
            });
          }, 1000);
          setUpdateInterval(interval);
          sound.release()
        })
      } else {
        console.log("pause")
        setIsPlaying(false);
        sound.stop(() => {
          setIsPlaying(false);
          if (updateInterval) {
            clearInterval(updateInterval);
            setUpdateInterval(null);
          }
        })
        setIsPlaying(false)
        // setAudioPlayer(null)
        sound.release()
      }
    })
  }

  return (
    <View style={{ backgroundColor: ((changeHeader == true) && (msgId == msgItem._id)) ? (darkThemeActivator ? theme.rippleColor : rippleColor2) : 'transparent', marginBottom: hp('1') }}>
      <TouchableRipple
        rippleColor={darkThemeActivator ? theme.rippleColor : rippleColor2}
        onPress={handleOnPress}
        onLongPress={handleLongPress}
      >
        <View style={UserChatStyle.userMessageContainer(msgItem.senderId === currentUser.userId)}>
          {msgItem.content == 'text' ?
            <Text style={UserChatStyle.textStyle}>{msgItem.content}</Text>
            : [msgItem.content == 'ChatMe_Image' ?
              <Image source={{ uri: `${baseUrl}${msgItem.image}` }} resizeMode='cover' style={UserChatStyle.imageMsgStyle} />
              :
              <>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => pause_play(msgItem.audio)}>
                    <Icons.Ionicons name={isPlaying ? "pause" : "play"} size={24} color="black" />
                  </TouchableOpacity>
                  <Slider
                    style={{ width: wp('45'), maxHeight: hp('5') }}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onSlidingComplete={(value) => { audioPlayer.setCurrentTime(0); console.log(value) }}
                    maximumTrackTintColor="gray"
                    onValueChange={(value) => { setCurrentTime(value); console.log(value) }}
                    minimumTrackTintColor={AppColors.periWinkle}
                    thumbTintColor={AppColors.periWinkle}

                  />
                </View>
                <>
                  <Text style={UserChatStyle.textStyle}>{formatTime(currentTime)}</Text>
                </>
              </>
            ]
          }
          <View style={UserChatStyle.timeAndMood}>
            <Text style={UserChatStyle.msgAndMoodText(msgItem.senderId === currentUser.userId)}>
              {(!(msgItem.senderId == currentUser.userId) && !(msgItem.content == 'ChatMe_Image')) ? `mood: ${msgItem.mood}` : null}{' '}
            </Text>
            <Text style={UserChatStyle.timeStyle}>
              {moment(msgItem.createdAt).format('hh:mm a ')}
            </Text>
          </View>
        </View>
      </TouchableRipple >
      <ReactNativeModal
        isVisible={visible}
        onDismiss={hideModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        coverScreen={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onSwipeStart={hideModal}
        style={UserChatStyle.modalStyle}>
        <GestureHandlerRootView>
          <View style={UserChatStyle.modalMainView}>
            <View style={UserChatStyle.iamgeHeader}>
              <TouchableOpacity onPress={hideModal}>
                <Icons.Ionicons
                  name="arrow-back"
                  size={wp('6.5%')}
                  color={AppColors.white}
                />
              </TouchableOpacity>
              <Text style={UserChatStyle.imageSenderNameStyle}>{msgItem.senderId == currentUser.userId ? "You" : receiver.name}</Text>
            </View>
            {/* Assuming ZoomImage is a component for displaying zoomable images */}
            <ZoomImage source={{ uri: `${baseUrl}${msgItem.image}` }} />
          </View>
        </GestureHandlerRootView>
      </ReactNativeModal>
    </View >
  );
};

export default RenderChats;




// {msgItem.document && <View style={{
//   flex: 1,
//   justifyContent: 'flex-start',
//   alignItems: 'center',
//   marginTop: 25,
// }}>
//   <Pdf
//     source={{ uri: msgItem.document }}
//     onLoadComplete={(numberOfPages, filePath) => {
//       console.log(`Number of pages: ${numberOfPages}`);
//     }}
//     onPageChanged={(page, numberOfPages) => {
//       console.log(`Current page: ${page}`);
//     }}
//     onError={(error) => {
//       console.log(error);
//     }}
//     onPressLink={(uri) => {
//       console.log(`Link pressed: ${uri}`);
//     }}
//     style={{
//       flex: 1,
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height,
//     }} />
// </View>}