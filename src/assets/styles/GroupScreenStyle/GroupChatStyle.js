import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';
import FontStyle from '../FontStyle';
import { StyleSheet } from 'react-native';

const GroupChatStyle = StyleSheet.create({
  container: (bgColor)=>({ flex: 1, backgroundColor: bgColor }),
  secondContainer:(bgColor)=>({flex: 1, flexDirection: 'column',backgroundColor:bgColor}),
  modalStyle: 
    { margin: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' }
  ,
  modalMainView:{ flexDirection:'column', justifyContent:'flex-end', alignItems: 'center',backgroundColor:'white' },
  modalItem: {
    flexDirection: 'row',
    height: hp('30')
  },
  modalItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
 image:{ height: hp('90'), width: wp('100'),position:'relative' },
  startConvBtn: {flex:1,justifyContent:'center',alignItems:'center'},
  startConvText: {
    fontFamily: FontStyle.regularFont,
    fontSize: hp('2.5'),
  },
  microphoneContainerView: {
    height: hp('6%'),
    width: hp('6%'),
    backgroundColor: AppColors.Lilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iamgeHeader:{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }
});

export default GroupChatStyle;
