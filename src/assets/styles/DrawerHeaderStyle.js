import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const DrawerHeaderStyle = StyleSheet.create({
  containerView: {
    height: hp('8%'),
    width: wp('100%'),
    //  paddingTop:hp('0.5%'),
    justifyContent: 'space-between',
    // backgroundColor: AppColors.primary,
  },
  headerView: bgcolor => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor:'red',
    backgroundColor: bgcolor,
    padding: wp('3%'),
    paddingHorizontal: wp('3.5%'),
    // elevation:4
  }),
  screenNameStyle: {
    fontSize: wp('5.5%'),
    color: AppColors.white,
    fontFamily: FontStyle.regularFont,
    marginLeft: wp('3.5%'),
  },
  afterSignupScreenNameStyle: {
    fontSize: wp('5%'),
    color: AppColors.white,
    fontFamily: FontStyle.regularFont,
    // marginLeft: wp('3%'),
  },
  backBtn: {
    height: hp('5'),
    width: hp('5'),
    borderRadius: hp('5'),
    justifyContent: 'center'
  },
});

export default DrawerHeaderStyle;
