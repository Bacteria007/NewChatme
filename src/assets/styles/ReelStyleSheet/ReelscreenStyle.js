import { Dimensions, StyleSheet, View } from 'react-native';
import {  widthPercentageToDP as wp,  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';
import FontStyle from '../FontStyle';

const { height, width } = Dimensions.get('window');
// const height=hp('50')
// const width=wp('100')
const ReelscreenStyle = StyleSheet.create({
  containerStyle: { height: height, backgroundColor: AppColors.black },
  flatlistContainerView: { flex: 1, height: height },
  TouchableOpacityStyle: { width: width, height: height, position: 'absolute' },
  backgroundVideo: {
    position: 'absolute',
    width: width,
    height: height,
    flex:1
  },
  LoaderStyle: { height: hp('4'), width: wp('10') },
  LoaderView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lottieView:{ width: wp('100'), alignSelf: 'center',justifyContent:'center',alignItems:'center' },
  lottieStyle:{
    height: hp('60'),
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieText:{
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontFamily: FontStyle.mediumFont, letterSpacing: 2
  },
});

export default ReelscreenStyle;
