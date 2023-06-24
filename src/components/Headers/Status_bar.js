import {View, Text, StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import AppColors from '../../assets/colors/Appcolors';

const Status_bar = () => {
  const headerColorInLightMode = AppColors.primary;
  const headerColorInDarkMode = AppColors.white;
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = isDarkMode ? headerColorInDarkMode : headerColorInLightMode;
  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
        backgroundColor={bgColor}
      />
    </View>
  );
};

export default Status_bar;
