import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { io } from 'socket.io-client';
import { AppState } from 'react-native';

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const appName = 'ChatMe';
  const baseUrl = 'http://192.168.166.238:8888';
  // const socket = io.connect('http://192.168.43.145:8888');
  const [userName, setUserName] = useState();
  const [storedUser, setStoredUser] = useState('');
  const [language, setLanguage] = useState('English');
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  const [darkThemeActivator, setDarkThemeActivator] = useState(false);
  const [curentUser, setCurentUser] = useState(AsyncStorage.getItem('user'));
  const [selectedImageUri, setSelectedImageUri] = useState('');

  // const fetchUserId = async () => {
  //   const user = await AsyncStorage.getItem('user');
  //   const userId= await JSON.parse(user);
  //   console.log("user id in all gloabl", JSON.parse(userId));
  //   return userId;
  // }
  console.log('user context mn', curentUser);
  const changeTheme = () => {
    setDarkThemeActivator(!darkThemeActivator);
  };
  const storeImageUri = val => {
    setSelectedImageUri(val);
  };
  const storeUserName = val => {
    setUserName(val);
  };

  const storeLanguage = val => {
    setLanguage(val);
  };
  const storeLoggedinStatus = val => {
    setIsUserLoggedin(val);
  };
  const getStoredUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    console.log('asyncUser', userData);
    console.log('User ID get context:', typeof userData);
    console.log('User ID get context parse:', JSON.parse(userData));
    const pid = await JSON.parse(userData);
    setStoredUser(pid);
    console.log('pid', pid.userId);
    return pid;
  };

  useEffect(() => {
    getStoredUserDetails();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Check if the app is in the foreground
      if (AppState.currentState === 'active') {
        // Show a foreground notification using the system's notification API
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          color: 'red',
        });
      }
    });

    return unsubscribe;
  });

  // ********************************************     USE EFFECT FOR LANGUAGE RETRIVE FROM ASYNC STORAGE   ***************

  // useEffect(()=>{
  //   getUserID()
  //   console.log("conditional effect")
  // },[storedUser])

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage
    AsyncStorage.getItem('selectedLanguage')
      .then(selectedLanguage => {
        if (selectedLanguage) {
          storeLanguage(selectedLanguage);
        } else {
          storeLanguage(RNLocalize.getLocales()[0].languageCode);
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
        // socket,
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
