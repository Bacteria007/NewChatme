import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import { SearchBar } from '@rneui/themed';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';

const AppSubHeader = ({ handleSearchOnChange, searchQuery}) => {


  return (
    <SearchBar
      lightTheme
      onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY 
      value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
      elevation={0}
      underlineColorAndroid="transparent"
      placeholder="Search Chats"
      placeholderTextColor={AppColors.coolgray}
      round
      showCancel
      containerStyle={AppSubHeaderStyle.container}
      inputContainerStyle={AppSubHeaderStyle.inputContainer}
      inputStyle={{ color: AppColors.coolgray }}
      leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
      rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
      searchIcon={AppSubHeaderStyle.searchStyle}
      clearIcon={AppSubHeaderStyle.crossStyle}
      clearTextOnFocus={true}
    />
  );
};

export default AppSubHeader;

///////// PEHLY WALA=================

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   useColorScheme,
// } from 'react-native';
// import React, {useContext} from 'react';
// // import  Icons from '../../assets/Icons'
// import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
// import {Icons} from '../../../assets/Icons';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import AppColors from '../../../assets/colors/Appcolors';
// import AppContext from '../../../context/AppContext';

// const AppSubHeader = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const {darkThemeActivator} = useContext(AppContext);

//   return (
//     <View
//       style={[
//         AppSubHeaderStyle.searchViewStyle,
//         {
//           backgroundColor: darkThemeActivator
//             ? AppColors.darkTheme
//             : AppColors.lightGrey,
//           borderColor: darkThemeActivator?AppColors.searchBorderDark:AppColors.transparent,
//         },
//       ]}>
// <Icons.Feather
//   name="search"
//   size={wp('4%')}
//   color={darkThemeActivator ? AppColors.searchContentDark: AppColors.coolgray}
// />
//       <TextInput
//         placeholder="Search"
//         placeholderTextColor={
//           darkThemeActivator ? AppColors.searchContentDark : AppColors.coolgray
//         }
//         style={[
//           AppSubHeaderStyle.textInputPlaceholderStyle,
//           {color: darkThemeActivator ?AppColors.searchContentDark: AppColors.coolgray},
//         ]}
//       />
//     </View>
//   );
// };

// export default AppSubHeader;
