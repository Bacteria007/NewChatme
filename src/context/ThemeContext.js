import React, { createContext, useState } from 'react';
import AppColors from '../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkTheme = {

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
    headerColor: AppColors.darkThemeColors.bgColor,
    rippleColor: 'rgba(255,255,255,0.2)',
    chatScreenColor: AppColors.darkThemeColors.bgColor,
    nextBtn: AppColors.black,
    inputColor:AppColors.white


};
const LightTheme = {

    notFocusedTabIconsColor: AppColors.inActiveIconsColor,
    focusedTabIconsColor: AppColors.primary,
    headerIconsColor: AppColors.black,
    headerSearchBar: AppColors.tab,
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
    headerColor: AppColors.white,
    rippleColor: AppColors.lightBlack,
    chatScreenColor: AppColors.white,
    nextBtn: AppColors.white,
    inputColor:AppColors.black
};


// Create the theme context
export const ThemeContext = createContext(LightTheme);

// Create the theme provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LightTheme);
    const [darkThemeActivator, setDarkThemeActivator] = useState(false)

    // Function to update the theme
    const setLightTheme = async () => {
        setTheme(LightTheme);
        setDarkThemeActivator(false);
        await AsyncStorage.setItem('darkTheme', JSON.stringify(false))
        console.log("dark theme set false", await AsyncStorage.getItem('darkTheme'))
    };
    const setDarkTheme = async () => {
        setTheme(DarkTheme);
        setDarkThemeActivator(true)
        await AsyncStorage.setItem('darkTheme', JSON.stringify(true))
        console.log("dark theme set true", await AsyncStorage.getItem('darkTheme'))
    };
    const changeThemeState = () => {
        setDarkThemeActivator(!darkThemeActivator)
    }
    const toggleTheme = () => {
        if (darkThemeActivator) {
            setLightTheme()
        }
        else {
            setDarkTheme()
        }
    }
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setLightTheme,
                setDarkTheme,
                darkThemeActivator,
                changeThemeState,
                toggleTheme
            }}>
            {children}
        </ThemeContext.Provider>
    );
};
