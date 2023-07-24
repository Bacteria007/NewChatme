import { View, Text } from 'react-native'
import React from 'react'
import ReelHeaderStyle from '../../../assets/styles/ReelStyleSheet/ReelHeaderStyle'
import AppColors from '../../../assets/colors/Appcolors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../../../assets/Icons'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const ReelHeader = () => {
    const iconcolor=AppColors.white
  return (
    <View
    style={[ReelHeaderStyle.headerView]}>
    <Text
      style={[ReelHeaderStyle.screenNameStyle]}>
      Reels
    </Text>
    <View
      style={[ReelHeaderStyle.iconContainer]}>
      <TouchableOpacity>
        <Icons.AntDesign
          name="pluscircleo"
          size={wp('7.5%')}
          color={iconcolor}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icons.Feather
          name="activity"
          size={wp('8.2%')}
          color={iconcolor}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default ReelHeader