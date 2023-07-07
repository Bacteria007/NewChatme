import React, {useState, useEffect} from 'react';
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

const SignUpScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode);
  };

  const handleSignUp = ({navigation}) => {
    const formdata = new FormData();
    formdata.append('name', '');
    formdata.append('phoneNo', phoneNumber);
    formdata.append('password', password);
    axios({
      method: 'post',
      url: 'http://192.168.43.122:8888/signup',
      data: formdata,
      headers: {'Content-Type': 'multipart/form-data'},
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
    setSelectedCountry({cca2: 'PK', callingCode: '92'});
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
        />
      </View>

      <TextInput
        style={[SignUpStyleSheet.passwordInput]}
        secureTextEntry
        placeholder="Password"
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        onPress={() => 
          navigation.navigate('DrawerScreens')
          // handleSignUp({navigation})
        }
        style={[SignUpStyleSheet.TouchableButtonStyle]}>
        <Text style={[SignUpStyleSheet.TouchableTextStyle]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;
