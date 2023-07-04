import {View, Text} from 'react-native';
import React from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {Icons} from '../../../assets/Icons';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';

const DeleteAccount = ({navigation}) => {
  return (
    <View style={{backgroundColor:AppColors.white,flex:1}}>
      <InnerScreensHeader navigation={navigation} screenName="Delete Account" />
      <View style={{flexDirection: 'row',borderBottomWidth:wp('0.1%'),borderBottomColor:AppColors.tab,paddingVertical:hp('3%')}}>
        <View style={[{width:wp('20%'),alignItems:'center'}]}>
          <Icons.FontAwesome
            name="exclamation-triangle"
            size={wp('6%')}
            color={AppColors.red}
          />
        </View>
        <View>
          <Text style={[{color:AppColors.red,fontSize:wp('4.8%'),fontFamily:FontStyle.mediumFont}]}>Deleting your account will:</Text>
          <View style={{flexDirection:'row'}}>
          <Text>{'\u25cf'} </Text>
          <Text style={[{fontSize:wp('3.4%'),fontFamily:FontStyle.regularFont}]}>Delete your account from ChatMe</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text>{'\u25cf'} </Text>
          <Text style={[{fontSize:wp('3.4%'),fontFamily:FontStyle.regularFont}]}>Earse your message history</Text>
</View>
          <View style={{flexDirection:'row'}}>
          <Text>{'\u25cf'} </Text>
          <Text style={[{fontSize:wp('3.4%'),fontFamily:FontStyle.regularFont}]}>Delete you from all of your ChatMe groups</Text>
</View>
        </View>
      </View>
      <View style={{paddingLeft:wp('20%'),paddingTop:hp('3%')}}>
      <Text style={[{fontSize:wp('3.5%'),color:AppColors.black,fontFamily:FontStyle.regularFont}]}>
        To delete your account,confirm your country code and enter your phone
        number.
      </Text>
      <Text style={{marginVertical:hp('3%')}}>Country</Text>
      <View style={{borderBottomWidth:wp('0.1%')}}></View>
      <Text style={{marginVertical:hp('3%')}}>Phone</Text>
      <View style={{borderBottomWidth:wp('0.1%')}}></View>
      </View>
    </View>
  );
};

export default DeleteAccount;
