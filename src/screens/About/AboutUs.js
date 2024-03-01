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
import AppContext from '../../context/AppContext'
import TranslationFile from '../../assets/translation/TranslationFile'

const AboutUs = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const {language} = useContext(AppContext);
  const appVersion = DeviceInfo.getVersion();
  return (
    <DrawerScreenswrapper>
      <InnerScreensHeader screenName={TranslationFile[language].AboutUs} navigation={navigation} />
      <View style={styles.container(theme.backgroundColor)}>
        <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',padding:10,marginBottom:hp('4')}}>
          <Text style={styles.title(theme.profileNameColor)}>{TranslationFile[language].About_ChatMe}</Text>
          <Text style={styles.description(theme.lastMsgColor)}>
            {TranslationFile[language].Welcome_to_our_app_Here_youll_find_information_about_our_app_and_the_team_behind_it}
          </Text>
          <Text style={{fontFamily:FontStyle.regularFont}}></Text>
          <Text style={styles.version(theme.lastMsgColor)}>{TranslationFile[language].App_Version}: {appVersion}</Text>
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