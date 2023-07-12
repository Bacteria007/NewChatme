import {View, Text, StatusBar, useColorScheme} from 'react-native';
import React, { useContext } from 'react';
import AppColors from '../../assets/colors/Appcolors';
import AppContext from '../../context/AppContext';

const Status_bar = ({darkModeBgColor,lightModeBgColor,darkModeContent,lightModeContent}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { darkThemeActivator } = useContext(AppContext);

  return (
      <StatusBar
        barStyle={darkThemeActivator ? darkModeContent : lightModeContent}
        backgroundColor={darkThemeActivator?darkModeBgColor:lightModeBgColor}
      />

  );
};

export default Status_bar;