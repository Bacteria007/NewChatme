import { View, Text,TextInput } from 'react-native'
import React, { useContext } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle'
import LongButton from '../../../components/Buttons/LongButton'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ThemeContext } from '../../../context/ThemeContext'


const ChangePassword = ({navigation}) => {
  const {theme}=useContext(ThemeContext);
  return (
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <InnerScreensHeader navigation={navigation} screenName="Change password" />
      <View style={[ChangeNumberStyle.mainViewStyle]}>
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          Enter your old password to change current password:
        </Text>
        <TextInput
        placeholder="old password"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          Enter your new password to change current password:
        </Text>
        <TextInput
        placeholder="new password"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />        
      <LongButton navigation={navigation} />
      </View>

    </View>

  )
}

export default ChangePassword