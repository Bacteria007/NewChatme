import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const ChangeNumberStyle = StyleSheet.create({
  mainViewStyle: bgcolor => ({
    paddingHorizontal: wp('6%'),
    backgroundColor: bgcolor,
  }),
  headTextStyle: clr => ({
    fontSize: wp('4.7%'),
    color: clr,
    fontFamily: FontStyle.regularFont,
    marginTop: hp('3%'),
  }),
});

export default ChangeNumberStyle;
