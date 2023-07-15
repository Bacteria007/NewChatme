import React, { useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const Primary_StatusBar = () => {
  const { theme } = useContext(ThemeContext)
    return <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.statusBarBg} animated={true} />
};
export default Primary_StatusBar;

//  import React, { useContext } from 'react';
// import { StatusBar, } from 'react-native';
// import { ThemeContext } from '../../context/ThemeContext';

// const Primary_StatusBar = () => {
//   const { theme } = useContext(ThemeContext)
//   return (
   
//           <StatusBar barStyle={theme.statusBarText} backgroundColor={theme.statusBarBg} />
      
//   );
// };

// export default Primary_StatusBar;