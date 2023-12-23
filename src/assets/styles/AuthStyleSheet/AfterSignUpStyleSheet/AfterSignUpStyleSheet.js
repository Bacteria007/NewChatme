import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';
import FontStyle from '../../FontStyle';

const AfterSignUpStyleSheet = StyleSheet.create({
  container: (bgcolor) => ({
    flex: 1,
    backgroundColor: bgcolor,
    height: hp('100'), width: wp('100')
  }),
  nextBtnConatiner:{
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('18'),
  },
  TopView: {
    height: hp('8'),
    width: wp('100'),
  },
  HeadingText1: {
    fontSize: wp('8'),
    fontFamily: 'Poppins-Medium',
    color: AppColors.primary,
    marginLeft: wp('-11.5'),
    marginTop: hp('1.5'),
  },
  LogoImageStyle: {
    height: hp('5'),
    width: wp('30'),
    marginLeft: wp('-6.5'),
  },
  TopInnerView1: {
    flexDirection: 'row',
    height: hp('8'),
    alignItems: 'flex-end',
  },
  TouchableButtonStyle: {
    width: wp('45'),
    borderRadius: wp('10'),
    height: hp('5.5'),
    // width:wp('85'),
    borderColor: AppColors.primary,
    borderWidth: wp('0.25'),
    // borderRadius:wp('1.5'),
    // height:hp('5'),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3'),
    verticalAlign: 'bottom',
  },
  TouchableTextStyle: {
    fontSize: wp('5'),
    color: AppColors.white,
    fontFamily: 'Poppins-Regular',
  },
  BelowHeadercontainer: {
    flex: 1,
    //  backgroundColor:'red',
    paddingHorizontal: wp('4'),
    height: hp('70'),
    width: wp('100%'),
    // backgroundColor:'red'
  },
  scrollContainer: {
    paddingBottom: hp('5%'), // Adjust the value based on your content's bottom padding

  },

  Text1: {
    fontSize: wp('6'),
    fontFamily: 'Poppins-Medium ',
    color: AppColors.primary,
  },
  CameraIconView:(darkThemeActivator)=>({
    height: hp('4%'),
    width: hp('4%'),
    borderRadius: 100,
    backgroundColor: darkThemeActivator ? 'white' : 'black' ,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1.3,borderColor:'white',
    }),

  ImageBackTouchable: {
    backgroundColor: 'yellow',
    height: hp('20%'),
    width: hp('20%'),
    borderRadius: hp('20%'),
  },
  ImageContainer: {
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  displyNameText: {
    color: AppColors.black,
    fontFamily:FontStyle.regularFont,
    fontSize:wp('3')
  },
  floatingInputView: { height: hp('7'), width: wp('90'), marginTop: hp('2') },
  floatingInputContainer: {
    borderWidth: hp('0.2'),
    paddingHorizontal: wp('3.75'),
    borderColor: AppColors.primary,
    borderRadius: hp('1'),
  },
  floatingCustomerLabel: {
    colorFocused: AppColors.primary,
  },
  floatingInputStyle: {
    color: AppColors.black,
  },
  floatingLabel: {
    backgroundColor: AppColors.white,
    paddingHorizontal: wp('1'),
    marginVertical: hp('-1'),
  },
  Text2: {
    fontSize: wp('3.3'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.gray,
    marginTop: hp('4'),
    marginBottom: hp('1'),
  },
  quesView: {
    height: hp('5'),
    width: wp('90'),
    justifyContent: 'center',
    paddingHorizontal: wp('3.75'),
  },
  
  TextInputContainer: {
    borderBottomWidth: hp('0.1'),
    paddingHorizontal: wp('2'),
    borderColor: AppColors.primary,
    width: wp('86'),
    alignSelf: 'center',
    height: hp('5.8'),
    fontFamily:FontStyle.regularFont,
    fontSize:wp('3')
  },
  // ////////////////// MODAL STYLE \\\\\\\\\\\\\\\\\
  modalText: {
    fontSize: hp('1.8'),
    color: AppColors.black,
    fontFamily: FontStyle.regularFont,
    textAlign: 'center',
    marginTop: 14
  },
  modalStyle: {
    // backgroundColor: "rgba(255,255,255,0.1)",
    // backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  modalMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderTopRightRadius: wp('8'),
    borderTopLeftRadius: wp('8'),
    height: hp('23'),
    width: wp('100'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal:wp('5')
    // elevation: 4,
  },
  modalIconAndTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIconContainer: {
    height: hp('7'),
    width: hp('7'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.Lilac,
    borderRadius: hp('2'),
    // elevation:2
  },
  lineStyle: {
    height: hp('12'),
    width: wp('0.1'),
    backgroundColor: AppColors.gray
  }
});

export default AfterSignUpStyleSheet;
