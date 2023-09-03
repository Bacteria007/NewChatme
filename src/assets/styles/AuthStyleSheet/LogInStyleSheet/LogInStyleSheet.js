import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';

const LogInStyleSheet = StyleSheet.create({
  container: bgcolor => ({
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('1'),
    backgroundColor: bgcolor,
  }),

  scrollContainer: {
    paddingBottom: hp('5%'), // Adjust the value based on your content's bottom padding
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    flex:1
  },
  contentContainer: {
    // height: hp('85'),
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },

  title: {
    fontSize: hp('3'),
    fontFamily: 'Poppins-Medium',
    paddingTop: hp('3'),
    color: AppColors.primary,
    textAlign: 'center',
    // textShadowColor: 'red',
    // textShadowOffset: { width: 0.5, height: 0.5 },
    // textShadowRadius: 0.1,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: wp('70%'),
    height: hp('30%'),
    alignSelf: 'center',
  },
  countryContainer: {
    height: hp('7'),
    alignItems: 'center',
    marginTop: hp('3'),
    marginBottom: hp('1.5'),
    borderWidth: wp('0.25'),
    borderColor: AppColors.primary,
    borderRadius: wp('1.5'),
    width: wp('85'),
    paddingVertical: hp('1'),
  },
  countryCode: {
    fontSize: wp('5'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    height: hp('7'),
    width: wp('16'),
    textAlign: 'center',
    borderRadius: wp('1.5'),
    textAlignVertical: 'center',
    color: AppColors.black,
  },
  passwordIcon: {
    fontSize: wp('6'),
    height: hp('7'),
    width: wp('16'),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppColors.gray,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5'),
    width: wp('85'),
    justifyContent: 'space-between',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('85'),
    justifyContent: 'space-between',
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    borderRadius: wp('1.5'),
    // backgroundColor:'red',
    height: hp('7'),
  },
  forgotpasswordText: {
    marginBottom: hp('5'),
    alignSelf: 'flex-end',
    marginTop: hp('1'),
    color: AppColors.black,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
  },
  phoneNumberInput: {
    fontSize: wp('5'),
    height: hp('7'),
    width: wp('68'),
    borderRadius: wp('1.5'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    paddingHorizontal: wp('5'),
  },

  passwordInput: {
    height: hp('7'),
    width: wp('68'),
    fontSize: wp('5'),

    paddingHorizontal: wp('6'),
  },
  TouchableButtonStyle: {
    width: wp('85'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    borderRadius: wp('1.5'),
    height: hp('6'),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchableTextStyle: {
    fontSize: wp('5'),
    color: AppColors.white,
    fontFamily: 'Poppins-Regular',
  },
  signupLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('3%'),
  },
});
export default LogInStyleSheet;
