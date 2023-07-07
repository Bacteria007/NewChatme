import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const AppHeaderStyle = StyleSheet.create({

  mainHeader: {
    height: hp('8%'),
    justifyContent: 'center',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    justifyContent: 'space-between',
  },
  appNameStyle: {
    fontSize: wp('6%'),
    color: AppColors.primary,
    fontFamily: FontStyle.mediumFont,
    marginLeft:wp('6%'),
    alignSelf:'center'
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('20%'),
    alignItems: 'center',
    // backgroundColor:'white'
  },
});

export default AppHeaderStyle;