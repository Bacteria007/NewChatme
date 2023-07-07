import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const ButtonStyle = StyleSheet.create({
  longButtonViewStyle: {
    height: hp('5.5%'),
    width: wp('87%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('2%'),
    marginTop: wp('20%'),
    backgroundColor: AppColors.primary,
  },
  longButtonTextStyle:{
    color: AppColors.white,
    fontSize: wp('6%'),
    fontFamily: FontStyle.regularFont,
  },
});

export default ButtonStyle;
