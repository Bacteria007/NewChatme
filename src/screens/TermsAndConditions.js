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
import TranslationFile from '../assets/translation/TranslationFile'

const TermsAndConditions = ({ navigation }) => {
  const { appName , language } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.gray 

  const terms = [
    {
      title: TranslationFile[language].Terms_of_Use,
      desc: TranslationFile[language].desc1,
    },
    {
      title: `1. ${TranslationFile[language].Acceptance_of_these_Terms} `,
      desc: TranslationFile[language].desc2,
    },
    {
      title: `2. ${TranslationFile[language].Changes_to_the_Terms}`,
      desc:TranslationFile[language].desc3,
    },
    {
      title: `3. ${TranslationFile[language].User_Account}`,
      desc: TranslationFile[language].desc4,
    },
    {
      title:`4. ${TranslationFile[language].User_Content}`,
      desc:TranslationFile[language].desc5,
    },
    {
      title: `5. ${TranslationFile[language].Data_Protection}`,
      desc: TranslationFile[language].desc6,
    },
  ];
  return (
    <DrawerScreenswrapper>
      <InnerScreensHeader
        screenName={TranslationFile[language].Terms_and_conditions}
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