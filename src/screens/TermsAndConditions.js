import { View, Text } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../components/Headers/InnerHeaders/InnerScreensHeader'

const TermsAndConditions = ({ navigation }) => {

  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName={'Terms and conditions'} />
      <Text>TermsAndConditions</Text>
    </View>
  )
}

export default TermsAndConditions