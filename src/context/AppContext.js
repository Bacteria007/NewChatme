import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const [userName, setUserName] = useState();
  const [currentUserId, setCurrentUserId] = useState('');
  const [language, setLanguage] = useState('English');
  const [darkThemeActivator, setDarkThemeActivator] = useState(false)
  const changeTheme = () => {
    setDarkThemeActivator(!darkThemeActivator)
  }
  const storeUserName = val => {
    setUserName(val);
  };

  const storeLanguage = val => {
    setLanguage(val);
  };
  const getUserID = async () => {
    try{
    const userData = await AsyncStorage.getItem('user');
    if (userData !== null) {
      // Check if the retrieved data is not undefined before parsing
      if (userData !== undefined) {
        const user = JSON.parse(userData);
        setCurrentUserId(user)
        const userID = user._id;
        console.log('User ID get context:', user);
        return userID;
      } else {
        console.log('User data is undefined in async storage.');
        return null;
      }
    } else {
      console.log('User information not found in async storage.');
      return null;
    }
  } catch (error) {
    console.log('Error while retrieving user information:', error);
    return null;
  }}
  

  // ********************************************     USE EFFECT FOR LANGUAGE RETRIVE FROM ASYNC STORAGE   ***************

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage
    AsyncStorage.getItem('selectedLanguage')
      .then(selectedLanguage => {
        if (selectedLanguage) {
          storeLanguage(selectedLanguage);
          console.log('store lang:');
        } else {
          storeLanguage(RNLocalize.getLocales()[0].languageCode);
          console.log('store lang else case:');
        }
      })
      .catch(error => {
        console.log('Error retrieving selected language:', error);
      });
      getUserID()
  }, []);

  return (
    <AppContext.Provider
      value={{
        appName,
        userName,
        currentUserId,
        storeUserName,
        storeLanguage,
        language,
        darkThemeActivator,
        changeTheme
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
