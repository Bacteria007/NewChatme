import React, { useContext } from 'react'
import Icon, { Icons } from '../assets/Icons'
import AppColors from '../assets/colors/Appcolors';
import { ThemeContext } from '../context/ThemeContext';

const TabIcons = ({ type, name, focused, size }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Icon
      type={type}
      name={name}
      size={size}
      color={focused ? theme.focusedTabIconsColor : theme.notFocusedTabIconsColor}
    />
  )
}

export default TabIcons