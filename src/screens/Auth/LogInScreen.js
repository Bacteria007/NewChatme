import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
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
import TranslationFile from '../../assets/translation/TranslationFile';

const LogInScreen = ({ navigation }) => {

  const { baseUrl, getToken, updateCurrentUser, storeLoggedinStatus, language } = useContext(AppContext)
  const { theme, darkThemeActivator, toggleTheme } = useContext(ThemeContext)
  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  const btnColor = AppColors.white

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();

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
    // formdata.append('phoneNo', `${phoneNumber}`);
    formdata.append('phoneNo', `+${countryCode}${phoneNumber}`);
    formdata.append('password', password);
    formdata.append('fcmToken', fcmToken);
    axios({
      method: 'post',
      url: `${baseUrl}/login`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(async function (response) {
        console.log("login res", response)
        if (response.data.match === true) {

          console.log("login", response.data)
          let res = response.data.loggedInUser
          updateCurrentUser({ userId: res._id, phoneNumber: res.phoneNo, profileImage: res.profileImage, name: res.name, fcmToken: fcmToken })
          // AsyncStorage.setItem('user', JSON.stringify({ userId: res._id, phoneNumber: res.phoneNo, profileImage: res.profileImage, name: res.name,fcmToken:fcmToken }))
          await AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true))
          await AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(true))
          console.log("login token", response.data.token)
          await AsyncStorage.setItem('token', response.data.token);
          { res?.profileImage != null || undefined ? await AsyncStorage.setItem('profileImage', res.profileImage) : await AsyncStorage.setItem('profileImage', '') }
          await AsyncStorage.setItem('name', res.name)
          await AsyncStorage.setItem('Id', res._id)
          await AsyncStorage.setItem('fcmToken', fcmToken)
          await AsyncStorage.setItem('phoneNo', res.phoneNo)
          getToken()
          // storeLoggedinStatus(true)
          // getStoredUserDetails()
          // console.log("async login", storedUser)
          initializeZego(res._id, res.name);
          navigation.replace("DrawerStack");
        }
        else {
          if (response.data.match == false && response.data.message === "Account_blocked_by_admin") {
            Alert.alert(TranslationFile[language].Account_blocked_by_admin)
          }
          else if (response.data.message === 'User_not_found') {
            Alert.alert(TranslationFile[language].User_not_found);
          } else if (response.data.message === 'Invalid_password') {
            Alert.alert(TranslationFile[language].Invalid_password);
          }
          else {
            Alert.alert(TranslationFile[language].An_error_occurred);

          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    setSelectedCountry({ cca2: 'PK', callingCode: '92', name: 'Pakistan' });
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
              style={LogInStyleSheet.image}
            />
            <Text style={LogInStyleSheet.title(maintextColor)}>{TranslationFile[language].LogIn_to_Continue}</Text>
          </View>
          <View style={LogInStyleSheet.countryContainer}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withCallingCode
              countryCode={selectedCountry?.cca2}
              onSelect={handleCountrySelect}
              theme={{ onBackgroundTextColor: secondaryTextColor }}
            // translation="eng"

            />
          </View>

          <View style={[LogInStyleSheet.phoneNumberContainer]}>
            <Text style={LogInStyleSheet.countryCode(secondaryTextColor)}>+{countryCode}</Text>
            <TextInput
              style={LogInStyleSheet.phoneNumberInput(secondaryTextColor)}
              placeholder={TranslationFile[language].Phone_Number}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="numeric"
              maxLength={15}
              value={phoneNumber}
              placeholderTextColor={AppColors.gray}

            />
          </View>

          <View style={[LogInStyleSheet.passwordContainer]}>
            <TextInput
              style={LogInStyleSheet.passwordInput(secondaryTextColor)}
              secureTextEntry={passwordVisible}
              placeholder= {TranslationFile[language].Password}
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
              placeholderTextColor={AppColors.gray}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye-off' : 'eye'}
                style={LogInStyleSheet.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: wp('85') }}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("SettingStack", { screen: "ForgetPassword" });
              }}>
              <Text style={[LogInStyleSheet.forgotpasswordText(maintextColor)]}>
              {TranslationFile[language].ForgetPassword}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if ((phoneNumber == '') && (password == '')) {
                setPasswordSnackWidth(!false);
                showSnackbar('Enter Phone Number and Password');
                return;
              }

              if (password == '') {
                setPasswordSnackWidth(!false);
                showSnackbar('Enter password');
                return;
              }
              if (phoneNumber == '') {
                setPasswordSnackWidth(!false);
                showSnackbar('Enter Phone Number');
                return;
              }
              if (phoneNumber.startsWith('0')) {
                showSnackbar(TranslationFile[language].phone_should_not_start_with_zero)
                return
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
              // Ye instruction signup k waqt achi lagti hy yha i think zrorat nai ==> aqsa

              // if (password.length < 8) {
              //   if (password === '') {
              //     setPasswordSnackWidth(!false);
              //     showSnackbar('Enter Password');
              //     return;
              //   } else {
              //     setPasswordSnackWidth(!false);
              //     showSnackbar('Password contain atLeast 8 character');
              //     return;
              //   }
              // } 
              else {
                console.log('clicked');
                userLogin({ navigation });
                // navigation.replace("DrawerStack");
              }


              // handleSubmit();
              // handleSignUp({navigation})
            }}
            style={[LogInStyleSheet.TouchableButtonStyle]}>
            <Text style={LogInStyleSheet.TouchableTextStyle(btnColor)}>{TranslationFile[language].LogIn}</Text>
          </TouchableOpacity>
          <View style={LogInStyleSheet.signupLineContainer}>
            <Text style={{ fontFamily: FontStyle.regularFont, color: maintextColor }}>{TranslationFile[language].Don_have_an_account}{' '}</Text>
            <TouchableOpacity onPress={() => {
              navigation.replace("AuthStack", { screen: "SignUpScreen" })
            }}>
              <Text style={{ color: AppColors.primary, fontFamily: FontStyle.mediumFont, }}>{TranslationFile[language].Signup}</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Snackbar
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
        <Text style={LogInStyleSheet.text}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};
export default LogInScreen;
