import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,

} from 'react-native';
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SearchBar } from '@rneui/themed';

import BotIconBlack from '../../../assets/imges/headericons/botBlack.svg'
import BotIconWhite from '../../../assets/imges/headericons/botWhite.svg'
import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg'
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg'
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import BotChatHeaderStyle from '../../../assets/styles/BotHeaderSheet/BotChatHeaderStyle';
import Primary_StatusBar from '../../statusbars/Primary_StatusBar';

const CallsScreenHeader = ({ navigation, headerTitle, searchQuery, handleSearchOnChange }) => {

  const { theme, darkThemeActivator, } = useContext(ThemeContext);

  return (

    <View>
      {/* <Wave style={{ position: 'absolute' }}  /> */}
      <View style={[styles.mainContainer, {
        backgroundColor: theme.chatsHeaderBg
      }]}>
        <Primary_StatusBar/>
        <View style={[styles.headerView]}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => { navigation.toggleDrawer() }}>

            {darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />}
          </TouchableOpacity>

          <Text style={[AppHeaderStyle.appNameStyle, { color: theme.headerIconsColor}]}>{headerTitle}</Text>
          
        </View>
        <SearchBar
          lightTheme
          onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY 
          value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
          elevation={0}
          underlineColorAndroid="transparent"
          placeholder="Search Chats"
          placeholderTextColor={theme.headerSearchText} //light
          round
          showCancel
          containerStyle={[AppSubHeaderStyle.container]}
          inputContainerStyle={[AppSubHeaderStyle.inputContainer,{backgroundColor:theme.headerSearchBar}]}
          inputStyle={{ color: theme.headerSearchText }}
          searchIcon={{ color: theme.headerSearchText,size: 23 }}
          clearIcon={{ color: theme.headerSearchText }}
          leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
          rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
          clearTextOnFocus={true}
        />
        
      </View>
    </View>
  );
};
export default CallsScreenHeader;
 const styles=StyleSheet.create({
    mainContainer:{
    justifyContent: 'center',
    alignItems:'center',
    height: hp('16%'),
    },
    headerView: {
        flexDirection: 'row',
        paddingHorizontal: wp('3.5%'),
        alignItems:'center',
        width:wp('100%'),    
      },
 })