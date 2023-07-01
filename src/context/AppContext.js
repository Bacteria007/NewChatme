import React, { useState } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [appName, setAppName] = useState('ChatMe');
    const [userName, setUserName] = useState();
    const [userPhoneNumber, setUserPhoneNumber] = useState();
    const [aboutOfUserProfile, setAboutOfUserProfile] = useState();
    const [defaultAbouts, setDefaultAbouts] = useState([
        { aboutStatus: 'Available' },
        { aboutStatus: 'Buzy' },
        { aboutStatus: 'At School' },
        { aboutStatus: 'At the Movies' },
        { aboutStatus: 'At work' },
        { aboutStatus: 'Battery about to die' },
        { aboutStatus: "Can't talk, ChatMe only" },
        { aboutStatus: 'In a meeting' },
        { aboutStatus: 'At the gym' },
        { aboutStatus: 'Sleeping' },
        { aboutStatus: 'Urget calls only' },
    ]);

    const storeDefaultAbouts = item => {
        setDefaultAbouts(oldDef => [...oldDef, item]);
    };
    const storeUserAbout = val => {
        setAboutOfUserProfile(val);
        // setHeading(oldHead => [...oldHead, item])
    };
    const storeUserName = val => {
        setUserName(val);
    };
    const storeUserPhone = val => {
        setUserPhoneNumber(val);
    };
    return <AppContext.Provider value={{
        appName,
        aboutOfUserProfile,
        userName,
        userPhoneNumber,
        defaultAbouts,
        storeDefaultAbouts,
        storeUserName,
        storeUserPhone,
        storeUserAbout,
    }}>

        {children}

    </AppContext.Provider>
}
export default AppContext;