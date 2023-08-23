import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';

const AfterSignUpStyleSheet = StyleSheet.create({
  container: (bgcolor)=>({
    flex: 1,
    backgroundColor:bgcolor,
    paddingTop: hp('1'),
    paddingHorizontal: wp('8'),
  }),
  TouchableButtonStyle: {
    width: wp('30'),
    borderRadius: wp('20'),
    height: hp('5.5'),
    // width:wp('85'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    // borderRadius:wp('1.5'),
    // height:hp('5'),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('8'),
  },
  TouchableTextStyle: {
    fontSize: wp('5'),
    color: AppColors.white,
    fontFamily: 'Poppins-Regular',
  },

  Text1: {
    fontSize: wp('6'),
    fontFamily: 'Poppins-Medium ',
    color: AppColors.dodgerblue,
  },

  displyNameText: {
    color: AppColors.black,
  },

  Text2: {
    fontSize: wp('6'),
    fontFamily: 'Poppins-Bold ',
    color: AppColors.dodgerblue,
    marginTop: hp('5'),
    marginBottom: hp('2'),
    textShadowColor: 'red',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.1,
  },
  image: {
    width: wp('70%'),
    height: hp('25%'),
    alignSelf: 'center',
  },
  quesView: {
    height: hp('5'),
    width: wp('90'),
    justifyContent: 'center',
  },
  TextInputContainer: {
    borderBottomWidth: hp('0.1'),
    borderColor: AppColors.primary,
    width: wp('70'),
    alignSelf: 'center',
    height: hp('5.8'),
  },
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
});

export default AfterSignUpStyleSheet;
