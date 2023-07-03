import React from 'react'
import { View,Text } from 'react-native'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const Reels = ({navigation}) => {
  return (

    <View>
      <AppHeader navigation={navigation}/>
        <Text>Reels</Text>
    </View>
  )
}

export default Reels
