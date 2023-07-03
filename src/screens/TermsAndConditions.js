import { View, Text } from 'react-native'
import React from 'react'
import DrawerScreenswrapper from './drawer/DrawerScreenswrapper'
import AppHeader from '../components/Headers/AppHeaders/AppHeader'

const TermsAndConditions = ({navigation}) => {
  return (
    <DrawerScreenswrapper>
    <View>
      <AppHeader navigation={navigation}/>
      <Text>TermsAndConditions</Text>
    </View>
    </DrawerScreenswrapper>
  )
}

export default TermsAndConditions