import React, { createContext, useContext, useState } from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for managing user data
const UserContext = createContext();

export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(AsyncStorage.getItem('user'));
// console.log("useContext console",JSON.stringify(userData))
  return (
    <UserContext.Provider value={{ 
      // userData, setUserData
       }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
