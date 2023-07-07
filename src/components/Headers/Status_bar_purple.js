import {View, Text, StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import AppColors from '../../assets/colors/Appcolors';

const Status_bar_purple = ({darkModeBgColor,lightModeBgColor,darkModeContent,lightModeContent}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { darkThemeActivator } = useContext(AppContext);

  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar
        barStyle={darkThemeActivator ? darkModeContent : lightModeContent}
        backgroundColor={darkThemeActivator?darkModeBgColor:lightModeBgColor}
      />
    </View>
  );
};

export default Status_bar_purple;
