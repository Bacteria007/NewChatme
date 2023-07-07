import {View, Text,Image} from 'react-native';
import React from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import ChnageNumberInfoStyle from '../../../assets/styles/ChnageNumberInfoStyle';
import LongButton from '../../../components/Buttons/LongButton';

const ChangeNumberInfo = ({navigation}) => {
  return (
    <View >
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[ChnageNumberInfoStyle.imageContainerView]}>
      <Image  source={require('../../../assets/imges/sim-card-icon-11.jpg')}
          style={[ChnageNumberInfoStyle.imageStyle]}/>
      </View>
      <View style={[ChnageNumberInfoStyle.textContainerView]}>
      <Text style={[ChnageNumberInfoStyle.headText]}>
        Changing your phone number wiil migrate your account info, groups &
        settings.
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText]}>
        Before proceeding please confirm that you are able to recieve SMS or
        calls at your new number.
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText]}>
        If you have both a new phone & a new number,first chnage your number on
        your old phone
      </Text>
      <LongButton navigation={navigation} />
      </View>
    </View>
  );
};

export default ChangeNumberInfo;
