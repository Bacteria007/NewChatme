import { StyleSheet } from "react-native";
import AppColors from "../../colors/Appcolors";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import FontStyle from "../FontStyle";
const GroupStyles = StyleSheet.create({
    plusButnContainer: {
        backgroundColor: AppColors.transparent
      },
      button: (color) => ({
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('7.5%'),
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }),
      plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp('4.8%'),
        height: wp('4.8%'),
        borderRadius: wp('2.4%'),
        backgroundColor: AppColors.primary, // WhatsApp green color
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      newGroupNameStyle: darkThemeActivator => ({
        fontFamily: FontStyle.regularFont,
        fontSize: 17,
        color: darkThemeActivator ? "white" : AppColors.primary,
        marginLeft: 10,
        letterSpacing: 1,
        textShadowColor: darkThemeActivator ? AppColors.primary: 'rgba(255, 0, 0, 0.2)',
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset
        textShadowRadius: 2, // Shadow radius
    
      }),
})

export default GroupStyles
