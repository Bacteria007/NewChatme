import {View, Text, StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import AppColors from '../../assets/colors/Appcolors';

const Status_bar = ({darkModeBgColor,lightModeBgColor,darkModeContent,lightModeContent}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar
        barStyle={isDarkMode ? darkModeContent : lightModeContent}
        backgroundColor={isDarkMode?darkModeBgColor:lightModeBgColor}
      />
    </View>
  );
};

export default Status_bar;
