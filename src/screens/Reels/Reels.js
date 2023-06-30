import React from 'react'
import { View,Text } from 'react-native'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const Reels = (navigation) => {
  return (
    <DrawerScreenswrapper>

    <View>
      <AppHeader navigation={navigation}/>
        <Text>Reels</Text>
    </View>
    </DrawerScreenswrapper>
  )
}

export default Reels
