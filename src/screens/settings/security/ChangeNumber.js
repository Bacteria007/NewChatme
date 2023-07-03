import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { TextInput } from 'react-native-gesture-handler'
import AppColors from '../../../assets/colors/Appcolors'
import DrawerScreenswrapper from '../../drawer/DrawerScreenswrapper'

const ChangeNumber = ({navigation}) => {
  return (
    <DrawerScreenswrapper>
    <View>
      <InnerScreensHeader navigation={navigation} screenName='Change number'/>
      <Text>Enter your old phone number with country code:</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput placeholder='+'/>
        <TextInput placeholder='phone number'/>
      </View>
      <Text>Enter your new phone number with country code:</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput placeholder='+'/>
        <TextInput placeholder='phone number'/>
      </View>
      <TouchableOpacity><View style={{backgroundColor:AppColors.primary}}>
        <Text>Next</Text></View></TouchableOpacity>
    </View>
    </DrawerScreenswrapper>
  )
}

export default ChangeNumber