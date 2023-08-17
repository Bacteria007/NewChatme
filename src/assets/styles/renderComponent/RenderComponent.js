import React from 'react'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'

const RenderFlatlist = StyleSheet.create({
    modalContainer: {
        // backgroundColor: 'red',
        height: hp('40'),
        width: wp('87'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        borderRadius: 5,

    },
    modalView: {
        backgroundColor: 'white',
        height: hp('35'),
        width: wp('75'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        borderRadius: 5,

    },
});

export default RenderFlatlist
