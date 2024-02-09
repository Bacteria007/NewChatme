import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import MenuLeftBlack from '../../../assets/imges/headericons/menuLeftBlack.svg';
import MenuLeftWhite from '../../../assets/imges/headericons/menuLeftWhite.svg';
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import BotChatHeaderStyle from '../../../assets/styles/BotStyleSheet/BotChatHeaderStyle';
import { Primary_StatusBar } from '../../statusbars/Primary_StatusBar';
import { SearchBar } from '@rneui/base';
import FontStyle from '../../../assets/styles/FontStyle';
import { Badge, Searchbar, TouchableRipple } from 'react-native-paper';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppHeader = ({
  navigation,
  waitingReqC,
  headerTitle,
  searchQuery,
  handleSearchOnChange,
}) => {
  const {
    updateTheme,
    theme,
    darkThemeActivator,
    changeThemeState,
    setLightTheme,
    setDarkTheme,
  } = useContext(ThemeContext);

  const rippleColor = 'rgba(0,0,0,0.2)';

  return (
    <View>
      <View style={AppHeaderStyle.mainHeader(theme.headerColor)}>
        <View style={[AppHeaderStyle.headerView]}>
          <View style={AppHeaderStyle.drawerAndName_Container}>
            <TouchableOpacity
              activeOpacity={0.1}
              style={AppHeaderStyle.rippleBtn}
              // touchSoundDisabled={false}
              // rippleColor={rippleColor}
              // borderless
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              {darkThemeActivator ? <MenuLeftWhite /> : <MenuLeftBlack />}
            </TouchableOpacity>
            <Text
              style={[
                AppHeaderStyle.appNameStyle,
                { color: theme.headerIconsColor },
              ]}>
              {headerTitle}
            </Text>
            <View>
              {headerTitle == 'People' ? (
                <TouchableOpacity
                  rippleColor={rippleColor}
                  style={AppHeaderStyle.rippleBtn}
                  borderless
                  onPress={() => {
                    navigation.navigate('SettingStack', { screen: 'Requests' });
                  }}>
                  {/* <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont, fontSize: 11 }}>Requests</Text> */}
                  <Icons.FontAwesome5
                    name="user-friends"
                    color={theme.headerIconsColor}
                    size={wp('4%')}
                  />
                  {waitingReqC > -1 && (
                    <Badge
                      size={wp('3.7%')} // Customize the width of the badge
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: AppColors.purple,
                        // height:hp('4'),
                        textAlign: 'center',
                        alignItems: 'center',
                        marginHorizontal: wp('1.2'),
                        marginVertical: wp('1.2')
                      }}>

                      <Text
                        style={{
                          color: 'white',
                          fontFamily: FontStyle.mediumFont,
                          textAlign: 'center',
                        }}>
                        {waitingReqC}
                      </Text>
                    </Badge>


                  )}

                </TouchableOpacity>
              ) : darkThemeActivator ? (
                <TouchableRipple
                  rippleColor={rippleColor}
                  style={AppHeaderStyle.rippleBtn}
                  borderless
                  onPress={() => {
                    setLightTheme();
                  }}>
                  <Icons.Entypo
                    name="light-up"
                    color={theme.headerIconsColor}
                    size={wp('6%')}
                  />
                </TouchableRipple>
              ) : (
                <TouchableRipple
                  rippleColor={rippleColor}
                  style={AppHeaderStyle.rippleBtn}
                  borderless
                  onPress={() => {
                    setDarkTheme();
                  }}>
                  <Icons.Ionicons
                    name="moon-sharp"
                    color={theme.headerIconsColor}
                    size={wp('6%')}
                  />
                </TouchableRipple>
              )}
            </View>
          </View>
        </View>
        {/* <Searchbar style={{height:hp('6'),width:wp('92'),justifyContent:'center',alignItems:'center'}} placeholder='Search' clearIcon={<Icons.AntDesign name='close' size={20} />} inputStyle={{color:'red',textAlignVertical:'center',marginBottom:20}}/> */}
        <SearchBar
          lightTheme
          onChangeText={handleSearchOnChange} // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY
          value={searchQuery} // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
          elevation={0}
          underlineColorAndroid={'transparent'}
          placeholder={`Search`}
          placeholderTextColor={theme.headerSearchText} //light
          round
          showCancel
          containerStyle={[AppSubHeaderStyle.container(theme.headerColor)]}
          inputContainerStyle={[
            AppSubHeaderStyle.inputContainer,
            { backgroundColor: theme.headerSearchBar },
          ]}
          // inputContainerStyle={[AppSubHeaderStyle.inputContainer, { backgroundColor:AppColors.tab}]}
          inputStyle={{ color: theme.headerSearchText }}
          searchIcon={{ color: theme.headerSearchText, size: 20 }}
          clearIcon={{ color: theme.headerSearchText }}
          leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
          rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};
export default AppHeader;
