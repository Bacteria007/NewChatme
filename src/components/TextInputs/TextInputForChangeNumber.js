import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'
import TextInputStyleForChangeNumber from '../../assets/styles/TextInputStyleForChangeNumber';
import AppColors from '../../assets/colors/Appcolors';
import { Icons } from '../../assets/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';


const TextInputForChangeNumber = ({setPhoneNo,setCountryCode,}) => {
  return (
    <View style={[TextInputStyleForChangeNumber.containerViewStyle]}>
    <View style={[TextInputStyleForChangeNumber.innerView]}>
    <Text style={[TextInputStyleForChangeNumber.plusText]}>+</Text>
    <TextInput
      keyboardType='numeric'
      onChangeText={text => {
        setCountryCode(text);
      }}
      maxLength={3}
      style={[TextInputStyleForChangeNumber.countryCodeTextInputStyle]}
    />
    </View>
      <TextInput
        placeholder="phone number"
        keyboardType='numeric'
        onChangeText={text => {
          setPhoneNo(text);
        }}
        // underlineColorAndroid={AppColors.black}
        style={[TextInputStyleForChangeNumber.phoneNumberTextinputStyle]}
      />
  </View>

  )
}

export default TextInputForChangeNumber