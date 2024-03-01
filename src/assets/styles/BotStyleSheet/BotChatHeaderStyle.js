import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';

const BotChatHeaderStyle = StyleSheet.create({
 
  headerView:bgColor=>( {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    // justifyContent:'center',
    backgroundColor:bgColor
  }),
  leftview: {
    flexDirection: 'row',
    width: wp('34%'),
    height: hp('8%'),
    marginLeft:wp("5"),
    justifyContent: 'center',
    alignItems:'center',
    // backgroundColor:'red'
  },
 
 
  dpContainerView: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: AppColors.dodgerblue,
    borderRadius: 100,
    marginTop: hp('0.6%'),
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 100,
  },
  profileNameContainerStyle: {marginLeft: wp('2%')},
BotNameTextStyle:bgColor=>( {
    fontSize: wp('5.5%'),
    color: bgColor,
    width:wp('30'),
  }),
  profileStatusStyle: {
    color: AppColors.white,
    fontSize: wp('3'),
  },

});

export default BotChatHeaderStyle;
