import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const UserChatStyle = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container2: {
    flex: 1,
    padding: 3,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    marginRight:wp('1')
  },
  userMessageText: {
    color: 'black',
  },
  userTimestampText: {
    color: 'black', fontSize: 10,
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    marginLeft:wp('1')
  },
  otherMessageText: {
    color: 'black',
  },
  otherTimestampText: {
    color: 'black', fontSize: 10,
    alignSelf: 'flex-start',
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
  bottomActionContainerView: { flexDirection: 'row', position: 'absolute', top: hp('85.8%') },
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
  }
});

export default UserChatStyle;
