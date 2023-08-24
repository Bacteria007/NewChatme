import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';

const BotScrenStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgprimary,
  },
  timestamp: {
    fontSize: hp('1.5%'),
    color: AppColors.gray,
    alignSelf: 'flex-end',
  },
  body: {
    backgroundColor: AppColors.bgprimary,
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    marginBottom: hp('1%'),
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('5'),
  },
  input: {
    backgroundColor: AppColors.bgprimary,
    width: wp('82%'),
    borderColor: AppColors.primary,
    borderRadius: wp('10%'),
    borderWidth: wp('0.25'),
    elevation: 1,
    height: hp('6.5'),
    paddingHorizontal: wp('7'),
  },
  inputContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('6.5%'),
    backgroundColor: AppColors.bgprimary,
    marginBottom: hp('0.75%'),
    paddingHorizontal: wp('2'),
  },
  sendButtonIcon: {
    marginTop: hp('-0.6'),
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: hp('2%'),
    color: AppColors.black,
  },
  botMsgContainer: {
    backgroundColor: 'rgba(196,221,254,0.6)',
    maxWidth: '80%',
    paddingHorizontal: wp('2.5'),
    paddingVertical: hp('1.25'),
    marginBottom: hp('1%'),
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'flex-start',
  },
  userMsgContainer: {
    backgroundColor: AppColors.lightBlack,
    maxWidth: '80%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: hp('1%'),
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'flex-end',
  },
  contentContainer: {
    justifyContent: 'flex-end',
  },
  botView: {
    flexDirection: 'row',
  },
  botImage: {
    marginLeft: wp('-2'),
    marginRight: wp('0.2'),
  },
});

export default BotScrenStyleSheet;
