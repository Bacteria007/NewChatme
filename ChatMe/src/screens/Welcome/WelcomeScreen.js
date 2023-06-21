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
const WelcomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#BA68C8" />
      <View style={[WelcomeScreenStyles.TopView]}>
        <Text style={[WelcomeScreenStyles.HeadingText1]}>ChatMe</Text>
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
        <TouchableOpacity>
          {/* <Text>
            Register as new user
            </Text> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
