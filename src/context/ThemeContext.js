import React, { createContext, useState } from 'react';
import AppColors from '../assets/colors/Appcolors';

// Define the initial theme
const initialTheme = {
    linearBlue: AppColors.linearGradient.blue,
    linearPink: AppColors.linearGradient.pink,
    tabColor: AppColors.lightwhite,
    notFocusedTabIconsColor: AppColors.inActiveIconsColor,
    focusedTabIconsColor: AppColors.black,
    headerIconsColor: AppColors.black,
    headerSearchBar: AppColors.lightBlack,
    headerSearchText:AppColors.black,
    discussionsCardColor: AppColors.homeCards,
    profileName: AppColors.black,
    lastMsg: AppColors.lightBlack2,
    groupDpIconColor: AppColors.darkThemeColors.groupDpIcon,
    groupDpCircle: AppColors.lightThemeColors.groupDpCircle,
    headerSearchBarIcons: AppColors.coolgray,
    chatsHeaderBg:AppColors.linearGradient.blue,
    statusBarBg:AppColors.linearGradient.blue,
    statusBarTextLight:'light-content',
    statusBarTextDark:'dark-content',
    statusBarText:'dark-content',

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
