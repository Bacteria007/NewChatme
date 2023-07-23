import React, { useState, useEffect, useId } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const baseUrl='http://192.168.1.107:8888'
  const [userName, setUserName] = useState();
  const [currentUserId, setCurrentUserId] = useState('');
  const [language, setLanguage] = useState('English');
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
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
  const storeLoggedinStatus=val=>{
    setIsUserLoggedin(val)
  }
  const getUserID = async () => {
    try{
    const userData = await AsyncStorage.getItem('user');
    if (userData !== null) {
      // Check if the retrieved data is not undefined before parsing
      if (userData !== undefined) {
        console.log('User ID get context:', typeof userData);
        console.log('User ID get context parse:', JSON.parse(userData));
        setCurrentUserId(userData)
        return userData;
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
  console.log("after storing new id",currentUserId)
  const updateCurrentUserId = (value) => {
    setCurrentUserId('');
    console.log("called context")
  };

  // ********************************************     USE EFFECT FOR LANGUAGE RETRIVE FROM ASYNC STORAGE   ***************

  useEffect(()=>{
    getUserID()
    console.log("conditional effect")
  },[currentUserId])
  useEffect(() => {
    // Retrieve the selected language from AsyncStorage
    AsyncStorage.getItem('selectedLanguage')
      .then(selectedLanguage => {
        if (selectedLanguage) {
          storeLanguage(selectedLanguage);
          console.log('store lang:');
        } else {
          storeLanguage('English');
          console.log('store lang else case:English');
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
        baseUrl,
        userName,
        currentUserId,
        isUserLoggedin,
        storeUserName,
        storeLanguage,
        language,
        darkThemeActivator,
        changeTheme,
        updateCurrentUserId,
        storeLoggedinStatus
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
