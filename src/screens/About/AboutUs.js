import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppColors from '../../assets/colors/Appcolors'
import DeviceInfo from 'react-native-device-info';
import { ThemeContext } from '../../context/ThemeContext'
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar'
import FontStyle from '../../assets/styles/FontStyle'

const AboutUs = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);

  const appVersion = DeviceInfo.getVersion();
  return (
    <DrawerScreenswrapper>
      <InnerScreensHeader screenName={"AboutUs"} navigation={navigation} />
      <View style={styles.container(theme.backgroundColor)}>
        <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',padding:10,marginBottom:hp('4')}}>
          <Text style={styles.title(theme.profileNameColor)}>About ChatMe</Text>
          <Text style={styles.description(theme.lastMsgColor)}>
            Welcome to our app! Here, you'll find information about our app and the team behind it.
          </Text>
          <Text style={{fontFamily:FontStyle.regularFont}}></Text>
          <Text style={styles.version(theme.lastMsgColor)}>App Version: {appVersion}</Text>
        </View>
      </View>
    </DrawerScreenswrapper>

  )
}
const styles = StyleSheet.create({
  container: (bgColor) => ({
    flex: 1,
    padding: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    height: hp('100'),
    width: wp('100')
  }),
  title: (clr) => ({
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: clr,textAlign:'center',
    fontFamily:FontStyle.regularFont
    
  }),
  description: (clr) => ({
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: clr,textAlign:'center',
    fontFamily:FontStyle.regularFont
  }),
  version: (clr) => ({
    fontSize: 14,
    color: clr,textAlign:'center',
    fontFamily:FontStyle.regularFont
  }),
});

export default AboutUs;