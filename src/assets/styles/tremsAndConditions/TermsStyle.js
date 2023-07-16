import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';
import AppColors from '../../colors/Appcolors';

const TermsStyle = StyleSheet.create({
    container: {
        backgroundColor: AppColors.bgprimary,
      },
      content: {
        paddingHorizontal: 20,
        paddingVertical: 40,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: FontStyle.regularFont,
      },
      body: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: FontStyle.regularFont,
        lineHeight: 25,
      },
      arrowupStyle: {
        height: hp('6%'),
        width: hp('6%'),
        borderRadius: hp('6%'),
        backgroundColor: AppColors.bgprimary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        elevation:4,
        margin:hp('4%')
      },
});

export default TermsStyle;