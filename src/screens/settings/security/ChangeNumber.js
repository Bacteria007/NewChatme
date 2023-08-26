import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import LongButton from '../../../components/Buttons/LongButton';
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle';
import TextInputForChangeNumber from '../../../components/TextInputs/TextInputForChangeNumber';
import { ThemeContext } from '../../../context/ThemeContext';

const ChangeNumber = ({ navigation }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[ChangeNumberStyle.mainViewStyle(theme.backgroundColor)]}>
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
