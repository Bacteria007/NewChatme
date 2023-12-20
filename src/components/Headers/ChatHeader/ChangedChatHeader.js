import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ThemeContext } from '../../../context/ThemeContext';
import { Checkbox, TouchableRipple } from 'react-native-paper';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import AppColors from '../../../assets/colors/Appcolors';
import FontStyle from '../../../assets/styles/FontStyle';
import ReactNativeModal from 'react-native-modal';

const ChangedChatHeader = ({ DeleteFunction, setChangeHeader }) => {
  const { theme } = useContext(ThemeContext);


  return (
    <View style={UserChatHeaderStyle.changedHeaderContainerView(theme.backgroundColor)}>
      <TouchableRipple
        borderless
        style={UserChatHeaderStyle.headerTouchableBtn}
        onPress={() => {
          setChangeHeader(false);
        }}>
        <Icons.Ionicons
          name="arrow-back"
          size={wp('6.5%')}
          color={theme.profileNameColor}
        />
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          DeleteFunction();
        }}
        borderless
        style={UserChatHeaderStyle.headerTouchableBtn}>
        <Icons.FontAwesome5
          name="trash"
          size={wp('5%')}
          color={theme.profileNameColor}
        />
      </TouchableRipple>
    </View>
  );
};

export default ChangedChatHeader;
