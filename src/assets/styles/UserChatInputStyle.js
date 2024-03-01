import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatInputStyle = StyleSheet.create({
  main_input_and_mic: bgColor => ({
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'space-evenly',
    backgroundColor: bgColor,
  }),
  input_and_all_icons: {
    flexDirection: 'row',
    width: wp('83%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp('8%'),
    borderColor: AppColors.Lilac,
    borderWidth: 1,
    // backgroundColor: AppColors.white,
    marginBottom: hp('1%'),
    paddingHorizontal: hp('2%'),
    
  }, 
  input:{
    width: wp('75'),
    alignItems: 'center',
    alignSelf: 'flex-start',
    // maxHeight:hp('6%'),
  },
  scroll_inputText: { flex: 1, alignSelf: 'center',   
},
  microphoneContainerView: {
    height: hp('6.4%'),
    width: hp('6.4%'),
    backgroundColor: AppColors.Lilac,
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1'),
    alignSelf:'flex-end',
    flexDirection:'column'
  },
});

export default UserChatInputStyle;
