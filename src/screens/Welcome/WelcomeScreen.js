import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import WelcomeScreenStyles from '../../assets/styles/WelcomeScreenStyle/WelcomeScreenStyleSheet';
import Appcolors from '../../assets/colors/Appcolors';
const WelcomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Appcolors.white}}>
      <StatusBar backgroundColor={Appcolors.primary} />
      <View style={[WelcomeScreenStyles.TopView]}>
        <Text style={[WelcomeScreenStyles.HeadingText1]}>   ChatMe</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/imges/WelcomeScreenPic/welcomeScreen.png')}
          style={[WelcomeScreenStyles.ImageStyle]}
        />
      </View>
      <View>
        <Text style={[WelcomeScreenStyles.HeadingText2]}>
          Welcome to ChatMe
        </Text>
        <Text style={[WelcomeScreenStyles.Text]}>
          Be part of millions of people on ChatMe
        </Text>
        <Text style={[WelcomeScreenStyles.Text2]}>
          who connect securely with their contacts
        </Text>
        <TouchableOpacity style={[WelcomeScreenStyles.TouchableButton1]}>
          <Text style={[WelcomeScreenStyles.TouchableButton1Text]}>
            Register as new user
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[WelcomeScreenStyles.TouchableButton2]}>
          <Text style={[WelcomeScreenStyles.TouchableButton2Text]}>
            Login to existing account
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
