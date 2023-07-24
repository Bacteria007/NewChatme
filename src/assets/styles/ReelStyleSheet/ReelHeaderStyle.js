import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';
import AppColors from '../../colors/Appcolors';

const ReelHeaderStyle = StyleSheet.create({
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingTop: hp('1%'),
  },
  screenNameStyle:{
    fontSize: wp('6.3%'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.white,
    textShadowColor: AppColors.purple,
    textShadowOffset: {width: wp('0.7%'), height: wp('0.7%')},
    textShadowRadius: wp('0.5%'),
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('21%'),
  }
});

export default ReelHeaderStyle;
