import React, { createContext, useState } from 'react';
import AppColors from '../assets/colors/Appcolors';

// Define the initial theme
const initialTheme = {
    linearBlue: AppColors.linearGradient.blue,
    linearPink: AppColors.linearGradient.pink,
    tabColor: AppColors.tab,
    notFocusedTabIconsColor: AppColors.inActiveIconsColor,
    focusedTabIconsColor: AppColors.purple,
    headerIconsColor: AppColors.black,
    headerSearchBar: AppColors.lightBlack,
    headerSearchText:AppColors.black,
    homeCardColor: AppColors.white,
    profileNameColor: AppColors.black,
    lastMsgColor: AppColors.lightBlack2,
    groupDpIconColor: AppColors.lightThemeColors.groupDpIcon,
    dpCircleColor: AppColors.lightThemeColors.dpCircleColor,
    headerSearchBarIcons: AppColors.coolgray,
    chatsHeaderBg:AppColors.linearGradient.blue,
    statusBarBg:AppColors.bgprimary,
    statusBarText: 'dark-content',
    drawerColor:AppColors.Mauve,
    backgroundColor:AppColors.bgprimary,
    buttonsColor:AppColors.purple,
    buttonsTextColor:AppColors.white,
    addBtnColor:AppColors.black,
    addBtnTextColor:AppColors.white,
};

// Create the theme context
export const ThemeContext = createContext(initialTheme);

// Create the theme provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(initialTheme);
    const [darkThemeActivator, setDarkThemeActivator] = useState(false)

    // Function to update the theme
    const updateTheme = newTheme => {
        setTheme(newTheme);
    };
    const changeThemeState=()=>{
        setDarkThemeActivator(!darkThemeActivator)
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                updateTheme,
                darkThemeActivator,
                changeThemeState
            }}>
            {children}
        </ThemeContext.Provider>
    );
};
