import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';


const AfterSignUpStyleSheet = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: AppColors.white,
       
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
      TouchableButtonStyle:{
        width:wp('85'),
        borderColor:AppColors.primary,
        borderWidth:wp("0.25"),
        borderRadius:wp('1.5'),
        height:hp('5'),
        backgroundColor:AppColors.primary,
        justifyContent:'center',
        alignItems:'center'
      },
      TouchableTextStyle:{
        fontSize: wp('5'),
        color:AppColors.white,
        fontFamily:'Poppins-Regular',
      
      },
      BelowHeadercontainer: {
        flex: 1,
        //  backgroundColor:'red',
        paddingHorizontal:wp('4'),
        height:hp('90'),
        width:wp('100%')
       
      },
      Text1: {
        fontSize: wp('6'),
        fontFamily: 'Poppins-Medium ',
        color: AppColors.black,
    
      },
      CameraIconView:{
        height: hp('6%'),
        width: hp('6%'),
        borderRadius: 100,
        backgroundColor: AppColors.black,
        justifyContent: 'center',
        alignItems: 'center',
      },
      ImageBackTouchable:{
        backgroundColor: 'yellow',
        height: hp('20%'),
        width: hp('20%'),
        borderRadius: hp('20%'),
       
      },
      ImageContainer:{
        height: hp('25%'),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red',
        
      }
});

export default AfterSignUpStyleSheet;
