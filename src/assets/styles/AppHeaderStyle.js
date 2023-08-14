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
  mainHeader: {
    // flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: hp('16%'),
    // position:'absolute',

  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    // backgroundColor:'blue',

  },
  drawerAndName_Container: {
    flexDirection: 'row',
    justifyContent:'center',alignItems:'center',
    // backgroundColor:'red',
  },
  appNameStyle: {
    fontSize: wp('6%'),

    fontFamily: FontStyle.mediumFont,
    marginLeft: wp('3%'),
    letterSpacing: 1
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: wp('20%'),
    alignItems: 'center',
    // backgroundColor:'red'
    padding:6
  },
  botBgStyle:{
      height: hp('4.5%'),
      width: hp('4.5%'),
      backgroundColor: AppColors.coolgray,
      borderRadius: hp('4.5'),
      justifyContent:'center',alignItems:'center'
  },
  botImgStyle:{ height: hp('4.5%'), width: hp('4.5%') },
});

export default AppHeaderStyle;