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
  },
  plusText: (clr)=>({
    fontSize: wp('4%'),
    textAlignVertical:'center',
    fontFamily: FontStyle.lightFont,
    color: clr,
    // backgroundColor:'red'

  }),
  countryCodeTextInputStyle: (darkThemeActivator,clr)=>({
    fontSize: wp('3.5%'),
    // paddingBottom: hp('-2%'),
    color:clr,
    fontFamily:FontStyle.regularFont,
    borderBottomWidth:hp('0.15'),
    borderBottomColor: darkThemeActivator ? AppColors.gray : AppColors.black,

  }),
  phoneNumberTextinputStyle: (darkThemeActivator,clr)=>({
    fontSize: wp('3.5%'),
    width: wp('67%'),
    // paddingBottom: wp('-2%'),
    color:clr,
    fontFamily:FontStyle.regularFont,
    borderBottomWidth:hp('0.15'),
    borderBottomColor: darkThemeActivator ? AppColors.gray : AppColors.black,

  }),
});

export default TextInputStyleForChangeNumber;
