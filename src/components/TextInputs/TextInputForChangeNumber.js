import { View, Text,TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import TextInputStyleForChangeNumber from '../../assets/styles/TextInputStyleForChangeNumber';
import AppColors from '../../assets/colors/Appcolors';
import { ThemeContext } from '../../context/ThemeContext';


const TextInputForChangeNumber = ({setPhoneNo,setCountryCode,}) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  return (
    <View style={[TextInputStyleForChangeNumber.containerViewStyle]}>
    <View style={[TextInputStyleForChangeNumber.innerView]}>
    <Text style={[TextInputStyleForChangeNumber.plusText(maintextColor)]}>+</Text>
    <TextInput
      keyboardType='numeric'
      onChangeText={text => {
        setCountryCode(text);
      }}
      // underlineColorAndroid={AppColors.purple}
      maxLength={3}
      style={[TextInputStyleForChangeNumber.countryCodeTextInputStyle(darkThemeActivator,secondaryTextColor)]}
      placeholderTextColor={AppColors.gray}
   
   />
    </View>
      <TextInput
        placeholder="phone number"
        keyboardType='numeric'
        onChangeText={text => {
          setPhoneNo(text);
        }}
        // underlineColorAndroid={AppColors.purple}
        style={[TextInputStyleForChangeNumber.phoneNumberTextinputStyle(darkThemeActivator,secondaryTextColor)]}
        placeholderTextColor={AppColors.gray}
        
      />
  </View>

  )
}

export default TextInputForChangeNumber