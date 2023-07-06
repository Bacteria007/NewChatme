import React, { useState } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
const appName='ChatMe';
    const [userName, setUserName] = useState();
    
    const storeUserName = val => {
        setUserName(val);
    };
   
   
    return <AppContext.Provider value={{
        appName,
        userName,
        storeUserName,
    }}>

        {children}

    </AppContext.Provider>
}
export default AppContext;