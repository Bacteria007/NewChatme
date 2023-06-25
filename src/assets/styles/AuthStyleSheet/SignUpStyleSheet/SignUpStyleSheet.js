import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../colors/Appcolors';


const SignUpStyleSheet = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:hp('2')
      },
      title: {
        fontSize: hp('3'),
        fontFamily:'Poppins-Medium',
        paddingTop:hp('2.5'),
        color:AppColors.black,

      },
      image: {
        width: wp("75"),
        height: hp('25'),
             },
      countryContainer: {
        alignItems: 'center',
        marginTop:hp('3'),
        marginBottom:hp('2.5'),
        borderWidth:wp('0.25'),
        borderColor:AppColors.gray,
        borderRadius:wp('1.5'),
        width:wp('85'),
        paddingVertical:hp('1'),
      },
      countryCode: {
        fontSize:wp('6'),
        borderColor:AppColors.gray,
        borderWidth:wp("0.25"),
        height:hp('7'),
        width:wp('15'),
        textAlign:'center',
        borderRadius:wp('1.5'),
       textAlignVertical:'center',
       color:AppColors.black
      },
      phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2'),
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
        width:wp('85'),
        fontSize: wp('5'),
        marginBottom: hp('5'),
        borderColor:AppColors.gray,
        borderWidth:wp("0.25"),
        borderRadius:wp('1.5'),
        paddingHorizontal:wp('6')
      },
      TouchableButtonStyle:{
        width:wp('85'),
        borderColor:AppColors.gray,
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
        fontFamily:'Poppins-Regular'
      }
});
export default SignUpStyleSheet;
