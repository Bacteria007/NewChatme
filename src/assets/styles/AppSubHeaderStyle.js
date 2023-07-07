
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
    marginHorizontal: wp('4%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('8%'),
    alignItems: 'center',
    borderWidth: hp('0.3%'),
    marginTop:hp('1%'),
    height:wp('12%')
  },
  textInputPlaceholderStyle: {fontSize: wp('4%'),marginLeft:wp('3%')},
 });

export default AppSubHeaderStyle;