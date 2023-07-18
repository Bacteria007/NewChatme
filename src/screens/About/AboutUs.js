import { View, Text } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const AboutUs = ({navigation}) => {
  return (
   <DrawerScreenswrapper>
    <InnerScreensHeader screenName={"AboutUs"} navigation={navigation}/>
    <View style={{height: hp('100%'), backgroundColor: '#F1F1F5'}}>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>
      <Text>AboutUs</Text>

      </View>
      </DrawerScreenswrapper>
    
  )
}

export default AboutUs;