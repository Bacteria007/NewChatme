import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const NotificationStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  mainView: {
    padding: wp('4%'),
  },
  sectionHeadText: {
    fontFamily: FontStyle.regularFont,
    fontSize: wp('4.5%'),
    color: AppColors.gray,
    // paddingVertical:hp('3%')
    
  },
  touchableText: {
    fontFamily: FontStyle.regularFont,
    fontSize: wp('4.8%'),
    color: AppColors.black,
    paddingTop:hp('3%')

  },
  selectedToneText: {
    fontFamily: FontStyle.regularFont,
    fontSize: wp('3.7%'),
    color: AppColors.gray,
    paddingBottom:hp('3%')
  },
});

export default NotificationStyle;
