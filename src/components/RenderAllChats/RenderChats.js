import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
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


const RenderChats = ({ msgItem, receiver, setChangeHeader, setMsgId, document, imagMessage, changeHeader, msgId }) => {
  const { language, baseUrl, currentUser, selectedImageUri, storeImageUri } = useContext(AppContext);
  const { darkThemeActivator, theme } = useContext(ThemeContext);
  console.log("msgItem user", msgItem)
  const rippleColor = 'rgba(0,0,0,0.1)'
  const rippleColor2 = AppColors.tab

  return (
    <View style={{ backgroundColor: ((changeHeader == true) && (msgId == msgItem._id)) ? (darkThemeActivator ? theme.rippleColor : rippleColor2) : 'transparent', marginBottom: hp('1') }}>
      <TouchableRipple
        rippleColor={darkThemeActivator ? theme.rippleColor : rippleColor2}
        onPress={() => {
          setChangeHeader(false);
          setMsgId(null);

        }}
        onLongPress={() => {
          setChangeHeader(true);
          setMsgId(msgItem._id);
        }}
      >
        <View style={UserChatStyle.userMessageContainer(msgItem.senderId === currentUser.userId)}>
          {msgItem.content != 'ChatMe_Image' ?
            <Text
              style={UserChatStyle.textStyle}>
              {msgItem.content}
            </Text> : <Image source={{ uri: `${baseUrl}${msgItem.image}` }} style={{ height: hp('30%'), width: wp('50%') }} />}

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