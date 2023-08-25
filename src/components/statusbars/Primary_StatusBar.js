import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import AppColors from '../../assets/colors/Appcolors';
import { useDrawerStatus } from '@react-navigation/drawer';

const Primary_StatusBar = () => {
  const { theme } = useContext(ThemeContext)
  // const drawerStatus = useDrawerStatus();

  // useEffect(() => {
  //   if (drawerStatus=='open') {
  //     StatusBar.setBarStyle('dark-content');
  //     StatusBar.setBackgroundColor(AppColors.Mauve);
  //   } else {
  //     StatusBar.setBarStyle(theme.statusBarText);
  //     StatusBar.setBackgroundColor(theme.statusBarBg); 
  //   }
  // }, [drawerStatus]);
    return <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.statusBarBg} animated={true} />
};
export default Primary_StatusBar;