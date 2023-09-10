import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';

const ForgetScreenStyle = StyleSheet.create({
  container: (bgcolor)=>({
    flex: 1,
    backgroundColor:bgcolor,
    paddingTop: hp('1'),
    justifyContent:'center',
    alignItems:'center',
  }),
  phoneNoAndCountryContainer:{ flex: 1, width: wp('100'), justifyContent: 'center', alignItems: 'center' },
  securityQuestionsContainer:{ flex: 1, width: wp('100'), justifyContent:'center', alignItems: 'flex-start',paddingLeft:wp('9') },
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
  TextInputContainer: {
    borderBottomWidth: hp('0.1'),
    borderColor: AppColors.primary,
    width: wp('75'),
    alignSelf: 'center',
    height: hp('5'),
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

export default ForgetScreenStyle;
