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
    alignItems: 'center',
    justifyContent:'center'
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
    marginBottom: 11,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100'),
    // top: 115,
    // backgroundColor:'red'
  },
  neomorphStyle: cardColor => ({
    shadowRadius: 1.5,
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('10%'),
    width: wp('93%'),
    backgroundColor: cardColor,
    paddingHorizontal: 14,
    flex: 1,
  }),
  neomorphBlockedStyle: cardColor => ({
    shadowRadius: 1.5,
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('10%'),
    width: wp('93%'),
    backgroundColor: AppColors.Plum,
    paddingHorizontal: 14,
    flex: 1,
  }),
  addUserinGroup: bgColor => ({
    shadowRadius: 1,
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${bgColor}`,
    height: hp('4%'),
    width: wp('14s%'),
    // padding:wp('2%')
  }),
  dpImage: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('6%'),
  },
  dpIcon: {
    height: hp('5%'),
    width: hp('5%'),
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
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('2.5%'),
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
    // backgroundColor: 'red',
    
  },
 
  profileName: textColor => ({
    fontFamily: FontStyle.regularFont,
    fontSize: wp('3.8'),
    color: textColor,
    letterSpacing: 0.3,
  }),
  lastMsg: textColor => ({
    fontFamily: FontStyle.regularFont,
    fontSize: wp('2.4'),
    color: textColor,
  }),
  lastMsgTime: darkThemeActivator => ({
    fontFamily: FontStyle.regularFont,
    fontSize: wp('2.3'),
    color: darkThemeActivator ? AppColors.white:AppColors.primary,
  }),
  nameAndMsgContainer: {
    flexDirection: 'column',
    paddingHorizontal: 14,
    width: wp('78'),
    // backgroundColor: 'green',
  },
  nameAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally
    alignItems: 'center', // Center items vertically
    // marginBottom: 4, // Adjust as needed
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: 'auto',
    flex: 1,
    padding: 5,
  },
  senderName: {
    fontSize: wp('2.5'),
    color: AppColors.primary,
    fontFamily: FontStyle.mediumFont,
  },
  // RENDER COMPONENT PROFILE PIC MODAL STYLE START
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 0,
    width: wp('100'),
  },
  dpHeader: {
    height: hp('5'),
    backgroundColor:  AppColors.white,
    padding:5,
    paddingHorizontal:13,
    alignSelf:'flex-start',
    // width: hp('30%'),
    // position:'absolute'
  },
  modalView:{
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // padding:10,
    // height: hp('40'),
    // width: wp('75'),
    // position:'relative'
  },
  dpInModal: {
    height: hp('35%'),
    width: hp('35%'),
    resizeMode: 'cover',
  },
  // RENDER COMPONENT PROFILE PIC MODAL STYLE  END
  // CALLS SCREEN
  callNameAndTimeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('3.5')
  },
  name_CallIcon_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    width: wp('75%'),
  },
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
