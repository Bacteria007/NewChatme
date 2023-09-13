import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,

} from 'react-native';
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg'
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg'
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import BotChatHeaderStyle from '../../../assets/styles/BotStyleSheet/BotChatHeaderStyle';
import { Primary_StatusBar } from '../../statusbars/Primary_StatusBar';
import { SearchBar } from '@rneui/base';
import FontStyle from '../../../assets/styles/FontStyle';
import { TouchableRipple } from 'react-native-paper';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
const AppHeader = ({ navigation, headerTitle, searchQuery, handleSearchOnChange }) => {

  const { updateTheme, theme, darkThemeActivator, changeThemeState } = useContext(ThemeContext);


  const DarkThemeChanger = () => {
    // Update the theme
    const newTheme = {

      notFocusedTabIconsColor: AppColors.lightwhite,
      focusedTabIconsColor: AppColors.primary,
      headerIconsColor: AppColors.white,
      headerSearchText: AppColors.darkThemeColors.headerSearchText,
      headerSearchBar: AppColors.darkThemeColors.headerSearchBar,
      homeCardColor: AppColors.darkThemeColors.darkHomeCards,
      profileNameColor: AppColors.white,
      lastMsgColor: AppColors.lightwhite,
      groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
      dpCircleColor: AppColors.darkThemeColors.dpCircleColor,
      chatsHeaderBg: AppColors.transparent,
      statusBarBg: AppColors.darkThemeColors.bgColor,
      statusBarText: 'light-content',
      drawerColor: AppColors.Mauve,
      backgroundColor: AppColors.darkThemeColors.bgColor,
      tabColor: AppColors.darkThemeColors.bgColor,
      buttonsColor: AppColors.primary,
      buttonsTextColor: AppColors.white,
      addBtnColor: AppColors.black,
      addBtnTextColor: AppColors.white,
      headerColor: AppColors.darkThemeColors.bgColor
    };
    updateTheme(newTheme);
    changeThemeState()
  };
  const LightThemeChanger = () => {
    // Update the theme
    const newTheme = {

      notFocusedTabIconsColor: AppColors.inActiveIconsColor,
      focusedTabIconsColor: AppColors.primary,
      headerIconsColor: AppColors.black,
      headerSearchBar: AppColors.lightThemeColors.headerSearchBar,
      headerSearchText: AppColors.lightThemeColors.headerSearchText,
      homeCardColor: AppColors.white,
      profileNameColor: AppColors.black,
      lastMsgColor: AppColors.lightBlack2,
      groupDpIconColor: AppColors.lightThemeColors.groupDpIcon,
      dpCircleColor: AppColors.lightThemeColors.dpCircleColor,
      chatsHeaderBg: AppColors.transparent,
      drawerColor: AppColors.Mauve,
      statusBarBg: AppColors.bgprimary,
      statusBarText: 'dark-content',
      backgroundColor: AppColors.white,
      tabColor: AppColors.tab,
      buttonsColor: AppColors.primary,
      buttonsTextColor: AppColors.white,
      addBtnColor: AppColors.black,
      addBtnTextColor: AppColors.white,
      headerColor: AppColors.white
    };
    updateTheme(newTheme);
    changeThemeState()
  };


  return (

    <View>
      <View style={AppHeaderStyle.mainHeader(theme.headerColor)}>
        <View style={[AppHeaderStyle.headerView]}>
          <View style={AppHeaderStyle.drawerAndName_Container}>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, 0.3)"
              style={AppHeaderStyle.rippleBtn}
              borderless
              onPress={() => { navigation.toggleDrawer() }}>

              {darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />}
            </TouchableRipple>
            <Text style={[AppHeaderStyle.appNameStyle, { color: theme.headerIconsColor }]}>{headerTitle}</Text>
            <View>
              {headerTitle == "People" ?
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Requests");
                  }}>
                  <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont, fontSize: 11 }}>Requests</Text>
                  {/* <Icons.MaterialCommunityIcons
                    name="bell"
                    size={wp('7%')}
                    color={theme.headerIconsColor}
                    style={{ marginLeft: wp('2%') }}
                /> */}

                </TouchableOpacity>
                :
                darkThemeActivator ? (
                  <TouchableRipple
                    rippleColor="rgba(0, 0, 0, 0.3)"
                    style={AppHeaderStyle.rippleBtn}
                    borderless
                    onPress={() => {
                      LightThemeChanger();
                    }}>
                    <Icons.Entypo
                      name="light-up"
                      color={theme.headerIconsColor}
                      size={wp('6%')}
                    />
                  </TouchableRipple>
                ) : (
                  <TouchableRipple
                    rippleColor="rgba(0, 0, 0, 0.3)"
                    style={AppHeaderStyle.rippleBtn}
                    borderless
                    onPress={() => {
                      DarkThemeChanger();
                    }}>
                    <Icons.Ionicons
                      name="moon-sharp"
                      color={theme.headerIconsColor}
                      size={wp('6%')}
                    />
                  </TouchableRipple>
                )
              }

            </View>
          </View>
        </View>

        <SearchBar
          lightTheme
          onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY
          value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
          elevation={0}
          underlineColorAndroid="transparent"
          placeholder={`Search ${headerTitle}`}
          placeholderTextColor={theme.headerSearchText} //light
          round
          showCancel
          containerStyle={[AppSubHeaderStyle.container(theme.headerColor)]}
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
