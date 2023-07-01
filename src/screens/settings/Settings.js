import { View, Text } from 'react-native'
import React from 'react'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const Settings = ({navigation}) => {
  return (
    <DrawerScreenswrapper>
    <View>
      <AppHeader navigation={navigation}/>
      <Text>Settings</Text>
    </View>
    </DrawerScreenswrapper>
  )
}

export default Settings