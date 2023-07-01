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
    height: hp('7%'),
    width:wp('100%'),
   paddingTop:hp('0.5%'),
    justifyContent: 'space-between',
    backgroundColor: AppColors.primary,

  },
  headerView: {
    flexDirection: 'row',   
    width:wp('44%'),
    flex:1,
    paddingHorizontal: wp('3.8%'),
    justifyContent: 'space-between',
    alignItems:'center',
  },
  screenNameStyle: {
    fontSize: wp('6.5%'),
    color: AppColors.black,
    fontFamily: FontStyle.mediumFont,
  },

});

export default DrawerHeaderStyle;
