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
    flex:1,
    flexDirection: 'row',   
    alignItems: 'center',
    justifyContent:'flex-start',
    // backgroundColor:'red',
    paddingHorizontal:wp('1%')
    
  },
  screenNameStyle: {
    fontSize: wp('6.5%'),
    color: AppColors.white,
    fontFamily: FontStyle.regularFont,
    marginLeft:wp('0.5%')
  },

});

export default DrawerHeaderStyle;