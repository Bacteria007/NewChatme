import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import SignUpStyleSheet from '../../assets/styles/AuthStyleSheet/SignUpStyleSheet/SignUpStyleSheet';

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode);
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log('Phone Number:', phoneNumber);
    console.log('Country Code:', countryCode);
  };
  useEffect(() => {
    // Set default country as Pakistan
    setSelectedCountry({cca2: 'PK', callingCode: '92'});
    setCountryCode('92');
  }, []);

  return (
    <View style={[SignUpStyleSheet.container]}>
      <Image
        source={require('../../assets/imges/AuthScreenPictures/SignUpPic/logo.png')}
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
        <Text style={[SignUpStyleSheet.countryCode]}>{countryCode}</Text>
        <TextInput
          style={[SignUpStyleSheet.phoneNumberInput]}
          placeholder="Phone Number"
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="numeric"
          maxLength={15}
          
        />
      </View>

      <TextInput
        style={[SignUpStyleSheet.passwordInput]}
        secureTextEntry
        placeholder="Password"
      />

      <TouchableOpacity
        title="Next"
        onPress={handleSignUp}
        style={[SignUpStyleSheet.TouchableButtonStyle]}>
        <Text style={[SignUpStyleSheet.TouchableTextStyle]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;
