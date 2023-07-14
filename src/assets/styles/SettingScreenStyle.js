import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const SettingScreenStyle = StyleSheet.create({
  containerView: {
    height: hp('100'),
    // backgroundColor: '#F1F1F5',
    backgroundColor: AppColors.white,

  },
  containerView2: {
    height: hp('72%'),
    justifyContent: 'space-between',
  },
  sectionView: {
    backgroundColor: AppColors.white,
    elevation:7
  },
  sectionHeadText: {
    fontSize: wp('6%'),
    fontFamily: FontStyle.mediumFont,
    paddingHorizontal: wp('4%'),
    color: AppColors.black,
  },
  touchableView: {
    flexDirection: 'row',
    height: hp('6%'),
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    borderBottomWidth: wp('0.1%'),
  },
  iconTextContainer:{flexDirection:'row'},
  touchableText: {
    fontSize: wp('4.5%'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.black,
    marginLeft:wp('3%')
  },
  modalView:{width:wp('90%'),height:hp('30%'),backgroundColor:AppColors.white,justifyContent:'center',alignItems:'center'},
  modalHeadText:{fontSize:wp('6.5%'),fontFamily:FontStyle.mediumFont,color:AppColors.black},
  modalText:{fontSize:wp('6%'),fontFamily:FontStyle.lightFont,color:AppColors.black}
});

export default SettingScreenStyle;
