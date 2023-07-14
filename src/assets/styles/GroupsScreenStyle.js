import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const GroupsScreenStyle = StyleSheet.create({
  wholeScreenContainer: {
    // flex:1,
    height: hp('100%'),
    backgroundColor: AppColors.bgprimary,
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
    backgroundColor: 'rgba(255, 255, 255,0.4)', //swap
    borderRadius: 10,
    height: hp('10%'),
    width: wp('95%'),
    // 
    },
  shadowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: AppColors.homeCards, //innner
    // backgroundColor: 'rgba(255, 255, 255,1)', //swap
    borderRadius: 10,
    height: hp('10%'),
    width: wp('95%'),
    shadowOpacity:0.2,
    // shadowRadius:100,
    // shadowColor:"rgba(0,0,0,0.2)",
    // shadowOffset:{height:hp('10%'),width:wp('10%')},
    // elevation:10 
    },

  nameAndMsgContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  dpImage: {
    height: hp('4%'),
    width: hp('4%'),
    borderRadius: hp('4%'),tintColor:AppColors.darkThemeColors.groupDpIcon,
    
  },
  dpImageView: {
    marginLeft: 10,
    backgroundColor:AppColors.darkThemeColors.groupDpCircle,
    borderRadius: hp('6%'),
    height: hp('6%'),
    width: hp('6%'),
    justifyContent:'center',
    alignItems:'center'
  },
  profileName: {
    fontFamily: FontStyle.regularFont,
    color: AppColors.white,
    fontSize: 17,
  },
  lastMsg: {
    fontFamily: FontStyle.regularFont,
    color: AppColors.white,
    fontSize: 11,
  },
  cardStyle: {
    height: hp('10%'),
    width: wp('95%'),
    borderRadius: 10,
    backgroundColor:'rgba(0,0,0,0.3)',
    elevation: 1,
  },
  cardView: {
    flexDirection: 'row',
    height: hp('10%'),
    width: wp('95%'),
    borderRadius: 10,
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default GroupsScreenStyle;
