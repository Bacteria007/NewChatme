import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';
import AppColors from '../../colors/Appcolors';

const HomeNeoCards = StyleSheet.create({
  wholeScreenContainer: {
    flex: 1,
    height: hp('100%'),
    // backgroundColor: AppColors.transparent,
  },
  contentcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.red,
    flex: 1,
  },
  animatedHeader: {
    elevation: 4,
    zIndex: 100,
    // top: 0,
  },
  flatlistItemContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 115,
    // backgroundColor:'red',
  },
  neomorphStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: AppColors.homeCards, //innner
    // backgroundColor: 'rgba(255, 255, 255,0.4)', //swap
    borderRadius: 10,
    height: hp('10%'),
    width: wp('95%'),
    justifyContent: 'space-around',

  },
  shadowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: AppColors.homeCards, //innner
    // backgroundColor: 'rgba(255, 255, 255,1)', //swap
    borderRadius: 10,
    height: hp('10%'),
    width: wp('94%'),
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { height: hp('10%'), width: wp('0%') },
  },

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
  iconView: {
    marginLeft: 10,
    height: hp('5.5%'),
    width: hp('5.5%'),
    borderRadius: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'orange',
  },
  dpImageView: {
    marginLeft: 10,
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontFamily: FontStyle.regularFont,
    fontSize: 17,
  },
  lastMsg: {
    fontFamily: FontStyle.regularFont,
    fontSize: 11,
  },
  nameAndMsgContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: wp('75%'),
  },
  cardStyle: {
    height: hp('10%'),
    width: wp('93%'),
    borderRadius: 10,
    backgroundColor:AppColors.darkThemeColors.bgColor,
    justifyContent:'center',alignItems:'center',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: '#fff',
    shadowOffset: { height: hp('10%'), width: wp('0%') },
    marginBottom:10
  },
  cardView: {
    flexDirection: 'row',
    height: hp('10%'),
    width: wp('95%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'space-around',
    // backgroundColor: 'rgba(255,255,255,0.1)',
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
    // width: hp('5%'),
    // backgroundColor: AppColors.Plum,
    justifyContent: 'space-evenly',
    alignItems:'flex-end',
    // borderRadius: hp('5%'),
  },
});

export default HomeNeoCards;
