import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useContext } from 'react'
import InnerScreensHeader from '../components/Headers/InnerHeaders/InnerScreensHeader'
import DrawerScreenswrapper from './drawer/DrawerScreenswrapper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ThemeContext } from '../context/ThemeContext'
import FontStyle from '../assets/styles/FontStyle'
import AppContext from '../context/AppContext'
import AppColors from '../assets/colors/Appcolors'
import FooterComponent from '../components/FlatlistComponents/FooterComponent'

const TermsAndConditions = ({ navigation }) => {
  const { appName } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.gray 

  const terms = [
    {
      title: 'Terms of Use',
      desc: `Welcome to the ${appName} Messenger mobile application.These Terms of Use (“Terms”) govern your access and use of the ${appName} Messenger and our related services, applications, products and content (collectively the “Services”). Thank you for using our services.Now, please pause, grab a cup of coffee and carefully read the following pages. It will take you a few minutes.`,
    },
    {
      title: '1. Acceptance of these Terms',
      desc: `By accessing the ${appName} Messenger and using the Services, you signify your agreement to these Terms and conditions. If you do not agree with any of the terms and conditions below, do not access or use the ${appName} Messenger or the Services. By using the Services, you also consent to the terms of the Privacy Policy, which, together with the Terms, form your agreement in relation to the use of the ${appName} Messenger and/or the Services.`,
    },
    {
      title: '2. Changes to the Terms',
      desc: `Team may modify and/or make changes to these Terms at any time by posting the updated version to the ${appName} Messenger or, in the case of any material change, by notification to you or by posting a notice through the Services. Modifications will become effective on the day they are posted unless stated otherwise. Your continued use of the Services after changes become effective shall mean that you accept those changes. Any revised Terms shall supersede all previous Terms.`,
    },
    {
      title: '3. User Account',
      desc: `In order to access the Services, you must register for an account (“Account”). You agree that the information provided by you for the purposes of account registration is accurate and will be kept accurate, complete, and up to date, at all time. You are solely responsible for maintaining the confidentiality of your Account, password and login details. You agree that you are solely responsible for all activities that occur under your account.`
    },
    {
      title: '4. User Content',
      desc: `Certain features of the Services may permit you to upload content to the Services, including messages, likes, data, text, photos, images and other types of material (“User Content”).`,
    },
    {
      title: '5. Data Protection',
      desc: `We prioritize the protection of your data. ${appName} Messenger, built on React Native, employs robust security measures to safeguard your information. Our use of MongoDB for data storage adheres to industry best practices, ensuring the confidentiality and integrity of your data. For detailed information on how we handle and protect your data, please refer to our Privacy Policy.`,
    },
  ];
  return (
    <DrawerScreenswrapper>
      <InnerScreensHeader
        screenName={'Terms And Conditions'}
        navigation={navigation}
      />
      <View style={styles.container(theme.backgroundColor)}>
        <View
          style={{
            justifyContent: 'center',
            padding: 10,
            marginBottom: hp('4'),
          }}>

          <FlatList
            data={terms}
            renderItem={({ item }) => (
              <>
                <Text style={styles.title(maintextColor)}>{item.title}</Text>
                <Text style={styles.description(secondaryTextColor)}>{item.desc}</Text>
              </>
            )}
            ListFooterComponent={FooterComponent}
            showsVerticalScrollIndicator={false}
/>
        </View>
      </View>
    </DrawerScreenswrapper>
  );
}
const styles = StyleSheet.create({
  container: (bgColor) => ({
    flex: 1,
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    height: hp('100'),
    width: wp('100')
  }),
  title: (clr) => ({
    fontSize: wp('5'),
    marginBottom: 10,
    color: clr,
    textAlign: 'left',
    fontFamily: FontStyle.regularFont

  }),
  description: (clr) => ({
    fontSize: wp('3.5'),
    color: clr,
    marginBottom: 20,
    fontFamily: FontStyle.regularFont
  }),
  version: (clr) => ({
    fontSize: 14,
    color: clr,
    textAlign: 'center',
    fontFamily: FontStyle.regularFont,

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