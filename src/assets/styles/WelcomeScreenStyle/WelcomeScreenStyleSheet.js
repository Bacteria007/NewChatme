import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Appcolors from '../../colors/Appcolors';

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
    color: Appcolors.primary,
  },
  HeadingText2: {
    fontSize: hp('4'),
    fontFamily: 'Poppins-SemiBold',
    color: Appcolors.primary,
    textAlign: 'center',
    marginTop:hp('2')
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
    color: Appcolors.black,
    textAlign: 'center',
    lineHeight: hp('2.2'),
  },
  Text2: {
    fontSize: hp('1.80'),
    fontFamily: 'Poppins-Light',
    color: Appcolors.black,
    textAlign: 'center',
  },
  TouchableButton1:{
    width:wp('80'),
    height:hp('6'),
    backgroundColor:Appcolors.primary,
    alignSelf:'center',
    marginTop:hp('8'),
    borderRadius:hp('4'),
    paddingVertical:hp('1')
  },
  TouchableButton2:{
    width:wp('80'),
    height:hp('6'),
    backgroundColor:'skyblue',
    alignSelf:'center',
    borderRadius:hp('4'),
    marginTop:hp('1.5'),
    paddingVertical:hp('1')
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
});
export default WelcomeScreenStyles;
