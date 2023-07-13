import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';
import {BgTheme} from "./BgTheme";
// import AppContext from '../../context/AppContext';

// const bgTheme=()=>{
//   const {darkThemeActivator}=useContext(AppContext)
//   return darkThemeActivator
// }

const AppHeaderStyle = StyleSheet.create({
  mainHeader: {
    // flex:1,
    justifyContent: 'center',
    alignItems:'center',
    height: hp('16%'),
    // position:'absolute',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    justifyContent: 'space-between',
    alignItems:'center',
    width:wp('100%'),
    // backgroundColor:'blue',

  },
  appNameStyle: {
    fontSize: wp('6%'),
    
    fontFamily: FontStyle.mediumFont,
    marginLeft:wp('6%'),
    alignSelf:'center'
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('20%'),
    alignItems: 'center',
    // backgroundColor:'red'
  },
});

export default AppHeaderStyle;