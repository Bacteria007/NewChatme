import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const CallStyles = StyleSheet.create({
  containerView: {
    // flex: 1,
    // padding: wp('15%'),
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: AppColors.white,
  },
  imageContainer: {
    height: hp('100%'),
    width: wp('100%'),
    padding: wp('15%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topView:{
    justifyContent:'center',alignItems:'center'},
    dpImageStyle:{ height: wp('25%'), width: wp('25%'), borderRadius: 100 },
    recieverName:{fontSize:wp('10%'),fontFamily:FontStyle.regularFont,color:AppColors.white,marginTop:hp('1%')},
    callStatus:{fontSize:wp('3.5%'),fontFamily:FontStyle.regularFont,color:AppColors.white},
    bottomContainerView:{flexDirection:'row',width:wp('80%'),justifyContent:'space-between',alignItems:'center'},
    outerView:{justifyContent:'center',alignItems:'center'},
    iconContainerView:{backgroundColor:AppColors.white,justifyContent:'center',alignItems:'center',width:wp('15%'),height:wp('15%'),borderRadius:100},
    bottomText:{fontSize:wp('3.5%'),fontFamily:FontStyle.regularFont,color:AppColors.Lilac},
});

export default CallStyles;
