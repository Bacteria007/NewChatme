import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';
import FontStyle from '../../FontStyle';

const ForgetScreenStyle = StyleSheet.create({
  container: (bgcolor) => ({
    flex: 1,
    backgroundColor: bgcolor,
    paddingTop: hp('1'),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  phoneNoAndCountryContainer: { flex: 1, width: wp('100'), justifyContent: 'center', alignItems: 'center' },
  securityQuestionsContainer: { flex: 1, width: wp('100'), justifyContent: 'center', alignItems: 'flex-start', paddingLeft: wp('9') },
  TouchableButtonStyle: {
    width: wp('83'),
    borderRadius: wp('1.5'),
    height: hp('5.7'),
    // width:wp('85'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    // borderRadius:wp('1.5'),
    // height:hp('5'),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5'),
  },
  TouchableTextStyle: (clr) => ({
    fontSize: wp('5'),
    color: clr,
    fontFamily: FontStyle.regularFont,
  }),

  Text1: {
    fontSize: wp('6'),
    fontFamily: FontStyle.mediumFont,
    color: AppColors.dodgerblue,
  },

  displyNameText: (clr) => ({
    color: clr,
    fontFamily: FontStyle.regularFont
  }),

  Text2: {
    fontSize: wp('6'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.primary,
    marginTop: hp('5'),
    marginBottom: hp('2'),
    // marginLeft:wp('4'),
    // textShadowColor: 'blue',
    // textShadowOffset: { width: 0.5, height: 0.5 },
    // textShadowRadius: 0.1,
  },
  image: {
    width: wp('70%'),
    height: hp('30%'),
    alignSelf: 'center',
  },
  quesView: {
    height: hp('5'),
    width: wp('90'),
    justifyContent: 'center',
  },
  TextInputContainer: (clr) => ({
    borderBottomWidth: hp('0.1'),
    borderColor: AppColors.primary,
    width: wp('75'),
    alignSelf: 'center',
    color: clr,
    fontFamily: FontStyle.regularFont
  }),
  text: {
    textAlign: 'center',
  },
  passwordIcon: {
    fontSize: wp('6'),
    height: hp('7'),
    width: wp('16'),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppColors.gray,
  },
  passwordInput: {
    height: hp('5.8'),
    width: wp('65'),
    fontSize: wp('4'),
    paddingHorizontal: wp('5'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80'),
    justifyContent: 'space-between',
    borderColor: AppColors.primary,
    borderWidth: hp('0.1'),
    height: hp('5.8'),
  },
  countryCodeView: {
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    height: hp('7'),
    width: wp('25'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp('1.5'),
  },
  countryCode: {
    fontSize: wp('5'),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppColors.black,
  },
  phoneNumberInput: {
    fontSize: wp('5'),
    height: hp('7'),
    width: wp('57'),
    borderRadius: wp('1.5'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    paddingHorizontal: wp('5'),
  },
});

export default ForgetScreenStyle;
