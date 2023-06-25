import React, { useState } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [appName, setAppName] = useState('ChatMe');

    return <AppContext.Provider value={{
        appName,
    }}>

        {children}

    </AppContext.Provider>
}
export default AppContext;