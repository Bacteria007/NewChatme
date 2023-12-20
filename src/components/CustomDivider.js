import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ProfileScreenStyleSheet from '../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet'
import { ThemeContext } from '../context/ThemeContext';

const CustomDivider = () => {

    const { darkThemeActivator } = useContext(ThemeContext);

    return (
        <View style={{ paddingHorizontal: 22 }}>
            <View style={ProfileScreenStyleSheet.dividerContainer(darkThemeActivator)}>
            </View>
        </View>
    )
}

export default CustomDivider