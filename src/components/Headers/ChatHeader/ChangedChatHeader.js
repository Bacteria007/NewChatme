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

const ChangedChatHeader = ({ DeleteFunction,setChangeHeader, ID, navigation }) => {
 
  return (
    <View style={[UserChatHeaderStyle.changedHeaderContainerView]}>
      <View style={UserChatHeaderStyle.changedHeaderInnerView}>
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
            DeleteFunction(ID);
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
