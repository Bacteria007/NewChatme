import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';
import AppColors from '../../colors/Appcolors';

const ReelFooterStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp('3.5%'),
    paddingBottom: hp('11%'),
    flexDirection: 'row',
    // backgroundColor:AppColors.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: AppColors.white,
    width: wp('70%'),
    position: 'absolute',
    bottom: hp('0'),
  },
  imageContainer: {
    height: hp('4.5%'),
    width: hp('4.5%'),
    backgroundColor: AppColors.white,
    borderRadius: 100,
  },
  imageStyle: { height: hp('4.5%'), borderRadius: 100, width: hp('4.5%') },
  imageStyle2: {
    height: hp('7%'),
    borderRadius: 100,
    width: hp('7%'),
    // marginBottom:hp('4')
  },

  profileName: {
    fontSize: wp('4.5%'),
    marginLeft: wp('1.5%'),
    // textAlign:'center',
    marginTop: wp('1%'),
    fontFamily: FontStyle.semiBoldFont,
    color: AppColors.white,
  },
  likeShareBtns: {
    height: hp('6'),
    width: hp('6'),
    borderRadius: hp('5'),
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    fontSize: wp('3%'),
    marginLeft: wp('1.5%'),
    fontFamily: FontStyle.mediumFont,
    color: AppColors.lightwhite,
  },
  rightContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp('27'),
    // backgroundColor: 'gray',
  },
  likeCount: {
    color: AppColors.lightwhite,
    fontFamily: FontStyle.mediumFont,
    fontSize: wp('3'),
    alignSelf: 'center',
  },
});

export default ReelFooterStyle;
