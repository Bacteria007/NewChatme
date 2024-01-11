import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import AppColors from '../../assets/colors/Appcolors';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Snackbar } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import FontStyle from '../../assets/styles/FontStyle';
import { initializeZego } from '../../helpers/ZegoCloudFunction/ZegoInitFunction';
import { ThemeContext } from '../../context/ThemeContext';
import UseScreenFocus from '../../helpers/AutoRefreshScreen/UseScreenFocus';
import messaging from '@react-native-firebase/messaging';

const LogInScreen = ({ navigation }) => {

  const { baseUrl, getToken, updateCurrentUser, storeLoggedinStatus } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();


  // UseScreenFocus(getStoredUserDetails)
  UseScreenFocus(initializeZego)

  const getFcmToken = async () => {
    // Get the FCM token when the component mounts (app starts or user logs in)
    await messaging()
      .getToken()
      .then(token => {
        setFcmToken(token); // Set the fcmToken state
        // Send this token to your backend to associate it with the user.
      }).catch((err) => {
        console.log('err is', err);

      })
  }
  useEffect(() => {
    getFcmToken()
  }, []);


  const showSnackbar = message => {
    setSnackbarMessage(message);
    setVisible(true);
  };

  const isValidPhoneNumber = () => {
    try {
      const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        phoneNumber,
        selectedCountry?.cca2,
      );
      return phoneNumberUtil.isValidNumber(parsedPhoneNumber);
    } catch (error) {
      return false;
    }
  };

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode);
  };

  const userLogin = ({ navigation }) => {
    const formdata = new FormData();
    formdata.append('phoneNo', phoneNumber);
    formdata.append('password', password);
    formdata.append('fcmToken', fcmToken);
    axios({
      method: 'post',
      url: `${baseUrl}/login`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if (response.data.match == true) {

          console.log("login", response.data)
          let res = response.data.loggedInUser
          updateCurrentUser({ userId: res._id, phoneNumber: res.phoneNo, profileImage: res.profileImage, name: res.name, fcmToken: fcmToken })
          // AsyncStorage.setItem('user', JSON.stringify({ userId: res._id, phoneNumber: res.phoneNo, profileImage: res.profileImage, name: res.name,fcmToken:fcmToken }))
          AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true))
          AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(true))
          console.log("login token", response.data.token)
          AsyncStorage.setItem('token', response.data.token);
          AsyncStorage.setItem('profileImage', res.profileImage)
          AsyncStorage.setItem('name', res.name)
          AsyncStorage.setItem('Id', res._id)
          AsyncStorage.setItem('fcmToken', fcmToken)
          AsyncStorage.setItem('phoneNo', res.phoneNo)
          getToken()
          // storeLoggedinStatus(true)
          // getStoredUserDetails()
          // console.log("async login", storedUser)
          initializeZego(res._id, res.name);
          navigation.replace("DrawerStack");
        }
        else {

          if (response.data.message === 'Invalid phone number or password') {
            alert('Invalid phone number or password');
          } else {
            alert(
              'There was an issue in logging in,try again',
              'No user found with this phone number or password',
            );
          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
  }, []);

  return (
    <View style={LogInStyleSheet.container(theme.backgroundColor)}>
      <Primary_StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={LogInStyleSheet.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={LogInStyleSheet.contentContainer}>
            <Image
              source={require('../../assets/imges/AuthScreenPictures/LOgInPic/login4.png')}
              style={[LogInStyleSheet.image]}
            />
            <Text style={[LogInStyleSheet.title]}>LogIn to Continue!</Text>
          </View>
          <View style={[LogInStyleSheet.countryContainer]}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withCallingCode
              countryCode={selectedCountry?.cca2}
              onSelect={handleCountrySelect}
            // translation="eng"
            />
          </View>

          <View style={[LogInStyleSheet.phoneNumberContainer]}>
            <Text style={[LogInStyleSheet.countryCode]}>+{countryCode}</Text>
            <TextInput
              style={[LogInStyleSheet.phoneNumberInput]}
              placeholder="Phone Number"
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="numeric"
              maxLength={15}
              value={phoneNumber}
            />
          </View>

          <View style={[LogInStyleSheet.passwordContainer]}>
            <TextInput
              style={[LogInStyleSheet.passwordInput]}
              secureTextEntry={passwordVisible}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={[LogInStyleSheet.passwordIcon]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('85') }}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("SettingStack",{screen:"ForgetPassword"});
              }}>
              <Text style={[LogInStyleSheet.forgotpasswordText]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if ((phoneNumber == '') & (password == '')) {
                setPasswordSnackWidth(!false);
                showSnackbar('Enter Phone Number and Password');
                return;
              }

              if (!isValidPhoneNumber()) {
                if (phoneNumber === '') {
                  setPasswordSnackWidth(!false);
                  showSnackbar('Phone number must not be empty');
                  return;
                } else {
                  setPasswordSnackWidth(!true);
                  showSnackbar('Phone number is not valid');
                  return;
                }
              }
              if (password.length < 8) {
                if (password === '') {
                  setPasswordSnackWidth(!false);
                  showSnackbar('Password must not be empty');
                  return;
                } else {
                  setPasswordSnackWidth(!false);
                  showSnackbar('Password contain atLeast 8 character');
                  return;
                }
              } else {
                console.log('clicked');
                userLogin({ navigation });
                // navigation.replace("DrawerStack");
              }


              // handleSubmit();
              // handleSignUp({navigation})
            }}
            style={[LogInStyleSheet.TouchableButtonStyle]}>
            <Text style={[LogInStyleSheet.TouchableTextStyle]}>LogIn</Text>
          </TouchableOpacity>
          <View style={LogInStyleSheet.signupLineContainer}>
            <Text style={{ fontFamily: FontStyle.mediumFont }}>Don't have an account?{' '}</Text>
            <TouchableOpacity onPress={() => {
              navigation.replace("AuthStack",{screen:"SignUpScreen"})
            }}>
              <Text style={{ color: AppColors.primary, fontFamily: FontStyle.mediumFont }}>Signup</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={
          passwordSnackWidth === true
            ? {
              backgroundColor: '#D3D3D3',
              width: wp('80'),
              marginBottom: hp('6'),
              alignSelf: 'center',
            }
            : {
              backgroundColor: '#D3D3D3',
              width: wp('55'),
              marginBottom: hp('6'),
              alignSelf: 'center',
            }
        }>
        <Snackbar>
          <Text style={[LogInStyleSheet.text]}>{snackbarMessage}</Text>
        </Snackbar>
      </View>
    </View>
  );
};
export default LogInScreen;
