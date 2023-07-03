import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppColors from '../../../assets/colors/Appcolors';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';

const ChangeNumberInfo = ({navigation}) => {
  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <Text style={{color: AppColors.black}}>
        Changing your phone number wiil migrate your account info,groups &
        settings.
      </Text>
      <Text>
        Before proceeding please confirm that you are able to recieve SMS or
        calls at your new number.
      </Text>
      <Text>
        If you have both a new phone & a new number,first chnage your number on
        your old phone
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chnageNumber');
        }}>
        <View>
          <Text>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeNumberInfo;
