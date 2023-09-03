import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppColors from '../../assets/colors/Appcolors'
// import { version } from '../../../package.json'; // Import version number from package.json

import DeviceInfo from 'react-native-device-info';
const AboutUs = ({navigation}) => {
  const appVersion = DeviceInfo.getVersion();
  return (
   <DrawerScreenswrapper>
    <InnerScreensHeader screenName={"AboutUs"} navigation={navigation}/>
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! Here, you'll find information about our app and the team behind it.
      </Text>
      <Text style={styles.version}>App Version: {appVersion}</Text>
    </View>      
    </DrawerScreenswrapper>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    height:hp('100'),
    width:wp('100')
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    color: '#666666',
  },
});

export default AboutUs;