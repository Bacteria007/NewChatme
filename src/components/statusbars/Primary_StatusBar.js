import React, { useContext } from 'react';
import { StatusBar} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import AppColors from '../../assets/colors/Appcolors';


export const Primary_StatusBar = () => {
  const { theme } = useContext(ThemeContext)
    return <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.backgroundColor} animated={true} />
}

 