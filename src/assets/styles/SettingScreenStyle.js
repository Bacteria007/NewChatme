import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontStyle from './FontStyle';
import AppColors from '../colors/Appcolors';

const SettingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: hp('100'),
    width: wp('100'),
    // justifyContent: 'center', 
    alignItems: 'center'

  },
  sectionsStyle: {
    width: wp('100'),
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // elevation: 2,
    marginTop: 13
  },
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
    backgroundColor: "#fff",
    height: hp('25'),
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  themeModal: {
    backgroundColor: "rgba(0,0,0,0.4)",
    margin: 0,
    justifyContent: 'center',
    height: hp('30'), alignSelf: 'center'
  },
  themeModalText: { color: AppColors.primary, fontFamily: FontStyle.regularFont, fontSize: 17 }
});

export default SettingScreenStyle;
