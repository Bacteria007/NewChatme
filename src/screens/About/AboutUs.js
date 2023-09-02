import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppColors from '../../assets/colors/Appcolors'
// import { version } from '../../../package.json'; // Import version number from package.json


const AboutUs = ({navigation}) => {
  return (
   <DrawerScreenswrapper>
    <View style={styles.container}>
    <InnerScreensHeader screenName={"AboutUs"} navigation={navigation}/>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! Here, you'll find information about our app and the team behind it.
      </Text>
      {/* <Text style={styles.version}>App Version: {version}</Text> */}
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