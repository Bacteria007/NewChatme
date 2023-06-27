import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const AppHeaderStyle = StyleSheet.create({

  mainHeader:{
    height:hp('6%'),
    justifyContent:'center'

  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    justifyContent: 'space-between',
    //  borderBottomWidth:wp('1%'),
    //  borderBottomColor:AppColors.primary
  },
  appNameStyle: {
    fontSize: wp('6%'),
    color: AppColors.primary,
    fontFamily: FontStyle.regularFont,
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('18%'),
    alignItems: 'center',
  },
});

export default AppHeaderStyle;
