import React, { useState, useEffect, useId } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { io } from 'socket.io-client';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const baseUrl='http://192.168.1.119:8888';
  const socket = io.connect('http://192.168.1.119:8888');
  const [userName, setUserName] = useState();
  const [storedUser, setStoredUser] = useState('');
  const [language, setLanguage] = useState('English');
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const [darkThemeActivator, setDarkThemeActivator] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [token, setToken] = useState(AsyncStorage.getItem('token'))

  
  // const fetchUserId = async () => {
  //   const user = await AsyncStorage.getItem('user');
  //   const userId= await JSON.parse(user);
  //   console.log("user id in all gloabl", JSON.parse(userId));
  //   return userId;
  // }
  const updateToken=(e)=>{
    setToken(e)
  }
  const getToken=async()=>{
    console.log("token context",await AsyncStorage.getItem('token'))
    setToken(await AsyncStorage.getItem('token'))
  }
  const updateCurrentUser = obj => {
    setCurrentUser(obj);
  };  const changeTheme = () => {
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
  // const getStoredUserDetails = async () => {
  //   const userData = await AsyncStorage.getItem('user');
  //   console.log("asyncUser",userData)
  //       console.log('User ID get context:', typeof userData);
  //       console.log('User ID get context parse:', JSON.parse(userData));
  //       const pid= await JSON.parse(userData)
  //       setStoredUser(pid)
  //       console.log("pid",pid.userId)
  //       return pid;
     
  // };

  // useEffect(()=>{
  //   getStoredUserDetails()
  // },[])
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
        language,token,
        darkThemeActivator,
        currentUser,
        changeTheme,
        updateCurrentUser,
        getToken,
        updateToken,
        // updateCurrentUserId,
        storeLoggedinStatus,
        // getUserID,
        // fetchUserId,
        storeImageUri,
        // getStoredUserDetails,
        socket,
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;