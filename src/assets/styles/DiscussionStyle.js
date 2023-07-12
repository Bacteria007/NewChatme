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
    // flex:1,
    height: hp('100%'),
    // backgroundColor: AppColors.black,
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
    shadowOpacity: 0.6,
    shadowRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.homeCards,
    borderRadius: 10,
    height: hp('10%'),
    width: wp('95%'),
  },

  nameAndMsgContainer: { 
    flexDirection: 'column',
     marginLeft: 10,
     },
  dpImage: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
  },
  dpImageView: {
    marginLeft: 10,
    // backgroundColor:'orange',
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
  cardStyle: {
    height: hp('9%'),
    width: wp('95%'),
    borderRadius: 10,
    elevation: 2,
  },
  cardView: {
    flexDirection: 'row',
    height: hp('9%'),
    width: wp('95%'),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  
});

export default DiscussionStyle;
