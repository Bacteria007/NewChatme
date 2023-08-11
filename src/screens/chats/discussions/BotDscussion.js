import React, { useContext } from 'react'
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import FontStyle from '../../../assets/styles/FontStyle';

const BotDiscussion = ({ navigation }) => {
    const { theme, darkThemeActivator } = useContext(ThemeContext)
    return (
        <Neomorph
            darkShadowColor={AppColors.purple} // <- set this
            // lightShadowColor={AppColors.purple}// <- this
            swapShadows
            style={[HomeNeoCards.neomorphStyle(theme.homeCardColor), { marginTop: 10 }]}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ChatBot');
                }}>
                <View style={HomeNeoCards.dpVew}>
                    <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                        <View style={AppHeaderStyle.botBgStyle}>
                            <Image source={require('../../../assets/imges/BotScreenImg/botPic.png')} style={AppHeaderStyle.botImgStyle} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={[HomeNeoCards.nameAndMsgContainer, { paddingHorizontal: 10 }]}>
                <Text
                    style={styles.gNameStyle(darkThemeActivator)}>
                    Your Virtual Friend
                </Text>
            </View>
        </Neomorph>
    )
}

export default BotDiscussion;

const styles = StyleSheet.create({
    gNameStyle: darkThemeActivator => ({
        fontFamily: FontStyle.regularFont,
        fontSize: 17,
        color: darkThemeActivator ? "white" : "purple",
        // marginLeft: 10,
        letterSpacing: 1,
        textShadowColor: darkThemeActivator ? "white" : 'rgba(255, 0, 0, 0.2)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset
        textShadowRadius: 2, // Shadow radius

    }),
})
