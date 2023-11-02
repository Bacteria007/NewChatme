import React, { useContext } from 'react'
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../../assets/colors/Appcolors';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import GroupStyles from '../../../assets/styles/GroupScreenStyle/AllGroups';

const BotDiscussion = ({ navigation }) => {
    const { theme, darkThemeActivator } = useContext(ThemeContext)
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
            <View style={[HomeNeoCards.nameAndMsgContainer, { paddingHorizontal: 10 }]}>
                <Text
                    style={GroupStyles.newGroupNameStyle(darkThemeActivator)}>
                    Your Virtual Friend
                </Text>
            </View>
        </Neomorph>
                        </TouchableOpacity>
    )
}

export default BotDiscussion;
