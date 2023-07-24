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
import Status_bar from '../../components/statusbars/Primary_StatusBar';
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
import RNFS, { read } from 'react-native-fs';

const SignUpScreen = ({ navigation }) => {
  const { language,baseUrl,storeLoggedinStatus } = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();


  // Regular expression to check for special characters
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

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

  const handleSignUp = ({ navigation }) => {

    const formdata = new FormData();
    formdata.append('name', '');
    formdata.append('phoneNo', phoneNumber);
    formdata.append('password', password);
    // formdata.append('avatar', base64Image);
  
    axios({
      method: 'post',
      url: `${baseUrl}/signup`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if (response.data.save === true) {
          console.log("respose aya",response.data)
          const uId=response.data.newUser._id
          console.log("type of",typeof uId)
          // console.log("asyncSignup",AsyncStorage.setItem('user', uId))
          AsyncStorage.setItem('user', JSON.stringify(response.data.newUser._id))
          storeLoggedinStatus(true)
          .then(() => {
            console.log('User ID stored successfully:', response.data.newUser);
            navigation.navigate('DrawerScreens');
          })
          .catch((error) => {
            console.log('Error while storing user ID:', error);
            navigation.navigate('DrawerScreens'); // Navigate even if there's an error (you may handle it differently as per your app's logic)
          });
      } else {
        alert('Account cannot be created! Please try again later.');
      }
    })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
//   )
// }

  useEffect(() => {
    // Set default country as Pakistan
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
  }, []);

  return (
    <View style={[SignUpStyleSheet.container]}>
      <Status_bar
        darkModeBgColor={'black'}
        lightModeBgColor={AppColors.primary}
      />
    

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
          <View style={[SignUpStyleSheet.countryContainer]}>
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

          <View style={[SignUpStyleSheet.phoneNumberContainer]}>
            <Text style={[SignUpStyleSheet.countryCode]}>+{countryCode}</Text>
            <TextInput
              style={[SignUpStyleSheet.phoneNumberInput]}
              placeholder={TranslationFile[language].Phone_Number}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="numeric"
              maxLength={15}
              value={phoneNumber}
            />
          </View>

          <View style={[SignUpStyleSheet.passwordContainer]}>
            <TextInput
              style={[SignUpStyleSheet.passwordInput]}
              secureTextEntry={passwordVisible}
              placeholder={TranslationFile[language].Password}
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
                    showSnackbar(TranslationFile[language].Password_must_contain_at_least_one_special_character);
                    return;
                  }

                  return;

                }
              } else {
                navigation.replace('AfterSignUpProfileScreen');
              }

              // handleSubmit();
              handleSignUp({navigation})
            }}
            style={[SignUpStyleSheet.TouchableButtonStyle]}>
            <Text style={[SignUpStyleSheet.TouchableTextStyle]}>
              {TranslationFile[language].Next}
            </Text>
          </TouchableOpacity>
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
