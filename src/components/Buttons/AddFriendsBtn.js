import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import PrimaryBtnStyle from '../../assets/styles/BtnStyles/PrimaryBtnStyle'
import { Neomorph } from 'react-native-neomorph-shadows-fixes'
import AppColors from '../../assets/colors/Appcolors'
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import FontStyle from '../../assets/styles/FontStyle'

const AddFriendBtn = ({ btnTitle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress} >
            <Neomorph 
            // darkShadowColor={AppColors.primary}
             style={AddFriendBtnStyle.BtnStyle}>

                <Text style={AddFriendBtnStyle.BtnTitleStyle}>
                    {btnTitle}
                </Text>
            </Neomorph>
        </TouchableOpacity>
    )
}

export default AddFriendBtn;
const AddFriendBtnStyle = StyleSheet.create({
    BtnStyle: {
        width: wp('45'),
        borderRadius: wp('2'),
        height: hp('5.5'),
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowRadius:1,
    },
    BtnTitleStyle: {
        fontSize: wp('5'),
        color: AppColors.primary,
        fontFamily: FontStyle.regularFont,
    },

})