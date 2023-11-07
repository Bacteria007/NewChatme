import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
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
import GroupChatStyle from '../../assets/styles/GroupScreenStyle/GroupChatStyle';
import { Icons } from '../../assets/Icons';
import { ZoomImage } from '../../helpers/UiHelpers/ZoomImage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const RenderChats = ({ msgItem, setChangeHeader, setMsgId, changeHeader, msgId, navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const { darkThemeActivator, theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const rippleColor = 'rgba(0,0,0,0.1)'
  const rippleColor2 = AppColors.tab


 
  const handleOnPress = () => {

    if (msgItem.image) {
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

    setChangeHeader(true);
    setMsgId(msgItem._id);

  }
  return (
    <View style={{ backgroundColor: ((changeHeader == true) && (msgId == msgItem._id)) ? (darkThemeActivator ? theme.rippleColor : rippleColor2) : 'transparent', marginBottom: hp('1') }}>
      <TouchableRipple
        rippleColor={darkThemeActivator ? theme.rippleColor : rippleColor2}
        onPress={() => { handleOnPress() }}
        onLongPress={() => { handleLongPress() }}
      >
        <View style={UserChatStyle.userMessageContainer(msgItem.senderId === currentUser.userId)}>
          {msgItem.content != 'ChatMe_Image' ?
            <Text
              style={UserChatStyle.textStyle}>
              {msgItem.content}
            </Text> : <Image source={{ uri: `${baseUrl}${msgItem.image}` }} resizeMode='cover' style={{ height: hp('30%'), width: wp('50%') }} />}

          <View style={UserChatStyle.timeAndMood}>
            <Text
              style={UserChatStyle.msgAndMoodText(msgItem.senderId === currentUser.userId)}>
              {(!msgItem.senderId == currentUser.userId || !msgItem.content == 'ChatMe_Image') ? `mood: ${msgItem.mood}` : null}{' '}
            </Text>
            <Text style={UserChatStyle.timeStyle}>
              {moment(msgItem.createdAt).format('hh:mm a ')}
            </Text>
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
        onSwipeStart={hideModal}
        style={UserChatStyle.modalStyle}>
        <GestureHandlerRootView>
          <View style={UserChatStyle.modalMainView}>
            <View style={UserChatStyle.iamgeHeader}>
              <TouchableOpacity onPress={hideModal}>
                <Icons.Ionicons
                  name="arrow-back"
                  size={wp('6.5%')}
                  color={AppColors.lightwhite}
                />
              </TouchableOpacity>
            </View>
            <ZoomImage source={{ uri: msgItem.image ? `${baseUrl}${msgItem.image}` : null }}/>
          </View>
        </GestureHandlerRootView>
      </ReactNativeModal>
    </View>
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