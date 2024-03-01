import React, { useContext } from 'react'
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import GroupStyles from '../../../assets/styles/GroupScreenStyle/AllGroupsStyle';
import TranslationFile from '../../../assets/translation/TranslationFile';
import AppContext from '../../../context/AppContext';

const BotDiscussion = ({ navigation }) => {
    const { theme, darkThemeActivator } = useContext(ThemeContext)
    const {language} = useContext(AppContext)
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("InnerScreens",{screen:"ChatBot"});
            }}>
        <Neomorph
            darkShadowColor={AppColors.primary} // <- set this
            // lightShadowColor={AppColors.primary}// <- this
            swapShadows
            style={[HomeNeoCards.neomorphStyle(theme.homeCardColor), { marginTop: 10 }]}
        >
                <View style={HomeNeoCards.dpVew}>
                    <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                        <View style={AppHeaderStyle.botBgStyle}>
                            <Image source={require('../../../assets/imges/BotScreenImg/botPic.png')} style={AppHeaderStyle.botImgStyle} />
                        </View>
                    </View>
                </View>
                <Text
                    style={GroupStyles.newGroupNameStyle(darkThemeActivator)}>
                    {TranslationFile[language]?.your_virtual_friend}
                </Text>
        </Neomorph>
                        </TouchableOpacity>
    )
}

export default BotDiscussion;
