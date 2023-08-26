import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import WelcomeScreenStyles from '../../assets/styles/WelcomeScreenStyle/WelcomeScreenStyleSheet';
import Appcolors from '../../assets/colors/Appcolors';
import {Primary_StatusBar} from '../../components/statusbars/Primary_StatusBar';
import TranslationFile from '../../assets/translation/TranslationFile.js';
import AppContext from '../../context/AppContext';
import AppColors from '../../assets/colors/Appcolors';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { Icons } from '../../assets/Icons';
import { launchImageLibrary } from 'react-native-image-picker';

const WelcomeScreen = ({ navigation }) => {
  const { language } = useContext(AppContext);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const openImagePicker = () => {
    launchImageLibrary({
      maxWidth: 800,
      maxHeight: 800,
    }, response => {
      if (response.assets && response.assets[0]) {
        setSelectedImageUri(response.assets[0].uri);
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Appcolors.white }}>
      <Primary_StatusBar/>

      {/* *****************           HEADER OF WELCOME SCREEN   ************** */}
      <View style={[WelcomeScreenStyles.TopView]}></View>

      {/* *****************           WELCOME SCREEN IMAGE       *************** */}

      <View>
        <Image
          source={require('../../assets/imges/WelcomeScreenPic/welcomeScreen.png')}
          style={[WelcomeScreenStyles.ImageStyle]}
        />
      </View>

      {/* *****************           VIEW WITH TEXT AND TOUCHABLE BUTTONS   ************** */}
      <View>
        <Text style={[WelcomeScreenStyles.HeadingText2]}>
          {TranslationFile[language].Welcome_to_ChatMe}
        </Text>
        <Text style={[WelcomeScreenStyles.Text]}>
          {TranslationFile[language].Be_part_of_millions_of_people_on_ChatMe}
        </Text>
        <Text style={[WelcomeScreenStyles.Text2]}>
          {TranslationFile[language].who_connect_securely_with_their_contacts}

        </Text>
        <TouchableOpacity style={[WelcomeScreenStyles.TouchableButton1]}>
          <Text
            style={[WelcomeScreenStyles.TouchableButton1Text]}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            {TranslationFile[language].Register_as_new_user}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[WelcomeScreenStyles.TouchableButton2]}
          onPress={() => {
            navigation.navigate('LogInScreen');
          }}>
          <Text style={[WelcomeScreenStyles.TouchableButton2Text]}>
            {TranslationFile[language].Login_to_existing_account}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
