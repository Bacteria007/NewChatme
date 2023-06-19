import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const WelcomeScreenStyles = StyleSheet.create({
  TopView: {
    height: hp('10'),
    width: wp('100'),
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  HeadingText1: {
    fontSize: hp('4'),
    fontFamily: 'Poppins-Regular',
    color: '#BA68C8',
  },
  HeadingText2: {
    fontSize: hp('4'),
    fontFamily: 'Poppins-SemiBold',
    color: '#BA68C8',
    textAlign: 'center',
  },
  ImageStyle: {
    height: wp('60'),
    width: wp('100%'),
  },
  justifyContent: {
    justifyContent: 'center',
  },
  Text: {
    fontSize: hp('2'),
    fontFamily: 'Poppins-Light',
    color: 'black',
    textAlign: 'center',
    lineHeight: hp('2.2'),
  },
  Text2: {
    fontSize: hp('1.70'),
    fontFamily: 'Poppins-Light',
    color: 'black',
    textAlign: 'center',
  },
});
export default WelcomeScreenStyles;
