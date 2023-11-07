import React from 'react'
import { View } from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'

const FooterComponent = () => {
  return <View style={{ height: hp('15'), width: wp('100') }}></View>
}

export default FooterComponent