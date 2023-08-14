import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

const ChangedChatHeader = ({ DeleteMessage,setChangeHeader, msgId, navigation }) => {
  // const DeleteMessage= async(msgId)=>{
  //   const formData = new FormData();
  //   formData.append("_id", msgId);

  //   try {
  //     const response = await fetch(`${baseUrl}/deleteMessage`, {
  //       method: 'POST',
  //       // headers: {
  //       //   'Content-Type': 'application/json',
  //       // },
  //       body: formData,
  //     });

  //     const data = await response.json(); // Parse the response body as JSON
  //     // setMessageList(data)
  //     setMessageList((list) => [...list, data]);
  //     console.log('After Message deleted:', data);
  //     // Reset the new contact input

  //   } catch (error) {
  //     console.error('Error deleting message:', error);
  //   }

  // }

  return (
    <View style={[UserChatHeaderStyle.containerView]}>
      <View
        style={[
          {
            flexDirection: 'row',
            paddingHorizontal: wp('5%'),
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setChangeHeader(false);
          }}>
          <Icons.FontAwesome5
            name="arrow-left"
            size={wp('5.5%')}
            color={AppColors.black}
            style={{ marginTop: hp('2.7%') }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            DeleteMessage(msgId);
          }}>
          <Icons.FontAwesome5
            name="trash"
            size={wp('5.5%')}
            color={AppColors.black}
            style={{ marginTop: hp('2.7%') }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangedChatHeader;
