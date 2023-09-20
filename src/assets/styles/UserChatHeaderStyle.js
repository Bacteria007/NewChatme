import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatHeaderStyle = StyleSheet.create({
  containerView: {
    backgroundColor: AppColors.white,
    height: hp('8%'),
    // width:wp('100'),
    // borderBottomWidth:1,
    // borderBottomColor:'grey'
  },
  changedHeaderContainerView: {
    backgroundColor: AppColors.white,
    height: hp('8%'),
    width:wp('100'),
    // borderBottomWidth:1,
    // borderBottomColor:'grey'
    elevation: 4,
  },
  changedHeaderInnerView:{
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
  },
  leftview: {
    flexDirection: 'row',
    width: wp('42%'),
    height: hp('8%'),
    justifyContent: 'space-between',
  },
  rightView: {
    flexDirection: 'row',
    // width:"auto",
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  leftInnerView: {
    flexDirection: 'row',
    paddingTop: hp('1%'),
    height: hp('8%'),
    width: wp('60%'),
  },
  dpContainerView: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: AppColors.black,
    borderRadius: 100,
    marginTop: hp('0.6%'),
    marginLeft: 10,
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 100,
  },
  profileNameContainerStyle: {
    marginLeft: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileNameTextStyle: {
    fontSize: wp('6%'),
    color: AppColors.black,
    marginBottom: 9,
  },
  profileStatusStyle: {
    color: AppColors.black,
    fontSize: wp('3'),
    //  backgroundColor:'red'
  },
});

export default UserChatHeaderStyle;
