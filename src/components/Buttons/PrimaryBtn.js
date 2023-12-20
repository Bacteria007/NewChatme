import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import PrimaryBtnStyle from '../../assets/styles/BtnStyles/PrimaryBtnStyle'

const PrimaryBtn = ({btnTitle,onPress}) => {
    return (
            <TouchableOpacity
                onPress={onPress}
                style={PrimaryBtnStyle.BtnStyle}>
                <Text style={PrimaryBtnStyle.BtnTitleStyle}>
                    {btnTitle}
                </Text>
            </TouchableOpacity>
    )
}

export default PrimaryBtn