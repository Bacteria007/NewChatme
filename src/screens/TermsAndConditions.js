import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import InnerScreensHeader from '../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from './drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AppColors from '../assets/colors/Appcolors'
import DeviceInfo from 'react-native-device-info';
import { ThemeContext } from '../context/ThemeContext'
import { Primary_StatusBar } from '../components/statusbars/Primary_StatusBar'
import FontStyle from '../assets/styles/FontStyle'

const TermsAndConditions = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);

  const appVersion = DeviceInfo.getVersion();
  return (
    <DrawerScreenswrapper>
      <InnerScreensHeader screenName={"Terms And Conditions"} navigation={navigation} />
      <View style={styles.container(theme.backgroundColor)}>
        <View style={{ justifyContent: 'center', padding: 10, marginBottom: hp('4') }}>
          <Text style={styles.title(theme.profileNameColor)}> Terms of Use</Text>
          <Text style={styles.description(theme.lastMsgColor)}>
            Welcome to the GoChat Messenger mobile application (“Application”, “GoChat Messenger”), operated by Emirates Telecommunications Group Company P.J.S.C , duly established under the laws of the United Arab Emirates by virtue of Federal Decree No. 78 of 1976 having its head office at the intersection of Sheikh Zayed 1st Street and Sheikh Rashid Bin Saeed Al Maktoum Road, P.O. Box 3838, Abu Dhabi, United Arab Emirates (“we,” “us”, “our” or “Etisalat”).
            These Terms of Use (“Terms”) govern your access and use of the GoChat Messenger and our related services, applications, products and content (collectively the “Services”). Thank you for using our services. Now, please pause, grab a cup of coffee and carefully read the following pages. It will take you approximately 20 minutes.
          </Text>
          <Text style={{ fontFamily: FontStyle.regularFont }}></Text>
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
    color: clr, textAlign: 'center',
    fontFamily: FontStyle.regularFont

  }),
  description: (clr) => ({
    fontSize: 16,
    color: clr,
    marginBottom: 20,
    fontFamily: FontStyle.regularFont
  }),
  version: (clr) => ({
    fontSize: 14,
    color: clr, textAlign: 'center',
    fontFamily: FontStyle.regularFont
  }),
});


export default TermsAndConditions;


// const scrollToTop = () => {
//   scrollViewRef.current.scrollTo({ y: 0, animated: true });
// };

// <TouchableOpacity
//           onPress={() => {
//             scrollToTop();
//           }}
//           style={TermsStyle.arrowupStyle(theme.homeCardColor)}
//           >
//             <Icons.AntDesign name="arrowup" size={20} color={theme.profileNameColor} />
//         </TouchableOpacity>