import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../colors/Appcolors';

const AppSubHeaderStyle = StyleSheet.create({
  searchViewStyle: {
    flexDirection: 'row',
    backgroundColor: AppColors.lightGrey,
    marginHorizontal: wp('4%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('12%'),
    height: hp('5.5%'),
    alignItems: 'center',
    borderColor: AppColors.primary,
    borderWidth: wp('0.3%'),
    // fontFamily: FontStyle.regularFont,
    // paddingTop: hp('1%'),
  },
  textInputPlaceholderStyle: {fontSize: wp('4.6%')},
  searchIconSize:{
    
  }
});

export default AppSubHeaderStyle;
