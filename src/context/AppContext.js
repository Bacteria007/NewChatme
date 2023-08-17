import React, { useState, useEffect, useId } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const baseUrl='http://192.168.43.145:8888'
  const [userName, setUserName] = useState();
  const [storedUser, setStoredUser] = useState(AsyncStorage.getItem('user'));
  const [language, setLanguage] = useState('English');
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const [darkThemeActivator, setDarkThemeActivator] = useState(false);
  const [curentUser, setCurentUser] = useState(AsyncStorage.getItem('user'));
  const [selectedImageUri, setSelectedImageUri] = useState('');

  
  // const fetchUserId = async () => {
  //   const user = await AsyncStorage.getItem('user');
  //   const userId= await JSON.parse(user);
  //   console.log("user id in all gloabl", JSON.parse(userId));
  //   return userId;
  // }
  console.log('user context mn',curentUser)
  const changeTheme = () => {
    setDarkThemeActivator(!darkThemeActivator)
  }
  const storeImageUri = val => {
    setSelectedImageUri(val);
  };
  const storeUserName = val => {
    setUserName(val);
  };

  const storeLanguage = val => {
    setLanguage(val);
  };
  const storeLoggedinStatus=val=>{
    setIsUserLoggedin(val)
  }
  const getStoredUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    console.log("asyncUser",userData)
        console.log('User ID get context:', typeof userData);
        console.log('User ID get context parse:', JSON.parse(userData));
        const pid= await JSON.parse(userData)
        setStoredUser(pid)
        console.log("pid",pid.userId)
        return pid;
     
  };

  useEffect(()=>{
    getStoredUserDetails()
  },[])
  // ********************************************     USE EFFECT FOR LANGUAGE RETRIVE FROM ASYNC STORAGE   ***************

  // useEffect(()=>{
  //   getUserID()
  //   console.log("conditional effect")
  // },[storedUser])
  // useEffect(() => {
  //   // Retrieve the selected language from AsyncStorage
  //   AsyncStorage.getItem('selectedLanguage')
  //     .then(selectedLanguage => {
  //       if (selectedLanguage) {
  //         storeLanguage(selectedLanguage);
  //         console.log('store lang:');
  //       } else {
  //         storeLanguage('English');
  //         console.log('store lang else case:English');
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error retrieving selected language:', error);
  //     });
  //     getUserID().then(userId => {
  //       console.log('conditional effect', userId);
  //     });
  // }, []);

  return (
    <AppContext.Provider
      value={{
        appName,
        baseUrl,
        userName,
        storedUser,
        isUserLoggedin,
        selectedImageUri,
        storeUserName,
        storeLanguage,
        language,
        darkThemeActivator,
        curentUser,
        changeTheme,
        // updateCurrentUserId,
        storeLoggedinStatus,
        // getUserID,
        // fetchUserId,
        storeImageUri,
        getStoredUserDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;