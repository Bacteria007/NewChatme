import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const TextInputStyleForChangeNumber = StyleSheet.create({
  containerViewStyle: {
    flexDirection: 'row',
    width: wp('85%'),
    justifyContent: 'space-between',
  },
  innerView: {
    flexDirection: 'row',
    borderBottomWidth: wp('0.1%'),
  },
  plusText: {
    fontSize: wp('4%'),
    textAlignVertical:'bottom',
    fontFamily: FontStyle.lightFont,
    color: AppColors.black,
  },
  countryCodeTextInputStyle: {
    fontSize: wp('5.5%'),
    paddingBottom: hp('-2%'),
  },
  phoneNumberTextinputStyle: {
    borderBottomWidth: wp('0.1%'),
    fontSize: wp('5.5%'),
    width: wp('67%'),
    paddingBottom: wp('-2%'),
  },
});

export default TextInputStyleForChangeNumber;
