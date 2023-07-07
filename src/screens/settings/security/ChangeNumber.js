import {View, Text} from 'react-native';
import React, {useState} from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {TextInput} from 'react-native-gesture-handler';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import Icon, {Icons} from '../../../assets/Icons';
import LongButton from '../../../components/Buttons/LongButton';
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle';
import TextInputForChangeNumber from '../../../components/TextInputs/TextInputForChangeNumber';

const ChangeNumber = ({navigation}) => {

  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[ChangeNumberStyle.mainViewStyle]}>
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          Enter your old phone number with country code:
        </Text>
        <TextInputForChangeNumber />
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          Enter your new phone number with country code:
        </Text>
        <TextInputForChangeNumber />
        <LongButton navigation={navigation} />
      </View>

    </View>
  );
};

export default ChangeNumber;
