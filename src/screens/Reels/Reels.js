import React from 'react'
import { View,Text } from 'react-native'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const Reels = ({navigation}) => {
 
  return (

    <View>
      <AppHeader navigation={navigation} headerTitle={"Reels"}/>
        <Text>Reels</Text>
    </View>
  )
}

export default Reels
