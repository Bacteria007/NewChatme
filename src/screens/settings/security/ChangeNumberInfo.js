import {View, Text, TouchableOpacity,Image} from 'react-native';
import React from 'react';
import AppColors from '../../../assets/colors/Appcolors';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';

const ChangeNumberInfo = ({navigation}) => {
  return (
    <View >
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[{height:hp('28%'),justifyContent:'center',alignItems:'center'}]}>
      <Image  source={require('../../../assets/imges/sim-card-icon-11.jpg')}
          style={[{height:hp('17%'),width:wp('36%')}]}/>
      </View>
      <View style={{paddingHorizontal:wp('6%')}}>
      <Text style={{color: AppColors.black,fontSize:wp('4.7%'),fontFamily:FontStyle.italicFont}}>
        Changing your phone number wiil migrate your account info, groups &
        settings.
      </Text>
      <Text style={{fontSize:wp('3.7%'),fontFamily:FontStyle.italicFont}}>
        Before proceeding please confirm that you are able to recieve SMS or
        calls at your new number.
      </Text>
      <Text style={{fontSize:wp('3.7%'),fontFamily:FontStyle.italicFont}}>
        If you have both a new phone & a new number,first chnage your number on
        your old phone
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chnageNumber');
        }}>
        <View style={{height:hp('6.5%'),width:wp('87%'),alignItems:'center',justifyContent:'center',borderRadius:wp('2%'),marginTop:wp('10%'),backgroundColor:AppColors.primary}}>
          <Text style={{color:AppColors.white,fontSize:wp('7%'),fontFamily:FontStyle.regularFont}}>Next</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeNumberInfo;
