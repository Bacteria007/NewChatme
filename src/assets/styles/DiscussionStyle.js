import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const DiscussionStyle = StyleSheet.create({
  wholeScreenContainer: {
    flex:1,
    height: hp('100%'),
    backgroundColor: AppColors.bgprimary,
  },
  animatedHeader: {
    elevation: 4,
    zIndex: 100,
    top: 0,
  },
  flatlistContainer: {

    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 110,
  },
  cardStyle: {
    height: hp('11%'),
    width: wp('95%'),
    borderRadius: 10,
    elevation: 2,
  },
  cardView: {
    flexDirection: 'row',
    height: hp('11%'),
    width: wp('95%'),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  neomorphStyle: {
    shadowOpacity: 0.3,
    shadowRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    height: hp('11%'),
    width: wp('95%'),
  },

  nameAndMsgContainer: { flexDirection: 'column', marginLeft: 10 },
  dpImage: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
  },
  profileName: {
    fontFamily: FontStyle.regularFont,
    color: AppColors.black,
    fontSize: 17,
  },
  lastMsg: {
    fontFamily: FontStyle.regularFont,
    color: AppColors.gray,
    fontSize: 11,
  },
  dpImageView: { marginLeft: 10 },
});

export default DiscussionStyle;
