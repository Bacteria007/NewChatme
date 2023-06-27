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
import Status_bar from '../../components/Headers/Status_bar';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Appcolors.white}}>
     <Status_bar darkModeBgColor={"black"} lightModeBgColor={Appcolors.white}/>
      <View style={[WelcomeScreenStyles.TopView]}>
        <Text style={[WelcomeScreenStyles.HeadingText1]}> ChatMe</Text>
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
          <Text
            style={[WelcomeScreenStyles.TouchableButton1Text]}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
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
