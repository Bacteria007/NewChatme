import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatInputStyle = StyleSheet.create({
  bottomActionContainerView:{flexDirection: 'row', position: 'absolute', top: hp('85.8%')},
  bottomLeftContainer:{
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderRadius: wp('5.5%'),
    height: hp('6%'),
    justifyContent: 'space-between',
    width: wp('83%'),
    marginHorizontal: wp('1.3%'),
    paddingHorizontal: wp('2.8%'),
  },
  textInputStyle:{
    // fontSize: wp('4%'),
    // backgroundColor:'lightgray',
    width: wp('45%'),
    // borderRadius:wp('4%'),
    // marginHorizontal:wp('5%'),
    // position:"absolute",top:hp('78%')
  },
  microphoneContainerView:{
    height: hp('6.5%'),
    width: hp('6.5%'),
    backgroundColor: AppColors.primary,
    borderRadius: 100,
    paddingVertical: hp('1.9%'),
    paddingHorizontal: wp('4.6%'),
  }
});

export default UserChatInputStyle;
