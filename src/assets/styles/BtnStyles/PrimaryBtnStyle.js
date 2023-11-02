import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";
import AppColors from "../../colors/Appcolors";
import FontStyle from "../FontStyle";



const PrimaryBtnStyle = StyleSheet.create({
    BtnStyle: {
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
    BtnTitleStyle: {
        fontSize: wp('5'),
        color: AppColors.white,
        fontFamily: FontStyle.regularFont,
    },
})

export default PrimaryBtnStyle