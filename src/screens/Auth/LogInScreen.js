import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
import Status_bar from '../../components/Headers/Status_bar';
import AppColors from '../../assets/colors/Appcolors';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {Snackbar} from 'react-native-paper';

// import Snackbar from 'react-native-snackbar';
const LogInScreen =()=>{
    const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visible, setVisible] = useState(false);
//   const [passwordSnackWidth, setPasswordSnackWidth] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setVisible(true);
  };

  const phoneNumberUtil = PhoneNumberUtil.getInstance();

  const isValidPhoneNumber = () => {
    try {
      const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        phoneNumber,
        selectedCountry?.cca2
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
    setSelectedCountry({cca2: 'PK', callingCode: '92'});
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

      <TextInput
        style={[LogInStyleSheet.passwordInput]}
        secureTextEntry
        placeholder="Password"
        onChangeText={text => setPassword(text)}
      />

<Snackbar
    visible={visible}
    onDismiss={() => setVisible(false)}
    duration={2000}
    style={
    //    passwordSnackWidth === true
    //       ?  { backgroundColor: 'skyblue', width: 290, height: 30, marginBottom: 70 ,alignSelf:'center'}
        //   :
          { backgroundColor: '#D3D3D3', width: 290, height: 30, marginBottom: 70 ,alignSelf:'center'}
      }
  >
    <Text>{snackbarMessage}</Text>
  </Snackbar>
      <TouchableOpacity
        onPress={() => {
          if (!isValidPhoneNumber()) {
            showSnackbar('Phone number is not valid')
            return;
          }
          if(password.length< 8){
            // setPasswordSnackWidth(!false)
            showSnackbar('Password contain atLeast 8 character')
            return;
          }
          else{
            navigation.navigate('DrawerScreens')
          }
        
          // handleSubmit();
          // handleSignUp({navigation})
        }}
        style={[LogInStyleSheet.TouchableButtonStyle]}>
        <Text style={[LogInStyleSheet.TouchableTextStyle]}>LogIn</Text>
      </TouchableOpacity>
    </View>
  )
}
export default LogInScreen;