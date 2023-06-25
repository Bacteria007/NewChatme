import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
// import  Icons from '../../assets/Icons'
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle'
import { Icons } from '../../../assets/Icons'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


const AppSubHeader = () => {
  return (
    <View style={[AppSubHeaderStyle.searchViewStyle]}>
        <Icons.Feather name="search" size={wp('6%')} />
        <TextInput placeholder="Search" style={[AppSubHeaderStyle.textInputPlaceholderStyle]} />
      </View>
  )
}

export default AppSubHeader