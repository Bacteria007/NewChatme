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

import BotIconBlack from '../../../assets/imges/headericons/botBlack.svg'
import BotIconWhite from '../../../assets/imges/headericons/botWhite.svg'
import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg'
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg'
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import BotChatHeaderStyle from '../../../assets/styles/BotStyleSheet/BotChatHeaderStyle';
import Primary_StatusBar from '../../statusbars/Primary_StatusBar';
import { SearchBar } from '@rneui/base';
const AppHeader = ({ navigation, headerTitle, searchQuery, handleSearchOnChange }) => {

  const { updateTheme, theme, darkThemeActivator, changeThemeState } = useContext(ThemeContext);


  const DarkThemeChanger = () => {
    // Update the theme
    const newTheme = {
      linearBlue: AppColors.darkThemeColors.bgColor,
      linearPink: AppColors.darkThemeColors.bgColor,
      notFocusedTabIconsColor: AppColors.lightwhite,
      focusedTabIconsColor: AppColors.white,
      headerIconsColor: AppColors.white,
      headerSearchText: AppColors.lightwhite,
      headerSearchBar: AppColors.darkThemeColors.darkHomeCards,
      discussionsCardColor: AppColors.darkThemeColors.darkHomeCards,
      profileName: AppColors.white,
      lastMsg: AppColors.lightwhite,
      groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
      groupDpCircle: AppColors.darkThemeColors.groupDpCircle,
      headerSearchBarIcons: AppColors.coolgray,
      chatsHeaderBg: AppColors.transparent,
      statusBarBg: AppColors.black,
      statusBarText: 'light-content',
      drawerColor: AppColors.white,

    };
    updateTheme(newTheme);
    changeThemeState()
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
      headerSearchText: AppColors.black,
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
      drawerColor: AppColors.dodgerblue,
    };
    updateTheme(newTheme);
    changeThemeState()
  };


  return (

    <View>
      {/* <Wave style={{ position: 'absolute' }}  /> */}
      <View style={[AppHeaderStyle.mainHeader, {
        backgroundColor: theme.chatsHeaderBg
      }]}>
        <Primary_StatusBar />
        <View style={[AppHeaderStyle.headerView]}>
          <View style={AppHeaderStyle.drawerAndName_Container}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => { navigation.toggleDrawer() }}>

              {darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />}
            </TouchableOpacity>

            <Text style={[AppHeaderStyle.appNameStyle, { color: theme.headerIconsColor }]}>{headerTitle}</Text>
          </View>
          <View style={[AppHeaderStyle.iconContainerStyle]}>
            {darkThemeActivator ? (
              <TouchableOpacity
                onPress={() => {
                  LightThemeChanger();
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
              {/* {darkThemeActivator ? <BotIconWhite /> : <BotIconBlack />} */}
              <View style={[BotChatHeaderStyle.dpContainerView]}>
                <Image source={require('../../../assets/imges/BotScreenImg/botPic.png')} style={{ height: hp('5%'), width: hp('5%') }} />
              </View>
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
          placeholderTextColor={theme.headerSearchText} //light
          round
          showCancel
          containerStyle={[AppSubHeaderStyle.container]}
          inputContainerStyle={[AppSubHeaderStyle.inputContainer, { backgroundColor: theme.headerSearchBar }]}
          inputStyle={{ color: theme.headerSearchText }}
          searchIcon={{ color: theme.headerSearchText, size: 23 }}
          clearIcon={{ color: theme.headerSearchText }}
          leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
          rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};
export default AppHeader;
