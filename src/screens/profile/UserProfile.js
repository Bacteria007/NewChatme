import { View, Text } from 'react-native'
import React from 'react'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const UserProfile = ({navigation}) => {
  return (
    <DrawerScreenswrapper>
  <AppHeader navigation={navigation}/>
    <View>
      <Text>UserProfile</Text>
    </View>
    </DrawerScreenswrapper>
  )
}

export default UserProfile