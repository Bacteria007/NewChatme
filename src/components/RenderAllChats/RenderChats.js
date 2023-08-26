import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import moment from 'moment';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import AppContext from '../../context/AppContext';
import Pdf from 'react-native-pdf';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


const RenderChats = ({ msgItem, receiver, setChangeHeader, setMsgId, document, imagMessage }) => {
  const {
    language,
    baseUrl,
    storedUser,
    getStoredUserDetails,
    selectedImageUri,
    storeImageUri,
  } = useContext(AppContext);
  return (
    <TouchableOpacity
      onLongPress={() => {
        setChangeHeader(true);
        setMsgId(msgItem._id);
      }}>
      <View
        style={[
          msgItem.senderId === storedUser.userId
            ? UserChatStyle.userMessageContainer
            : UserChatStyle.otherMessageContainer,
        ]}>
        {msgItem.content != 'ChatMe_Image' ?
          <Text
            style={[
              msgItem.senderId === storedUser.userId
                ? UserChatStyle.userMessageText
                : UserChatStyle.otherMessageText,
            ]}>
            {msgItem.content}
          </Text> : <Text></Text>}
        {msgItem.image && <Image source={{ uri: `${baseUrl}${msgItem.image}` }} style={{ height: hp('27%'), width: wp('50%') }} />}
        {msgItem.document && <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 25,
        }}>
          <Pdf
            source={{ uri: msgItem.document }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }} />
        </View>}
        <Text
          style={[
            msgItem.senderId === storedUser.userId
              ? UserChatStyle.userTimestampText
              : UserChatStyle.otherTimestampText,
          ]}>
          {msgItem.senderId == storedUser.userId ? '' : `${msgItem.mood} mood`}{' '}
          {moment(msgItem.createdAt).format('hh:mm a ')}
        </Text>
        </View>
    </TouchableOpacity>
  );
};
export default RenderChats