import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const DeleteAccountStyle = StyleSheet.create({
  containerView: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  mainView: {
    padding: wp('5%'),
  },
  warningView: {
    flexDirection: 'row',
    // borderBottomWidth: wp('0.3%'),
    borderBottomColor: AppColors.tab,
    // backgroundColor: AppColors.tab,
    // elevation: 3,
  },
  warningLeftView: {
    width: wp('7%'),
    alignItems: 'center',
    paddingTop: hp('0.4%'),
    // backgroundColor:AppColors.primary
  },
  warningHeadText: {
    color: AppColors.red,
    fontSize: wp('5%'),
    fontFamily: FontStyle.mediumFont,
  },
  warningRightView: {
    marginLeft: wp('2%'),
  },
  buletedView: {
    flexDirection: 'row',
  },
  buletedText: {
    fontSize: wp('3.5%'),
    fontFamily: FontStyle.regularFont,
  },
  actionContainerView: {
    // paddingLeft: wp('20%'),
    paddingTop: hp('3%'),
  },
  actionConfirmText: {
    fontSize: wp('3.9%'),
    color: AppColors.black,
    fontFamily: FontStyle.mediumFont,
  },
  labelText: {
    marginTop: hp('3%'),
    marginBottom: hp('-1%'),
    color: AppColors.primary,opacity:0.8,
    fontFamily: FontStyle.mediumFont,

  },
  underlineView: {
    borderBottomWidth: wp('0.1%'),
  },
});

export default DeleteAccountStyle;
