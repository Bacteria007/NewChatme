import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AppContext from '../../context/AppContext';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';
import { Image } from 'react-native';
import FontStyle from '../../assets/styles/FontStyle';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import { TouchableRipple } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import ReactNativeModal from 'react-native-modal';
import GroupChatStyle from '../../assets/styles/GroupScreenStyle/GroupChatStyle';
import { ZoomImage } from '../../helpers/UiHelpers/ZoomImage';

const GroupMsgItem = ({ msgData, msgId, setChangeHeader, changeHeader, setMsgId }) => {
  const { currentUser, baseUrl } = useContext(AppContext);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { darkThemeActivator, theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const rippleColor = 'rgba(0,0,0,0.1)'
  const rippleColor2 = AppColors.tab

  // Checking  User
  const isCurrentUserFunc = async () => {
    const senderid = await msgData.sender_id;
    return senderid === currentUser.userId;
  };
  const checkIsCurrentUser = async () => {
    const result = await isCurrentUserFunc();
    setIsCurrentUser(result);
  };

  useEffect(() => {
    checkIsCurrentUser();
  }, [checkIsCurrentUser]);
  const handleOnPress = () => {
    if (msgData.image) {
      if (visible) {
        hideModal()
      } else if (!visible && changeHeader) {
        setChangeHeader(false);
        setMsgId(null);
      } else {
        showModal()
      }
    }
    else {
      setChangeHeader(false);
      setMsgId(null);
    }

  }

  const handleLongPress = () => {
    // console.log("*******")
    // console.log(msgData)
    // console.log("*******")
    setChangeHeader(true);
    setMsgId(msgData._id);

  }
  return (
    <View style={{ width: wp('100'), backgroundColor: ((changeHeader === true) && (msgId === msgData._id)) ? (darkThemeActivator ? theme.rippleColor : rippleColor2) : 'transparent', marginBottom: hp('1') }}>
      <TouchableRipple
        rippleColor={darkThemeActivator ? theme.rippleColor : rippleColor2}
        onPress={() => { handleOnPress() }}
        onLongPress={() => { handleLongPress() }}
      >
        <View style={UserChatStyle.userMessageContainer(isCurrentUser)}>
          <Text style={{ color: AppColors.primary }}>
            {!isCurrentUser ? msgData.sender_name : 'You'}
          </Text>
          <View style={{ flexDirection: 'column' }}>
            {msgData.msg_type === "text" ? (
              <Text style={UserChatStyle.textStyle}>
                {msgData.text}
              </Text>
            ) : (
              <Image source={{ uri: `${baseUrl}${msgData.image}` }} style={{ height: hp('30'), width: wp('40') }} resizeMode='cover' />
            )}
            <View style={UserChatStyle.timeAndMood}>
              {msgData.msg_type == "text" &&
                <Text style={UserChatStyle.msgAndMoodText(msgData.sender_id === currentUser.userId)}>
                  {!(msgData.sender_id === currentUser.userId) ? "mood: " + msgData.mood : null}
                </Text>
              }
              <Text style={UserChatStyle.timeStyle}>
                {moment(msgData.createdAt).format('hh:mm a ')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>

      <ReactNativeModal
        isVisible={visible}
        onDismiss={hideModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        coverScreen={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.3}
        style={UserChatStyle.modalStyle}>
          <GestureHandlerRootView>
        <View style={UserChatStyle.modalMainView}>
          <View style={UserChatStyle.iamgeHeader}>
          <TouchableOpacity  onPress={() => { hideModal()}} >
              <Icons.Ionicons
                name="arrow-back"
                size={wp('6.5%')}
                color={AppColors.lightwhite}
              />
            </TouchableOpacity>

          </View>
          <ZoomImage source={{ uri: msgData.image ? `${baseUrl}${msgData.image}` : null }}/>
        </View>
        </GestureHandlerRootView>
      </ReactNativeModal>
    </View>

  );
};

export default GroupMsgItem;
