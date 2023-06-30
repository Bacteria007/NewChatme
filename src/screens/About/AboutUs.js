import { View, Text } from 'react-native'
import React from 'react'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'

const AboutUs = ({navigation}) => {
  return (
   <DrawerScreenswrapper>
    <AppHeader navigation={navigation}/>
      <Text>AboutUs</Text>
      </DrawerScreenswrapper>
    
  )
}

export default AboutUs