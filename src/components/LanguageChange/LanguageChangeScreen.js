import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import InnerScreensHeader from '../Headers/InnerHeaders/InnerScreensHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
import LanguageChangeScreenStyleSheet from '../../assets/styles/LanguageChangeStyleSheet/LanguageChangeScreenStyleSheet';

const LanguageChangeScreen = ({navigation}) => {
  
  // USECONTEXT STATE
  const {storeLanguage} = useContext(AppContext);

  // ARRAY CONTAINONG MULTIPLE LANGUAGES
  const allLanguages = [
    {languageShortName: 'EN', languageName: 'English'},
    {languageShortName: 'UR', languageName: 'Urdu'},
  ];

  // FUNCTION FOR SELECTING LANGUAGE
  const handleLanguageSelect = selectedLanguage => {
    AsyncStorage.setItem('selectedLanguage', selectedLanguage) // Save the selected language to AsyncStorage
      .then(() => {
        storeLanguage(selectedLanguage);
      })
      .catch(error => {
        console.log('Error saving selected language:', error);
      });
  };

  //  FUNCTION WHICH DISPLAY UI  FOR FLATLIST
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[LanguageChangeScreenStyleSheet.languageButtonView]}
        onPress={() => {
          navigation.goBack();
          if (item.languageShortName === 'EN') {
            handleLanguageSelect('English');
          } else if (item.languageShortName === 'UR') {
            handleLanguageSelect('Urdu');
          } else {
            handleLanguageSelect('English');
          }
        }}>
        <View style={[LanguageChangeScreenStyleSheet.SmallView]}>
          <Text
            style={[LanguageChangeScreenStyleSheet.languageButtonSmallText]}>
            {item.languageShortName}
          </Text>
        </View>
        <View style={[LanguageChangeScreenStyleSheet.LargeView]}>
          <Text
            style={[LanguageChangeScreenStyleSheet.languageButtonLargeText]}>
            {item.languageName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[LanguageChangeScreenStyleSheet.Container]}>
      <InnerScreensHeader
        navigation={navigation}
        screenName="Select Language"
      />
      <FlatList data={allLanguages} renderItem={renderItem} />
    </View>
  );
};

export default LanguageChangeScreen;
