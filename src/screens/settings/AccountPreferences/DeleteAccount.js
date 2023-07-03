import { View, Text } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { Icons } from '../../../assets/Icons'
import AppColors from '../../../assets/colors/Appcolors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DeleteAccount = ({navigation}) => {
  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName='Delete Account'/>
      <View style={{flexDirection:'row'}}>
      <View>
            <Icons.FontAwesome name="caution"
            size={wp('7%')}
            color={AppColors.tomato} />
        </View>
        <View>
        <Text style={[AppColors.tomato]}>Deleting your account will:</Text>
        <Text>. Delete your account from ChatMe</Text>
        <Text>. Earse your message history</Text>
        <Text>. Delete you from all of your ChatMe groups</Text>
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
        <Icons.FontAwesome 
            name="caution"
            size={wp('7%')}
            color={AppColors.tomato} 
        />
        <Text style={[AppColors.tomato]}>Deleting your account will:</Text>
      </View>
      <Text style={[AppColors.tomato]}>To delete your account,confirm your country code and enter your phone number.</Text>
      
    </View>
  )
}

export default DeleteAccount