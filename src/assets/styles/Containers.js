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
    // backgroundColor: 'rgba(255,255,255,0.7)',
    // textAlign: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    height: hp('9%'),
    width: wp('100%'),
    marginTop: 10,
    // borderRadius: 10,
    borderColor: 'white',
    borderBottomWidth: 1,
  },
  textstyle: {
    color: 'black',
    fontSize: wp('6%'),
  },
  textstylewhite: {
    color: 'purple',
    fontSize: wp('3%'),
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centercontent: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Containers;
