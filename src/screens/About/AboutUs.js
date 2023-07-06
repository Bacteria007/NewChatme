import { View, Text } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'

const AboutUs = ({navigation}) => {
  return (
   <DrawerScreenswrapper>
    <InnerScreensHeader screenName={"AboutUs"} navigation={navigation}/>
      <Text>AboutUs</Text>
      </DrawerScreenswrapper>
    
  )
}

export default AboutUs