import React from 'react'
import { View ,Text} from 'react-native'
import { s } from 'react-native-wind'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
const Calls = ({navigation}) => {
  return (
    <View>
      <AppHeader navigation={navigation}/>
        <Text>Calls</Text>
        </View>
  )
}

export default Calls