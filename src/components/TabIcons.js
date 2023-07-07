import {  Text, View } from 'react-native'
import React, { useContext } from 'react'
import Icon, { Icons } from '../assets/Icons'
import AppContext from '../context/AppContext';
import AppColors from '../assets/colors/Appcolors';

const TabIcons = ({type,name,focused,size}) => {
    const { darkThemeActivator } = useContext(AppContext);

  return (
    <Icon
    type={type}
    name={name}
    size={size}
    color={
        darkThemeActivator?( focused ? AppColors.primary : AppColors.darkThemeContent):(focused ? AppColors.primary : AppColors.inActiveIconsColor)
        }
    />
  )
}

export default TabIcons