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
  const apiKey = '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';
  const baseUrl = 'http://192.168.43.122:8888';
  const apiURL = 'https://api.openai.com/v1/completions';
  const aimodel='gpt-3.5-turbo-instruct'
  const [userName, setUserName] = useState('');
  const [storedUser, setStoredUser] = useState('');
  const [language, setLanguage] = useState('English');
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [token, setToken] = useState(AsyncStorage.getItem('token'))

  const updateToken = (e) => {
    setToken(e)
  }
  const getToken = async () => {
    console.log("token context", await AsyncStorage.getItem('token'))
    setToken(await AsyncStorage.getItem('token'))
  }
  const updateCurrentUser = obj => {
    setCurrentUser(obj);
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
    setIsUserLoggedin(val)
  }
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
  }, []);
  // ********************************************     USE EFFECT FOR LANGUAGE RETRIVE FROM ASYNC STORAGE   ***************
  useEffect(async () => {
    // Retrieve the selected language from AsyncStorage
    await AsyncStorage.getItem('selectedLanguage')
      .then(selectedLanguage => {
        if (selectedLanguage) {
          storeLanguage(selectedLanguage);
        } else {
          storeLanguage("English");
          // storeLanguage(RNLocalize.getLocales()[0].languageCode);
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
        currentUser,
        isUserLoggedin,
        selectedImageUri,
        language,
        token,
        apiKey,
        apiURL,
        storeUserName,
        storeLanguage,
        updateCurrentUser,
        getToken,
        updateToken,
        storeLoggedinStatus,
        storeImageUri,
        aimodel
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
