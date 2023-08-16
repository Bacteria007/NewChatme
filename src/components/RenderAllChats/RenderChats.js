import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import moment from 'moment';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import AppContext from '../../context/AppContext';

const RenderChats = ({ item, itm, setChangeHeader, setMsgId, imagMessage }) => {
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
        setMsgId(item._id);
      }}>
      <View
        style={[
          item.senderId === itm.userId
            ? UserChatStyle.userMessageContainer
            : UserChatStyle.otherMessageContainer,
        ]}>
        <Text
          style={[
            item.senderId === itm.userId
              ? UserChatStyle.userMessageText
              : UserChatStyle.otherMessageText,
          ]}>
          {item.content}
        </Text>
        <Text
          style={[
            item.senderId === itm.userId
              ? UserChatStyle.userTimestampText
              : UserChatStyle.otherTimestampText,
          ]}>
          {item.senderId == itm.userId ? '' : `${item.mood} mood`}{' '}
          {moment(item.createdAt).format('hh:mm a ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderChats;
