import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  TextInput,
  Image,
  ImageBackground,

} from 'react-native';
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SearchBar } from '@rneui/themed';

import BotIconBlack from '../../../assets/imges/headericons/botBlack.svg'
import BotIconWhite from '../../../assets/imges/headericons/botWhite.svg'
import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg'
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg'
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';

const AppHeader = ({ navigation, headerTitle, searchQuery, handleSearchOnChange }) => {

  const { updateTheme, theme, darkThemeActivator } = useContext(ThemeContext);


  const DarkThemeChanger = () => {
    // Update the theme
    const newTheme = {
      linearBlue: AppColors.darkThemeColors.bgColor,
      linearPink: AppColors.darkThemeColors.bgColor,
      notFocusedTabIconsColor: AppColors.inActiveIconsColor,
      focusedTabIconsColor: AppColors.black,
      headerIconsColor: AppColors.white,
      headerSearchText:AppColors.lightwhite,
      headerSearchBar: AppColors.coolgray,
      tabColor: AppColors.lightwhite,
      discussionsCardColor: AppColors.darkThemeColors.darkHomeCards,
      profileName: AppColors.white,
      lastMsg: AppColors.lightwhite,
      groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
      groupDpCircle: AppColors.darkThemeColors.groupDpCircle,
      headerSearchBarIcons: AppColors.coolgray,
      chatsHeaderBg: AppColors.transparent,
      statusBarBg: AppColors.black,
      statusBarText: 'light-content',
    };
    updateTheme(newTheme);
  };
  const LightThemeChanger = () => {
    // Update the theme
    const newTheme = {
      linearBlue: AppColors.linearGradient.blue,
      linearPink: AppColors.linearGradient.pink,
      notFocusedTabIconsColor: AppColors.inActiveIconsColor,
      focusedTabIconsColor: AppColors.black,
      headerIconsColor: AppColors.black,
      headerSearchBar: AppColors.lightBlack,
      headerSearchText:AppColors.black,
      tabColor: AppColors.lightwhite,
      discussionsCardColor: AppColors.homeCards,
      profileName: AppColors.black,
      lastMsg: AppColors.lightBlack2,
      groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
      groupDpCircle: AppColors.darkThemeColors.groupDpCircle,
      headerSearchBarIcons: AppColors.coolgray,
      chatsHeaderBg: AppColors.transparent,
      statusBarBg: AppColors.linearGradient.blue,
      statusBarTextLight: 'light-content',
      statusBarTextDark: 'dark-content',
      statusBarText: 'dark-content',

    };
    updateTheme(newTheme);
  };


  return (

    <View>
      {/* <Wave style={{ position: 'absolute' }}  /> */}
      <View style={[AppHeaderStyle.mainHeader, {
        // backgroundColor: theme.chatsHeaderBg
      }]}>
        <View style={[AppHeaderStyle.headerView]}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => { navigation.toggleDrawer() }}>

            {darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />}
          </TouchableOpacity>

          <Text style={[AppHeaderStyle.appNameStyle, { color: theme.headerIconsColor }]}>{headerTitle}</Text>
          <View style={[AppHeaderStyle.iconContainerStyle]}>
            {darkThemeActivator ? (
              <TouchableOpacity
                onPress={() => {
                  LightThemeChanger();
                  console.log('darkthemeactivator', darkThemeActivator);
                }}>
                <Icons.Entypo
                  name="light-up"
                  color={theme.headerIconsColor}
                  size={wp('6%')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  DarkThemeChanger();
                  console.log('darkthemeactivator', darkThemeActivator);
                }}>
                <Icons.Ionicons
                  name="moon-sharp"
                  color={theme.headerIconsColor}
                  size={wp('6%')}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatBot');
              }}>
              {darkThemeActivator ? <BotIconWhite /> : <BotIconBlack />}
            </TouchableOpacity>
          </View>
        </View>

        <SearchBar
          lightTheme
          onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY 
          value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
          elevation={0}
          underlineColorAndroid="transparent"
          placeholder="Search Chats"
          placeholderTextColor={AppColors.lightGrey} //light
          round
          showCancel
          containerStyle={[AppSubHeaderStyle.container]}
          inputContainerStyle={[AppSubHeaderStyle.inputContainer]}
          inputStyle={{ color: AppColors.coolgray }}
          searchIcon={{ color: AppColors.coolgray,size: 23 }}
          clearIcon={{ color: AppColors.coolgray }}
          leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
          rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};
export default AppHeader;
