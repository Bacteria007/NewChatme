import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';


const LogInStyleSheet = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:hp('1'),
      },
      title: {
        fontSize: hp('3'),
        fontFamily:'Poppins-Medium',
        paddingTop:hp('3'),
        color:AppColors.primary,
        // textShadowColor: 'red',
        // textShadowOffset: { width: 0.5, height: 0.5 },
        // textShadowRadius: 0.1,
        

      },
      image: {
        width: wp("70%"),
        height: hp('25%'),
             },
      countryContainer: {
        height:hp('7'),
        alignItems: 'center',
        marginTop:hp('3'),
        marginBottom:hp('1.5'),
        borderWidth:wp('0.25'),
        borderColor:AppColors.gray,
        borderRadius:wp('1.5'),
        width:wp('85'),
        paddingVertical:hp('1'),
      },
      countryCode: {
        fontSize:wp('5'),
        borderColor:AppColors.gray,
        borderWidth:wp("0.25"),
        height:hp('7'),
        width:wp('16'),
        textAlign:'center',
        borderRadius:wp('1.5'),
       textAlignVertical:'center',
       color:AppColors.black
      },
      phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:hp('1.5'),
        width:wp('85'),
        justifyContent:'space-between'
      },
      phoneNumberInput: {
        fontSize: wp('5'),
        borderColor:AppColors.gray,
        borderWidth:wp("0.25"),
        height:hp('7'),
        width:wp('68'),
        borderRadius:wp('1.5'),
        paddingHorizontal:wp('5')
        
      },
      passwordInput: {
        height:hp('7'),
        width:wp('85'),
        fontSize: wp('5'),
        marginBottom: hp('5'),
        borderColor:AppColors.gray,
        borderWidth:wp("0.25"),
        borderRadius:wp('1.5'),
        paddingHorizontal:wp('6'),
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
      
      }
});
export default LogInStyleSheet;
