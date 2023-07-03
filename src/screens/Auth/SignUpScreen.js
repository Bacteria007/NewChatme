import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StatusBar} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import SignUpStyleSheet from '../../assets/styles/AuthStyleSheet/SignUpStyleSheet/SignUpStyleSheet';
import Status_bar from '../../components/Headers/Status_bar';
import AppColors from '../../assets/colors/Appcolors';

const SignUpScreen = (navigation) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode);
  };

  const handleSignUp = ({navigation}) => {
    // Handle sign up logic here
    console.log('Phone Number:', phoneNumber);
    console.log('Country Code:', countryCode);
    navigation.navigate('TabScreen')
  };
  useEffect(() => {
    // Set default country as Pakistan
    setSelectedCountry({cca2: 'PK', callingCode: '92'});
    setCountryCode('92');
  }, []);

  return (
    <View style={[SignUpStyleSheet.container]}>
           <Status_bar darkModeBgColor={"black"} lightModeBgColor={AppColors.primary}/>

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
        onPress={()=>handleSignUp(navigation)}
        style={[SignUpStyleSheet.TouchableButtonStyle]}>
        <Text style={[SignUpStyleSheet.TouchableTextStyle]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;
