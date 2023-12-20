import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const SettingScreenStyle = StyleSheet.create({
  container: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
    height: hp('100'),
    width: wp('100'),
    // justifyContent: 'center',
    alignItems: 'center',
  }),
  sectionsStyle: bgColor => ({
    width: wp('100'),
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    // elevation: 2,
    marginTop: 13,
    shadowRadius: 1.5,
    borderRadius: wp('1.5'),
  }),
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('97'),
    // backgroundColor:"orange",
    padding: 15,
  },
  itemName: color => ({
    // fontFamily: FontStyle.regularFont,
    fontSize: 15,
    color: color,
    marginLeft: 10,
  }),

  sectionHeadText: {
    fontSize: wp('4%'),
    // fontFamily: FontStyle.regularFont,
    color: AppColors.black,
  },
  dividerContainer: {
    paddingHorizontal: 15, // Add horizontal padding here
  },
  modalView: {
    height: hp('25%'),
    width: wp('100%'),
    flexDirection: 'column',
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 20,
    elevation: 5,
  },
  radioBtnsView: {
    width: wp('100%'),
    flexDirection: 'column',
    backgroundColor: AppColors.white,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent:'space-between'

  },
  themeModal: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  themeModalText: {
    color: AppColors.black,
    fontFamily: FontStyle.regularFont,
    // fontSize: hp('3'),
    // marginTop:hp('10')
  },
  btnAndTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp('3'),
    color: AppColors.primary,
    textAlign: 'left',
  },
  modalTitleView: {
    width: wp('100'),
    // backgroundColor: 'red',
paddingHorizontal:wp('4')
  },
});

export default SettingScreenStyle;
