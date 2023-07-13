import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const [userName, setUserName] = useState();
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
  }, []);

  return (
    <AppContext.Provider
      value={{
        appName,
        userName,
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
