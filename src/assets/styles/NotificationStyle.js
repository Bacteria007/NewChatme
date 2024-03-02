import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const NotificationStyle = StyleSheet.create({
  containerView: bgColor=>({
    flex: 1,
    backgroundColor: bgColor,
  }),
  mainView: {
    padding: wp('6%'),
    // justifyContent:'center',alignItems:'center'
  },
  text:bgColor=>( {
    fontFamily: FontStyle.mediumFont,
    fontSize: wp('5%'),
    paddingBottom: hp('4'),
    color: bgColor,

  }),
  textInput:bgColor=>( {
    fontFamily: FontStyle.regularFont,
    fontSize: wp('4.5%'),
    width: wp('87%'),
    borderBottomColor: bgColor,
    elevation: 1,
    color: bgColor,
    maxHeight: hp('40'),
    paddingHorizontal: wp('4'),
    // borderRadius: wp('10%'),
    borderWidth: wp('0.25'),
    // backgroundColor: AppColors.gray,
    // height: hp('8'),
    // marginRight: wp('6'),
  }),
  touchableText: {
    color: AppColors.white,
    fontSize: wp('4.5%'),
    fontFamily: FontStyle.regularFont,
  },
  touchableView: {
    height: hp('5.5'),
    width: hp('16'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('8%'),
    marginTop: wp('20%'),
    alignSelf: 'center',
    backgroundColor: AppColors.primary,
  },
});

export default NotificationStyle;
