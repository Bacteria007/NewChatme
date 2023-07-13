import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatHeaderStyle = StyleSheet.create({
  containerView: {
    backgroundColor: AppColors.linearGradient.blue,
    height: hp('8%'),
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
  },
  leftview: {
    flexDirection: 'row',
    width: wp('34%'),
    height: hp('8%'),
    justifyContent: 'space-between',
  },
  rightView:{
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent: 'space-between',
  },
  leftInnerView:{
    flexDirection: 'row',
    paddingTop: hp('1%'),
    height: hp('8%'),
    width: wp('25.5%'),
  },
  dpContainerView: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: AppColors.black,
    borderRadius: 100,
    marginTop: hp('0.6%'),
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 100,
  },
  profileNameContainerStyle: {marginLeft: wp('2%')},
  profileNameTextStyle: {
    fontSize: wp('5.5%'),
    color: AppColors.black,
  },
  profileStatusStyle: {
    color: AppColors.black,
    fontSize: wp('3'),
  },

});

export default UserChatHeaderStyle;
