import { View, Text } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import AppColors from '../../../assets/colors/Appcolors'
import FontStyle from '../../../assets/styles/FontStyle'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'
import NotificationStyle from '../../../assets/styles/NotificationStyle'
  

const Notification = ({navigation}) => {
  return (
    <View style={[NotificationStyle.containerView]}>
      <InnerScreensHeader navigation={navigation} screenName='Notifications' />
      <View style={[NotificationStyle.mainView]}>
        <Text style={[NotificationStyle.sectionHeadText]}>Notifications</Text>
        <Text style={[NotificationStyle.touchableText]}>Message notification</Text>
        <Text style={[NotificationStyle.selectedToneText]}>Default tone</Text>
      {/* </View>
      <View> */}
        <Text style={[NotificationStyle.touchableText]}>Group message notification</Text>
        <Text style={[NotificationStyle.selectedToneText]}>Default tone</Text>
      {/* </View>
      <View> */}
        <Text style={[NotificationStyle.sectionHeadText]}>Calls</Text>
        <Text style={[NotificationStyle.touchableText]}>Ringtone</Text>
        <Text style={[NotificationStyle.selectedToneText]}>Default tone</Text>

      </View>
    </View>
  )
}

export default Notification