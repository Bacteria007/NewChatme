import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Appcolors from '../../colors/Appcolors';

const WelcomeScreenStyles = StyleSheet.create({
  TopView: {
    height: hp('8'),
    width: wp('100'),
  },
  HeadingText1: {
    fontSize: wp('6'),
    fontFamily: 'Poppins-Medium',
    color: Appcolors.primary,
    marginLeft: wp('-6.5'),
  },
  LogoImageStyle: {
    height: hp('5'),
    width: wp('20'),
  },
  HeadingText2: {
    fontSize: hp('4'),
    fontFamily: 'Poppins-SemiBold',
    color: Appcolors.primary,
    textAlign: 'center',
    marginTop: hp('2'),
  },
  ImageStyle: {
    height: wp('60'),
    width: wp('100'),
  },
  Text: {
    fontSize: hp('2'),
    fontFamily: 'Poppins-Regular',
    color: Appcolors.black,
    textAlign: 'center',
    lineHeight: hp('2.2'),
  },
  Text2: {
    fontSize: hp('1.80'),
    fontFamily: 'Poppins-Regular',
    color: Appcolors.black,
    textAlign: 'center',
  },
  TouchableButton1: {
    width: wp('80'),
    height: hp('6'),
    backgroundColor: Appcolors.primary,
    alignSelf: 'center',
    marginTop: hp('8'),
    borderRadius: hp('4'),
    paddingVertical: hp('1'),
  },
  TouchableButton2: {
    width: wp('80'),
    height: hp('6'),
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    borderRadius: hp('4'),
    marginTop: hp('1.5'),
    paddingVertical: hp('1'),
  },
  TouchableButton1Text: {
    fontSize: hp('2.5'),
    fontFamily: 'Poppins-Regular',
    color: Appcolors.white,
    textAlign: 'center',
  },
  TouchableButton2Text: {
    fontSize: hp('2.3'),
    fontFamily: 'Poppins-Regular',
    color: Appcolors.black,
    textAlign: 'center',
  },
  TopInnerView1: {
    flexDirection: 'row',
    height: hp('8'),
    alignItems: 'flex-end',
  },
  TopInnerView2: {
    justifyContent: 'flex-end',
    height: hp('7'),
  },
  TopInnerView2Touchable: {
    height: hp('4.75'),
    width: wp('20'),
    borderColor: Appcolors.black,
    borderRadius: wp('6'),
    borderWidth: wp('0.2'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: hp('3'),
  },
  TouchableText1: {
    fontSize: wp('4.5'),
    fontFamily: 'Poppins-Regular',
    color: Appcolors.black,
  },
});
export default WelcomeScreenStyles;
