import React from 'react';
import {View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {Text} from 'react-native-paper';
import WelcomeScreenStyles from '../../assets/styles/WelcomeScreenStyle/WelcomeScreenStyleSheet';
import Appcolors from '../../assets/colors/Appcolors';
import Status_bar from '../../components/Headers/Status_bar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Appcolors.white}}>
      <Status_bar
        darkModeBgColor={'black'}
        lightModeBgColor={Appcolors.primary}
      />

      {/* *****************           HEADER OF WELCOME SCREEN   ************** */}
      <View style={[WelcomeScreenStyles.TopView]}>
        <View style={[WelcomeScreenStyles.TopInnerView1]}>
          <Image
            source={require('../../assets/imges/WelcomeScreenPic/logo.png')}
            style={[WelcomeScreenStyles.LogoImageStyle]}
          />
          <Text style={[WelcomeScreenStyles.HeadingText1]}> ChatMe</Text>
        </View>

        <View style={[WelcomeScreenStyles.TopInnerView2]}>
          <TouchableOpacity
            style={[WelcomeScreenStyles.TopInnerView2Touchable]}>
            <FontAwesome
              name="language"
              color={Appcolors.primary}
              style={[WelcomeScreenStyles.iconStyle]}
            />
            <Text style={[WelcomeScreenStyles.TouchableText1]}>EN</Text>
          </TouchableOpacity>
        </View>
      </View>

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
        <TouchableOpacity style={[WelcomeScreenStyles.TouchableButton2]}
        onPress={() => {
          navigation.navigate('LogInScreen');
        }}>
          <Text style={[WelcomeScreenStyles.TouchableButton2Text]}>
            Login to existing account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
