import {View, Text,Image} from 'react-native';
import React, { useContext } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import ChnageNumberInfoStyle from '../../../assets/styles/ChnageNumberInfoStyle';
import LongButton from '../../../components/Buttons/LongButton';
import { ThemeContext } from '../../../context/ThemeContext';
import AppColors from '../../../assets/colors/Appcolors';

const ChangeNumberInfo = ({navigation}) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const maintextColor = theme.profileNameColor
  const btnColor = AppColors.white
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black

  return (
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[ChnageNumberInfoStyle.imageContainerView]}>
      <Image  source={require('../../../assets/imges/sim-card-icon-11.jpg')}
          style={[ChnageNumberInfoStyle.imageStyle]}/>
      </View>
      <View style={[ChnageNumberInfoStyle.textContainerView]}>
      <Text style={[ChnageNumberInfoStyle.headText(maintextColor)]}>
        Changing your phone number wiil migrate your account info, groups &
        settings.
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText(secondaryTextColor)]}>
        Before proceeding please confirm that you are able to recieve SMS or
        calls at your new number.
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText(secondaryTextColor)]}>
        If you have both a new phone & a new number,first chnage your number on
        your old phone
      </Text>
      <LongButton btnTitle={"Next"} onPress={() => {navigation.replace('changeNumber')}} />
      </View>
    </View>
  );
};

export default ChangeNumberInfo;
