import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg';
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg';
import AppColors from '../../../assets/colors/Appcolors';
import { ThemeContext } from '../../../context/ThemeContext';
import { Appbar } from 'react-native-paper';
import { SearchBar } from '@rneui/base';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { View } from 'react-native';

const HeaderNew = ({
  navigation,
  headerTitle,
  searchQuery,
  handleSearchOnChange,
}) => {
  const { updateTheme, theme, darkThemeActivator, changeThemeState } =
    useContext(ThemeContext);

  const DarkThemeChanger = () => {
    // Update the theme
    const newTheme = {
      linearBlue: AppColors.darkThemeColors.bgColor,
      linearPink: AppColors.darkThemeColors.bgColor,
      notFocusedTabIconsColor: AppColors.lightwhite,
      focusedTabIconsColor: AppColors.primary,
      headerIconsColor: AppColors.white,
      headerSearchText: AppColors.lightwhite,
      headerSearchBar: AppColors.darkThemeColors.darkHomeCards,
      homeCardColor: AppColors.darkThemeColors.darkHomeCards,
      profileNameColor: AppColors.white,
      lastMsgColor: AppColors.lightwhite,
      groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
      dpCircleColor: AppColors.darkThemeColors.dpCircleColor,
      headerSearchBarIcons: AppColors.coolgray,
      chatsHeaderBg: AppColors.transparent,
      statusBarBg: AppColors.darkThemeColors.bgColor,
      statusBarText: 'light-content',
      drawerColor: AppColors.primary,
      backgroundColor: AppColors.darkThemeColors.bgColor,
      tabColor: AppColors.darkThemeColors.bgColor,
      buttonsColor: AppColors.purple,
      buttonsTextColor: AppColors.white,
      addBtnColor: AppColors.black,
      addBtnTextColor: AppColors.white,
    };
    updateTheme(newTheme);
    changeThemeState();
  };
  const LightThemeChanger = () => {
    // Update the theme
    const newTheme = {
      linearBlue: AppColors.linearGradient.blue,
      linearPink: AppColors.linearGradient.pink,
      notFocusedTabIconsColor: AppColors.inActiveIconsColor,
      focusedTabIconsColor: AppColors.purple,
      headerIconsColor: AppColors.black,
      headerSearchBar: AppColors.lightBlack,
      headerSearchText: AppColors.black,
      homeCardColor: AppColors.white,
      profileNameColor: AppColors.black,
      lastMsgColor: AppColors.lightBlack2,
      groupDpIconColor: AppColors.lightThemeColors.groupDpIcon,
      dpCircleColor: AppColors.lightThemeColors.dpCircleColor,
      headerSearchBarIcons: AppColors.coolgray,
      chatsHeaderBg: AppColors.transparent,
      drawerColor: AppColors.Mauve,
      statusBarBg: AppColors.bgprimary,
      statusBarText: 'dark-content',
      backgroundColor: AppColors.bgprimary,
      tabColor: AppColors.tab,
      buttonsColor: AppColors.purple,
      buttonsTextColor: AppColors.white,
      addBtnColor: AppColors.black,
      addBtnTextColor: AppColors.white,
    };
    updateTheme(newTheme);
    changeThemeState();
  };

  return (
    <View style={{backgroundColor:theme.backgroundColor}}>
    <Appbar.Header
    elevated={true}
      mode="center-aligned"
      style={{ backgroundColor: theme.backgroundColor,height:hp('7')}}>
      <Appbar.Action
        icon={() =>
          darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />
        }
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
      <Appbar.Content
        title={headerTitle}
        titleStyle={{ color: theme.headerIconsColor, marginTop: 7 }}
      />
      {darkThemeActivator ? (
        <Appbar.Action
          icon={() => (
            <Icons.Entypo
              name="light-up"
              color={theme.headerIconsColor}
              size={wp('6%')}
            />
          )}
          onPress={() => {
            LightThemeChanger();
          }}
        />
      ) : (
        <Appbar.Action
          icon={() => (
            <Icons.Ionicons
              name="moon-sharp"
              color={theme.headerIconsColor}
              size={wp('6%')}
            />
          )}
          onPress={() => {
            DarkThemeChanger();
          }}
        />
      )}
    </Appbar.Header>
     {/* <SearchBar
     lightTheme
     onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY
     value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
     elevation={0}
     underlineColorAndroid="transparent"
     placeholder={`Search ${headerTitle}`}
     placeholderTextColor={theme.headerSearchText} //light
     round
     showCancel
     containerStyle={AppSubHeaderStyle.container(theme.backgroundColor)}
     inputContainerStyle={[AppSubHeaderStyle.inputContainer, { backgroundColor: theme.headerSearchBar }]}
     inputStyle={{ color: theme.headerSearchText }}
     searchIcon={{ color: theme.headerSearchText, size: 23 }}
     clearIcon={{ color: theme.headerSearchText }}
     leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
     rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
     clearTextOnFocus={true}
   /> */}
   </View>
  );
};
export default HeaderNew;
