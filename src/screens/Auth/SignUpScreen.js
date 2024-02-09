import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import SignUpStyleSheet from '../../assets/styles/AuthStyleSheet/SignUpStyleSheet/SignUpStyleSheet';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Snackbar } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';
import TranslationFile from '../../assets/translation/TranslationFile';
import AppContext from '../../context/AppContext';
import FontStyle from '../../assets/styles/FontStyle';
import { ThemeContext } from '../../context/ThemeContext';
// import UseScreenFocus from '../../components/HelperFunctions/AutoRefreshScreen/UseScreenFocus';
import messaging from '@react-native-firebase/messaging';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
const SignUpScreen = ({ navigation }) => {
  const { language, baseUrl, updateCurrentUser, storeImageUri, getToken, storeLoggedinStatus, getStoredUserDetails } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext);

  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  const btnColor = AppColors.white

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  const [alreadyExist, setAlreadyExist] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const showSnackbar = message => {
    setSnackbarMessage(message);
    setVisible(true);
  };
  // UseScreenFocus(getStoredUserDetails)
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
  const getFcmToken = async () => {
    // Get the FCM token when the component mounts (app starts or user logs in)
    await messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token***&&&&&&&&&&&&&&&&&&&&&&&:', token);
        setFcmToken(token); // Set the fcmToken state
        // Send this token to your backend to associate it with the user.
      }).catch((err) => {
        console.log('err in FCM Token login***&&&&&&&&&&&&&&&&&&&&&&&:', err);

      })
  }
  useEffect(() => {
    getFcmToken()
  }, []);

  const handleSignUp = ({ navigation }) => {
    const formdata = new FormData();
    formdata.append('phoneNo', `+${countryCode}${phoneNumber}`);
    formdata.append('password', password);
    formdata.append('fcmToken', fcmToken);
    formdata.append('country', selectedCountry.name);

    axios({
      method: 'post',
      url: `${baseUrl}/signup`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if (response.data.save === true) {
          console.log('respose signup vala', response.data);
          const uId = response.data.newUser._id;
          console.log('type of', typeof uId);
          // console.log("asyncSignup",AsyncStorage.setItem('user', uId))

          if (response.data.newUser === "A user with the same phone number already exists.") {
            setErrorMessage(true)
            setAlreadyExist(response.data.newUser)
          } else {
            storeImageUri('')
            console.log("signup res token", response.data.token)
            updateCurrentUser({ userId: response.data.newUser._id, phoneNumber: response.data.newUser.phoneNo })
            AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true))
            AsyncStorage.setItem('Id', response.data.newUser._id)
            AsyncStorage.setItem('phoneNo', response.data.newUser.phoneNo)
            AsyncStorage.setItem('token', response.data.token);
            getToken()
            AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(false))
            const isSignupProccessComplete = AsyncStorage.getItem('isSignupProccessComplete')

            console.log("signup isSignupProccessComplete", isSignupProccessComplete)

            // getStoredUserDetails()
            // storeLoggedinStatus(true)
            navigation.replace('AfterSignUpProfileScreen');

          }
        } else {
          alert('Account cannot be created! Please try again later.');
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  //   )
  // }
  // AsyncStorage.removeItem("user")
  useEffect(() => {
    setSelectedCountry({ cca2: 'PK', callingCode: '92', name: 'Pakistan' });
    setCountryCode('92');
  }, []);

  return (
    <View style={SignUpStyleSheet.container(theme.backgroundColor)}>
      <Primary_StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={SignUpStyleSheet.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../assets/imges/AuthScreenPictures/SignUpPic/SignUpPic.png')}
            style={[SignUpStyleSheet.image]}
          />
          <Text style={LogInStyleSheet.title(maintextColor)}>
            {TranslationFile[language].Create_Account}
          </Text>
          <View style={[SignUpStyleSheet.countryContainer]}>
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

          <View style={[SignUpStyleSheet.phoneNumberContainer]}>
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
          {errorMessage && (
            <Text
              style={{
                color: AppColors.red,
                marginBottom: hp('1%'),
                marginTop: hp('-1%'),
              }}>
              {alreadyExist}
            </Text>
          )}

          <View style={[SignUpStyleSheet.passwordContainer]}>
            <TextInput
              style={LogInStyleSheet.passwordInput(secondaryTextColor)}
              secureTextEntry={passwordVisible}
              placeholder={TranslationFile[language].Password}
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
              placeholderTextColor={AppColors.gray}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={LogInStyleSheet.passwordIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss;
              if ((phoneNumber == '') & (password == '')) {
                setPasswordSnackWidth(!false);
                showSnackbar(
                  TranslationFile[language].Enter_Phone_Number_and_Password,
                );
                return;
              }
              if (!isValidPhoneNumber()) {
                if (phoneNumber === '') {
                  setPasswordSnackWidth(!false);
                  showSnackbar(
                    TranslationFile[language].Phone_number_must_not_be_empty,
                  );
                  return;
                } else {
                  setPasswordSnackWidth(!true);
                  showSnackbar(
                    TranslationFile[language].Phone_number_is_not_valid,
                  );
                  return;
                }
              }
              if (password.length < 8) {
                if (password === '') {
                  setPasswordSnackWidth(!false);
                  showSnackbar(
                    TranslationFile[language].Password_must_not_be_empty,
                  );
                  return;
                } else {
                  setPasswordSnackWidth(!false);
                  showSnackbar(
                    TranslationFile[language]
                      .Password_contain_atLeast_8_character,
                  );

                  if (!specialCharRegex.test(password)) {
                    setPasswordSnackWidth(!false);
                    showSnackbar(
                      TranslationFile[language]
                        .Password_must_contain_at_least_one_special_character,
                    );
                    return;
                  }

                  return;
                }
              } else {
                if (!specialCharRegex.test(password)) {
                  setPasswordSnackWidth(!false);
                  showSnackbar(
                    TranslationFile[language]
                      .Password_must_contain_at_least_one_special_character,
                  );
                  return;
                } else {
                  handleSignUp({ navigation });
                }
              }

              // handleSubmit();
            }}
            style={[SignUpStyleSheet.TouchableButtonStyle]}>
            <Text style={LogInStyleSheet.TouchableTextStyle(btnColor)}>
              {TranslationFile[language].Next}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: wp('3%') }}>
            <Text style={{ fontFamily: FontStyle.regularFont, color: maintextColor }}>Have an account?{' '}</Text>
            <TouchableOpacity onPress={() => {
              navigation.replace('LogInScreen')
            }}><Text style={{ color: AppColors.primary, fontFamily: FontStyle.mediumFont }}>Login</Text></TouchableOpacity>

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
        <Text style={[SignUpStyleSheet.text]}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};
export default SignUpScreen;
