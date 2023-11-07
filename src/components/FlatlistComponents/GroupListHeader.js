import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Neomorph } from 'react-native-neomorph-shadows-fixes'
import AppColors from '../../assets/colors/Appcolors'
import GroupStyles from '../../assets/styles/GroupScreenStyle/AllGroupsStyle'
import { ThemeContext } from '../../context/ThemeContext'
import { Icons } from '../../assets/Icons'
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen'

const GroupListHeader = ({navigation}) => {
    const { theme, darkThemeActivator } = useContext(ThemeContext)
  
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("InnerScreens", { screen: "CreateGroup" }) }} >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Neomorph
                    darkShadowColor={AppColors.primary}
                    lightShadowColor={AppColors.white}
                    swapShadows
                    style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
                >
                    <View style={GroupStyles.plusButnContainer}>
                        <View style={GroupStyles.button(theme.dpCircleColor)}>
                            <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor} />
                        </View>
                        <TouchableOpacity style={GroupStyles.plusButton}>
                            <Icons.MaterialCommunityIcons name="plus" size={wp('3.8%')} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={GroupStyles.newGroupNameStyle(darkThemeActivator)}>New Group</Text>
                </Neomorph>
            </View>
        </TouchableOpacity>)
}

export default GroupListHeader;