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

} from 'react-native';
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SearchBar } from '@rneui/themed';

import BotIcon from '../../../assets/imges/headericons/bot.svg'
import MenuLeft from '../../../assets/imges/headericons/menuLeft.svg'
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import { useDrawerStatus } from '@react-navigation/drawer';
import AppContext from '../../../context/AppContext';
import { BgTheme } from '../../../assets/styles/BgTheme';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import Wave from "../../../assets/imges/svgBackgroungs/LG.svg";

const AppHeader = ({ navigation, headerTitle, searchQuery, handleSearchOnChange }) => {
  const isDrawerOen = useDrawerStatus();
  const isDarkMode = useColorScheme() === 'dark';
  const { darkThemeActivator, changeTheme } = useContext(AppContext);

  return (

    <View>
      {/* <Wave style={{ position: 'absolute' }}  /> */}
      <View style={[
        AppHeaderStyle.mainHeader,
        { backgroundColor: BgTheme ? AppColors.darkTheme : AppColors.transparent },
      ]}>
        <View style={[AppHeaderStyle.headerView]}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => { navigation.toggleDrawer() }}>

            <MenuLeft />
          </TouchableOpacity>

          <Text style={[AppHeaderStyle.appNameStyle]}>{headerTitle}</Text>
          <View style={[AppHeaderStyle.iconContainerStyle]}>
            <TouchableOpacity
              onPress={() => {
                changeTheme();
                console.log('darkthemeactivator', darkThemeActivator);
              }}>

            </TouchableOpacity>
            {darkThemeActivator ? (
              <TouchableOpacity
                onPress={() => {
                  changeTheme();
                  console.log('darkthemeactivator', darkThemeActivator);
                }}>
                <Icons.Entypo
                  name="light-up"
                  color={AppColors.black}
                  size={wp('6%')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  changeTheme();
                  console.log('darkthemeactivator', darkThemeActivator);
                }}>
                <Icons.Ionicons
                  name="moon-sharp"
                  color={AppColors.black}
                  size={wp('6%')}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatBot');
              }}>
              <BotIcon />
            </TouchableOpacity>
          </View>
        </View>

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
      </View>
    </View>
  );
};
export default AppHeader;
