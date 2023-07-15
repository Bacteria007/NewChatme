import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
import Status_bar from '../../components/statusbars/Primary_StatusBar';
import AppColors from '../../assets/colors/Appcolors';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Snackbar } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';

const LogInScreen = ({ navigation }) => {
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

  useEffect(() => {
    // Set default country as Pakistan
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
  }, []);

  return (
    <View style={[LogInStyleSheet.container]}>
      <Status_bar
        darkModeBgColor={'black'}
        lightModeBgColor={AppColors.primary}
      />

      <Image
        source={require('../../assets/imges/AuthScreenPictures/LOgInPic/LogInPic.png')}
        style={[LogInStyleSheet.image]}
      />
      <Text style={[LogInStyleSheet.title]}>LogIn to Continue!</Text>
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
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!passwordVisible);
          }}>
          <Icons.Feather
            name={passwordVisible === true ? 'eye-off' : 'eye'}
            style={[LogInStyleSheet.passwordIcon]}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={[LogInStyleSheet.forgotpasswordText]}>Forgot Password?</Text> */}
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
        <Text style={[LogInStyleSheet.text]}>{snackbarMessage}</Text>
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
        style={[LogInStyleSheet.TouchableButtonStyle]}>
        <Text style={[LogInStyleSheet.TouchableTextStyle]}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LogInScreen;
