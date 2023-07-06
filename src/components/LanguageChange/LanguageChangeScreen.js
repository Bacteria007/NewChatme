import React ,{useContext}from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import InnerScreensHeader from '../Headers/InnerHeaders/InnerScreensHeader';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';


const LanguageChangeScreen = ({navigation}) => {
  const {storeLanguage}  = useContext(AppContext);

  const handleLanguageSelect = (selectedLanguage) => {
    // Save the selected language to AsyncStorage
    AsyncStorage.setItem('selectedLanguage', selectedLanguage)
      .then(() => {
        storeLanguage(selectedLanguage);
        console.log('suucessfuly selected language:');
      })
      .catch((error) => {
        console.log('Error saving selected language:', error);
      });
  };


  return (
 
        
    <View style={{backgroundColor:AppColors.white,flex:1}}>
    <InnerScreensHeader navigation={navigation} screenName="Select Language" />
            <TouchableOpacity style={styles.languageButton} 
            onPress={() => {handleLanguageSelect('en'),
           navigation.goBack() 
          }
          }
          >
              <Text style={styles.languageButtonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageButton} 
            
            onPress={() =>{ handleLanguageSelect('ur')
             navigation.goBack() 
          }
            }
            >
              <Text style={styles.languageButtonText}>Urdu</Text>
            </TouchableOpacity>
           
          </View>
      
     
  );
};


const styles = StyleSheet.create({
  
    languageButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    languageButtonText: {
      fontSize: 16,
    },
    closeButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: 'red',
      borderRadius: 5,
      alignSelf: 'flex-end',
    },
    closeButtonText: {
      fontSize: 16,
      color: 'white',
    },
  });
export default LanguageChangeScreen;
