import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';
import FontStyle from '../FontStyle';

const ProfileScreenStyleSheet = StyleSheet.create({
  container: bgColor => ({
    backgroundColor: bgColor,
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
  }),
  innerContainer: (bgColor) => ({
    backgroundColor: bgColor,
    height: hp('22%'),
    width: wp('100%'),
  }),
  bgImageStyle: {
    height: hp('22%'),
    width: wp('100%'),
    borderBottomLeftRadius: hp('8%'),
    borderBottomRightRadius: hp('8%'),
    opacity: 0.5,
  },
  outerNeomorph: {
    shadowRadius: 5,
    borderRadius: hp('16'),
    backgroundColor: AppColors.smokeWhite, // Change this color to match your design
    width: hp('16'),
    height: hp('16'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerNeomorph: {
    shadowRadius: 5,
    borderRadius: hp('13'),
    backgroundColor: AppColors.smokeWhite,
    // backgroundColor: "#d8dfe7",
    width: hp('13'),
    height: hp('13'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: hp('18%'),
    width: hp('18%'),
    borderRadius: wp('100'),
    backgroundColor: AppColors.periWinkle,
  },
  TextView: { flexDirection: 'row', marginTop: hp('2') },
  text: (clr) => ({ fontSize: wp('6'), fontFamily: FontStyle.regularFont, color: clr }),
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('97'),
    padding: 15,
  },
  ViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: wp('3%'),
  },
  TouchableContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  InnerView2: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: wp('40%'),
  },
  TextInputStyle: {
    borderBottomWidth: wp('0.1%'),
    borderBottomColor: AppColors.primary,
    width: wp('86%'),
  },
  innerView1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: hp('6%'),
  },
  itemName: color => ({
    fontSize: wp('3'),
    color: color,
    marginLeft: 10,
    fontFamily:FontStyle.regularFont
  }),
  ModalDesign: {
    backgroundColor: 'white',
    height: hp('25%'),
    justifyContent: 'space-around',
    borderTopRightRadius:wp('4'),
    borderTopLeftRadius:wp('4'),
  },
  dividerContainer: (darkThemeActivator) => ({
    borderBottomColor: darkThemeActivator ? AppColors.lightwhite : AppColors.lightBlack,
    borderBottomWidth: darkThemeActivator ? 0.4 : 1
  }),
  noFriendsText: (clr)=>({
    color: clr,
    fontSize: wp('3'),
    textAlign: 'center',
    fontFamily: FontStyle.regularFont
  }),
  uploadsText:(clr)=>({ textAlign: 'left', fontSize: wp('4.5'), fontFamily: FontStyle.regularFont, marginLeft: wp('1.7'),color:clr })
});

export default ProfileScreenStyleSheet;
