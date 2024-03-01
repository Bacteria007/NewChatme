import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';

const SignUpStyleSheet = StyleSheet.create({
  container:(bgcolor)=>({
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('1'),
    backgroundColor:bgcolor,
  }),
  scrollContainer: {
    paddingBottom: hp('5%'), // Adjust the value based on your content's bottom padding
  },
  BelowHeadercontainer: {
    flex:1,
    //  backgroundColor:'red',
    paddingHorizontal:wp('4'),
    height:hp('70'),
    width:wp('100%'),
    // backgroundColor:'red'
   
  },
  title: {
    fontSize: hp('3'),
    fontFamily: 'Poppins-Medium',
    paddingTop: hp('1'),
    color: AppColors.black,
  },
  image: {
    width: wp('75%'),
    height: hp('30%'),
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
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5'),
    width: wp('85'),
    justifyContent: 'space-between',
  },
  phoneNumberInput: {
    fontSize: wp('5'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    height: hp('7'),
    width: wp('68'),
    borderRadius: wp('1.5'),
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('5'),
    width: wp('85'),
    justifyContent: 'space-between',
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    borderRadius: wp('1.5'),
    height: hp('7'),
  },
  passwordErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('5'),
    marginTop:-hp(5),
    width: wp('85'),
    justifyContent: 'space-between',
    height: hp('7'),
  },
  passwordIcon: {
    fontSize: wp('6'),
    height: hp('7'),
    width: wp('16'),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppColors.gray,
  },
  text: {
    textAlign: 'center',
  },
});
export default SignUpStyleSheet;
