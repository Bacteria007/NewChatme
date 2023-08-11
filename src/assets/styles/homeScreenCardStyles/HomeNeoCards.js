import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';
import AppColors from '../../colors/Appcolors';

const HomeNeoCards = StyleSheet.create({
  wholeScreenContainer: bgColor => ({
    flex: 1,
    height: hp('100%'),
    backgroundColor: bgColor,
    
  }),
  contentcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: AppColors.red,
    flex: 1,
  },
  animatedHeader: {
    elevation: 4,
    zIndex: 100,
  },
  flatlistItemContainer: {
    marginBottom: 10,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 115,
  },
  neomorphStyle: cardColor => ({
    shadowRadius: 1,
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('10%'),
    width: wp('93%'),
    backgroundColor: cardColor,
    paddingHorizontal:14
  }),
  addUserinGroup: (bgColor)=>({
    shadowRadius: 0.5,
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor,
    height: hp('4%'),
    width: wp('14s%'),
    // padding:wp('2%')
  }),
  dpImage: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
  },
  dpIcon: {
    height: hp('3.5%'),
    width: hp('3.5%'),
    borderRadius: hp('4%'),
  },
  dpVew: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    paddingBottom: 5,
  },
  iconView: bgColor => ({
    // marginLeft: 10,
    height: hp('5.5%'),
    width: hp('5.5%'),
    borderRadius: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  }),
  dpImageView: {
    // marginLeft: 10,
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  profileName: textColor => ({
    fontFamily: FontStyle.regularFont,
    fontSize: 17,
    color: textColor,
  }),
  lastMsg: textColor => ({
    fontFamily: FontStyle.regularFont,
    fontSize: 11,
    color: textColor,
  }),
  nameAndMsgContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "auto",
    // backgroundColor: 'green',
    paddingHorizontal:14
  },

  // CALLS SCREEN

  name_CallIcon_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    width: wp('75%'),
  },
  nameAndTimeContainer: { flexDirection: 'column' },

  timeAndCallType: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  callIconView: {
    height: hp('6.5%'),
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
});

export default HomeNeoCards;
