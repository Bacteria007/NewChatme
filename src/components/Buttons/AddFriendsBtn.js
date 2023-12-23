import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import PrimaryBtnStyle from '../../assets/styles/BtnStyles/PrimaryBtnStyle'
import { Neomorph } from 'react-native-neomorph-shadows-fixes'
import AppColors from '../../assets/colors/Appcolors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FontStyle from '../../assets/styles/FontStyle'

const AddFriendBtn = ({ btnTitle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Text style={AddFriendBtnStyle.BtnTitleStyle}>
                {btnTitle}
            </Text>
        </TouchableOpacity>
    )
}

export default AddFriendBtn;
const AddFriendBtnStyle = StyleSheet.create({
    BtnTitleStyle: {
        fontSize: wp('5'),
        color: AppColors.primary,
        fontFamily: FontStyle.regularFont,
    },
})