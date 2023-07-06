import React from 'react'
import { View ,Text} from 'react-native'
import { s } from 'react-native-wind'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const Calls = ({navigation}) => {
  return (
    <View>
      <AppHeader navigation={navigation} headerTitle={"Calls"}/>
        <Text>Calls</Text>
        </View>
  )
}

export default Calls