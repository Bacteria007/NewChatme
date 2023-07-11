import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import SignUpStyleSheet from '../../assets/styles/AuthStyleSheet/SignUpStyleSheet/SignUpStyleSheet';
import Status_bar from '../../components/Headers/Status_bar';
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

const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();

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
    axios({
      method: 'post',
      url: 'http://192.168.10.14:8888/signup',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if (response.data.save === true) {
          AsyncStorage.setItem('user', JSON.stringify(response.data.newUser));
          navigation.navigate('DrawerScreens');
        } else {
          alert('Account cannot be created!Please try again later.');
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

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

      <Image
        source={require('../../assets/imges/AuthScreenPictures/SignUpPic/SignUpPic.png')}
        style={[SignUpStyleSheet.image]}
      />
      <Text style={[SignUpStyleSheet.title]}>Enter Your Phone Number</Text>
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
          placeholder="Phone Number"
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
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!passwordVisible);
          }}>
          <Icons.Feather
            name={passwordVisible === true ? 'eye-off' : 'eye'}
            style={[SignUpStyleSheet.passwordIcon]}
          />
        </TouchableOpacity>
      </View>
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
            navigation.navigate('DrawerScreens');
          }

          // handleSubmit();
          // handleSignUp({navigation})
        }}
        style={[SignUpStyleSheet.TouchableButtonStyle]}>
        <Text style={[SignUpStyleSheet.TouchableTextStyle]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;
