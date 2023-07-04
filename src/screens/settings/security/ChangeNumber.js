import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {TextInput} from 'react-native-gesture-handler';
import AppColors from '../../../assets/colors/Appcolors';
import DrawerScreenswrapper from '../../drawer/DrawerScreenswrapper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import Icon, {Icons} from '../../../assets/Icons';

const ChangeNumber = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('92');
  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={{paddingHorizontal: wp('6%'), marginTop: hp('3%')}}>
        <Text
          style={{
            fontSize: wp('4.7%'),
            color: AppColors.black,
            fontFamily: FontStyle.regularFont,
          }}>
          Enter your old phone number with country code:
        </Text>
        <View style={{flexDirection: 'row',width:wp('82%'),justifyContent:'space-between'}}>
          <View style={{flexDirection: 'row',borderBottomWidth: wp('0.1%'), paddingBottom: wp('-8%')}}>
          <Icons.AntDesign name="plus" color={AppColors.black} style={{alignSelf:'center'}} />
          <TextInput
            value={countryCode}
            keyboardType='numeric'
            onChangeText={text => {
              setCountryCode(text);
            }}
            maxLength={3}
            style={{fontSize: wp('4%'),alignSelf:'flex-end',paddingTop:hp('1%'),height:hp('5%')}}
          />
          </View>
          <View style={{}}>
            <TextInput
              placeholder="phone number"
              keyboardType='numeric'
              // underlineColorAndroid={AppColors.black}
              style={{borderBottomWidth: wp('0.1%'),fontSize:wp('4%'),width:wp('68%'), paddingBottom: wp('-2%')}}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: wp('4.7%'),
            color: AppColors.black,
            fontFamily: FontStyle.regularFont,
            marginTop:hp('3%')
          }}>
          Enter your new phone number with country code:
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput placeholder="+"
              keyboardType='numeric'
              />
          <TextInput placeholder="phone number" 
              keyboardType='numeric'
              />
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <View
            style={{
              height: hp('5.5%'),
              width: wp('87%'),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: wp('2%'),
              marginTop: wp('20%'),
              marginHorizontal: wp('6%'),
              backgroundColor: AppColors.primary,
            }}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: wp('6%'),
                fontFamily: FontStyle.regularFont,
              }}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeNumber;
