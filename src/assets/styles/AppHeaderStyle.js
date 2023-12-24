import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';
import { BgTheme } from "./BgTheme";
// import AppContext from '../../context/AppContext';

// const bgTheme=()=>{
//   const {darkThemeActivator}=useContext(AppContext)
//   return darkThemeActivator
// }

const AppHeaderStyle = StyleSheet.create({
  mainHeader:(headerColor)=>({
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('15%'),
    backgroundColor:headerColor
    // position:'absolute',

  }),
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%')
  },
  drawerAndName_Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:wp('2'),
    // backgroundColor: 'red',

  },
  appNameStyle: {
    fontSize: wp('6%'),
    fontFamily: FontStyle.mediumFont,
    letterSpacing: 1
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: wp('20%'),
    alignItems: 'center',
    // backgroundColor:'red'
    padding: 6
  },
  botBgStyle: {
    height: hp('6%'),
    width: hp('6%'),
    backgroundColor: AppColors.coolgray,
    borderRadius: hp('4.5'),
    justifyContent: 'center', alignItems: 'center'
  },
  botImgStyle: { height: hp('5.5%'), width: hp('5.5%') },
  rippleBtn:{ height: hp('5'), width: hp('5'), borderRadius: hp('5'), justifyContent: 'center', alignItems: 'center' }
  
});

export default AppHeaderStyle;