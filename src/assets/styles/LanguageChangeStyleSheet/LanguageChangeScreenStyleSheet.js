import {StyleSheet} from 'react-native';
import AppColors from '../../colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../FontStyle';

const LanguageChangeScreenStyleSheet = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  languageButtonView: {
    width: wp('94'),
    height: hp('8'),
    borderBottomWidth: wp('0.3'),
    borderBottomColor: AppColors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SmallView: {
    width: wp('12'),
    height: hp('6'),
    borderRadius: wp('1.5'),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LargeView: {
    width: wp('78'),
    height: hp('6'),
    justifyContent: 'center',
  },
  languageButtonLargeText: {
    fontSize: wp('5'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.black,
  },
  languageButtonSmallText: {
    fontSize: wp('5'),
    fontFamily: FontStyle.semiBoldFont,
    color: AppColors.white,
  },
});
export default LanguageChangeScreenStyleSheet;
