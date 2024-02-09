import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const ChnageNumberInfoStyle = StyleSheet.create({
  imageContainerView: {
    height: hp('28%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: hp('17%'),
    width: wp('36%'),
  },
  textContainerView: {
    paddingHorizontal: wp('6%'),
  },
  headText: (clr)=>({
    color: clr,
    fontSize: wp('4.7%'),
    fontFamily: FontStyle.italicFont,
  }),
  plainText: (clr)=>({
    fontSize: wp('3.7%'),
    fontFamily: FontStyle.italicFont,
    color:clr,
 }),
});

export default ChnageNumberInfoStyle;
