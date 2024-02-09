import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const DeleteAccountStyle = StyleSheet.create({
  containerView: (clr) => ({
    backgroundColor: clr,
    flex: 1,
  }),
  mainView: (clr) => ({
    padding: wp('5%'),
    backgroundColor: clr,

  }),
  warningView: (clr) => ({
    flexDirection: 'row',
    // borderBottomWidth: wp('0.3%'),
    borderBottomColor: AppColors.tab,
    // backgroundColor: AppColors.tab,
    // elevation: 3,
    backgroundColor: clr,

  }),
  warningLeftView: (clr) => ({
    width: wp('7%'),
    alignItems: 'center',
    paddingTop: hp('0.4%'),
    backgroundColor: clr,
  }),
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
  buletedText: (clr) => ({
    fontSize: wp('3.5%'),
    fontFamily: FontStyle.regularFont,
    color: clr
  }),
  actionContainerView: {
    // paddingLeft: wp('20%'),
    paddingTop: hp('3%'),
  },
  actionConfirmText: (dark) => ({
    fontSize: wp('3.9%'),
    color: dark ? AppColors.lightwhite : AppColors.black,
    fontFamily: FontStyle.mediumFont,

  }),
  labelText: {
    marginTop: hp('3%'),
    marginBottom: hp('-1%'),
    color: AppColors.primary, opacity: 0.8,
    fontFamily: FontStyle.mediumFont,

  },
  underlineView: {
    borderBottomWidth: wp('0.1%'),
  },
  textinput: (darkThemeActivator, color) => ({
    borderBottomWidth: wp('0.1%'),
    fontFamily: FontStyle.regularFont,
    paddingBottom: wp('-2%'),
    color: color,
    borderBottomWidth: hp('0.15'),
    borderBottomColor: darkThemeActivator ? AppColors.gray : AppColors.black,

  })
});

export default DeleteAccountStyle;
