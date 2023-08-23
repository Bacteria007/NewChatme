import React from 'react';
import {StyleSheet} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../colors/Appcolors';

const Containers = StyleSheet.create({
  touchablestyle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    height: hp('9%'),
    width: wp('100%'),
    marginTop: 10,
    borderColor: 'white',
    borderBottomWidth: 1,
  },
  textstyle: {
    color: 'black',
    fontSize: wp('6%'),
  },
  textstylewhite: {
    color: AppColors.primary,
    fontSize: wp('3%'),
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCenterContainer:(bgcolor)=>({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:bgcolor
  }),
  centercontent: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Containers;
