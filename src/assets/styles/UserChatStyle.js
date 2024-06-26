import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatStyle = StyleSheet.create({
  contianer: bgColor => ({
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: bgColor,
  }),
  container2: bgColor => ({
    flex: 1,
    padding: wp('2'),
    backgroundColor: bgColor,
  }),
  messagesContainer: {
    flexGrow: 1,
    // justifyContent: 'flex-start',
  },
  userMessageContainer: user => ({
    flexDirection: 'column',
    backgroundColor: user ? AppColors.tab : AppColors.Lilac,
    marginHorizontal: wp('3'),
    alignSelf: user ? 'flex-end' : 'flex-start',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.7'),
    borderRadius: wp('2'),
    maxWidth: wp('80'),
    elevation: 4,
  }),
  imageMsgStyle:{ height: hp('30'), width: wp('50'),borderRadius:wp('1') },
  timeAndMood: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    maxWidth: wp('70%'),
  },imageSenderNameStyle:{ fontSize: wp('5.5'), color: AppColors.white, textAlign: 'center',fontFamily:FontStyle.regularFont,marginLeft:wp('3') },
  timeStyle: {
    fontSize: hp('1.1'),
    marginLeft: 10,
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: FontStyle.regularFont,
  },
  msgAndMoodText: user => ({
    color: 'black',
    fontSize: hp('1.1'),
    alignSelf: user ? 'flex-end' : 'flex-end',
    textAlign: 'left',
    fontFamily: FontStyle.regularFont,
  }),
  textStyle: {
    color: 'black',
    fontSize: hp('1.7'),
    textAlign: 'left',
    fontFamily: FontStyle.regularFont,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    fontFamily: FontStyle.regularFont,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ////////////////
  containerView: {
    backgroundColor: AppColors.primary,
    height: hp('8%'),
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
  },
  leftview: {
    flexDirection: 'row',
    width: wp('34%'),
    height: hp('8%'),
    justifyContent: 'space-between',
  },
  rightView: {
    flexDirection: 'row',
    width: wp('33%'),
    justifyContent: 'space-between',
  },
  leftInnerView: {
    flexDirection: 'row',
    paddingTop: hp('1%'),
    height: hp('8%'),
    width: wp('25.5%'),
  },
  dpContainerView: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: AppColors.white,
    borderRadius: 100,
    marginTop: hp('0.6%'),
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 100,
  },
  profileNameContainerStyle: { marginLeft: wp('2%') },
  profileNameTextStyle: {
    fontSize: wp('5.5%'),
    color: AppColors.white,
  },
  profileStatusStyle: {
    color: AppColors.white,
    fontSize: wp('3'),
  },
  bottomActionContainerView: {
    flexDirection: 'row',
    position: 'absolute',
    top: hp('85.8%'),
  },
  bottomLeftContainer: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderRadius: wp('5.5%'),
    height: hp('6%'),
    justifyContent: 'space-between',
    width: wp('83%'),
    marginHorizontal: wp('1.3%'),
    paddingHorizontal: wp('2.8%'),
  },
  textInputStyle: {
    // fontSize: wp('4%'),
    // backgroundColor:'lightgray',
    width: wp('45%'),
    // borderRadius:wp('4%'),
    // marginHorizontal:wp('5%'),
    // position:"absolute",top:hp('78%')
  },
  microphoneContainerView: {
    height: hp('6.5%'),
    width: hp('6.5%'),
    backgroundColor: AppColors.primary,
    borderRadius: 100,
    paddingVertical: hp('1.9%'),
    paddingHorizontal: wp('4.6%'),
  },
  modalStyle: { margin: 0, justifyContent: 'center' },
  modalMainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  iamgeHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: hp('7'),
    backgroundColor: AppColors.lightBlack,
    paddingHorizontal:wp('6'),
    zIndex:1
  },
  backBtn: {
    height: hp('6%'),
    width: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
});

export default UserChatStyle;
