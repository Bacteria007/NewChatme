import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';
import FontStyle from '../FontStyle';
import { StyleSheet } from 'react-native';

const GroupHeaderStyle = StyleSheet.create({
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalMainView: bgColor => ({
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: bgColor,
    padding: hp('3'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 4,
    maxHeight: hp('33')

  }),
  modalItem: {
    flexDirection: 'column',
  },
  modalItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameAndPhone: {
    flexDirection: 'column',
    marginLeft: wp('4')
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('70'),
  },
  nameStyle:{
    color:  'black',
    fontFamily: FontStyle.regularFont,
    marginHorizontal: wp('1'),
  },
  adminBtn: {
    backgroundColor: AppColors.tab,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('2'),
    paddingVertical: wp('0.5'),
    borderRadius: 3,
  },
  adminText: {
    fontFamily: FontStyle.mediumFont,
    color: AppColors.primary,
    fontSize: wp('3'),
  },
  phoneText: {
    color: 'gray',
    fontSize: 18
  },
  dpView:{
    
      height: hp('5%'),
      width: hp('5%'),
      borderRadius: hp('5%'),

  },
  dpCircle: bgColor => ({
    // marginLeft: 10,
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,

  }),
});

export default GroupHeaderStyle;
