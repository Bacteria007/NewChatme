import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatHeaderStyle = StyleSheet.create({
  containerView: bgColor => ({
    backgroundColor: bgColor,
    height: hp('7%'),
    justifyContent: 'center',
    // width:wp('100'),
    // borderBottomWidth:1,
    // borderBottomColor:'grey'
  }),
  changedHeaderContainerView: bgColor => ({
    backgroundColor: bgColor,
    height: hp('7%'),
    width: wp('100'),
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    alignItems: 'center',
    // elevation: 4,
  }),
  callModalItem: (bgColor) => ({ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: bgColor, padding: hp('3'), borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 4 }),
  audioCallView: (bgColor) => ({ paddingHorizontal: 30, flexDirection: 'row', backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }),
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftview: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2'),
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  leftInnerView: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    paddingHorizontal: wp('1'),
    justifyContent: 'space-between',
    // backgroundColor:'green',
   
  },
  rightView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpContainerView: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: AppColors.black,
    borderRadius: 100,
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('5%'),
    
  },
  profileNameContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileNameTextStyle: clr => ({
    fontSize: wp('4%'),
    color: clr,
    textAlign: 'center',
    marginLeft: wp('3'),
    fontFamily: FontStyle.regularFont
  }),
  memberText: {
    fontSize: wp('3.5%'),
    color: AppColors.gray,
    textAlign: 'left',
    marginLeft: wp('2'),
    fontFamily: FontStyle.regularFont
  },
  profileStatusStyle: {
    color: AppColors.black,
    fontSize: wp('3'),
  },

  headerTouchableBtn: {
    borderRadius: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5'),
    width: hp('5'),
    alignSelf: 'center',
  },
  modalMainContainer: {
    height: hp('20'),
    width: wp('85'),
    backgroundColor: AppColors.white,
    borderRadius: wp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalTitleText: {
    fontSize: hp('1.7'),
    color: AppColors.black,
    fontFamily: FontStyle.lightFont,
    textAlign: 'center',
  },
  modalBtnView: {
    flexDirection: 'row',
    width: wp('50'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3'),
  },
  modalBtn: (btnClr) => ({
    borderRadius: hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('4'),
    width: hp('10'),
    alignSelf: 'center',
    backgroundColor: btnClr,
    marginHorizontal: wp('2')

  }),
  modalBtnText: {
    fontSize: hp('1.5'),
    color: AppColors.black,
    fontFamily: FontStyle.regularFont,
    textAlign: 'center',
  },
  menuStyle: { backgroundColor: AppColors.white, borderRadius: 15 },
  menuTitleStyle: { fontFamily: FontStyle.regularFont, fontSize: wp('4') },


});

export default UserChatHeaderStyle;
