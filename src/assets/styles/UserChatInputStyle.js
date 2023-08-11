import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatInputStyle = StyleSheet.create({
  main_input_and_mic: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    alignSelf:'flex-end'
    // backgroundColor: AppColors.black,
  },
  input_and_all_icons: {
    flexDirection: 'row',
    width: wp('83%'),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderRadius: wp('8%'),
    borderColor: AppColors.linearGradient.blue,
    borderWidth: 1,
    backgroundColor: AppColors.white,
    marginBottom: hp('1%'),
    paddingHorizontal:hp('1%')
  },
  
  input:(height)=>({
    width: wp('58%'),
    height:height,
    alignItems: 'center',
    paddingLeft: wp('3%'),
    alignSelf:'center'
    // backgroundColor: 'red',

  }),
  scroll_inputText:{flex:1,alignSelf:'center'},
  camera_and_papercliper: (width)=>({
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),

  }),
  microphoneContainerView: {
    height: hp('6%'),
    width: hp('6%'),
    backgroundColor: AppColors.coolgray,
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1'),
  }
});

export default UserChatInputStyle;
