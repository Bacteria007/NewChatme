import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
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
import PhoneInput from "react-native-phone-number-input";

const SignUpScreen2 = ({ navigation }) => {
  const { language, baseUrl, updateCurrentUser, storeImageUri, getToken, } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [value, setValue] = useState("");
  const phoneInput = useRef(null);

  // Function to display a toast message
  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

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
  const handleSignUp = () => {
    const formdata = new FormData();
    formdata.append('phoneNo', value);
    formdata.append('password', password);
    formdata.append('fcmToken', fcmToken);

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
            navigation.navigate('AfterSignUpProfileScreen');
          }
        } else { alert('Account cannot be created! Please try again later.'); }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const checkPhone = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    console.log("ckvalid", checkValid)
    setValid(checkValid ? checkValid : false);

    if (value.startsWith("0")) {
      showToast("Invalid phone number. Remove leading zero.");
      return false
    }
    else if (value === '') {
      showToast("Please enter phone number")
      return false
    }
    else if (checkValid) {
      return true;

    }
  }
  const handleCheckButtonPress = () => {

    if (password === '') {
      showToast(TranslationFile[language].Password_must_not_be_empty)
      return;
    }
    else if (password.length < 8) {
      showToast(
        TranslationFile[language]
          .Password_contain_atLeast_8_character,
      );
    }
    else if (!specialCharRegex.test(password)) {
      showToast(
        TranslationFile[language]
          .Password_must_contain_at_least_one_special_character,
      );
      return;
    }

    else {
      handleSignUp();
    }
  }
  useEffect(() => {
    getFcmToken()
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
          <Text style={[SignUpStyleSheet.title]}>
            {TranslationFile[language].Enter_Your_Phone_Number}
          </Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withShadow
            autoFocus
          />

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
              style={[SignUpStyleSheet.passwordInput]}
              secureTextEntry={passwordVisible}
              placeholder={TranslationFile[language].Password}
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={[SignUpStyleSheet.passwordIcon]}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleCheckButtonPress}
            style={[SignUpStyleSheet.TouchableButtonStyle]}
          >
            <Text style={[SignUpStyleSheet.TouchableTextStyle]}>
              {TranslationFile[language].Next}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: wp('3%') }}>
            <Text style={{ fontFamily: FontStyle.mediumFont }}>Have an account?{' '}</Text>
            <TouchableOpacity onPress={() => {
              navigation.replace('LogInScreen')
            }}><Text style={{ color: AppColors.primary, fontFamily: FontStyle.mediumFont }}>Login</Text></TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
};
export default SignUpScreen2;