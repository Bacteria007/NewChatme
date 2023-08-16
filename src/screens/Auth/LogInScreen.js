import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import FontStyle from '../../assets/styles/FontStyle';

const LogInScreen = ({ navigation }) => {
  const {baseUrl,storeLoggedinStatus,storedUser,getStoredUserDetails}=useContext(AppContext)
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

  const userLogin = ({navigation})=>{
    const formdata = new FormData();
    formdata.append('phoneNo', phoneNumber);
    formdata.append('password', password);
    axios({
      method: 'post',
      url:  `${baseUrl}/login`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if(response.data.match == true)
        {
          console.log("login",response.data)
          let res=response.data.loggedInUser
          AsyncStorage.setItem('user', JSON.stringify({userId:res._id,phoneNumber:res.phoneNo,profileImage: res.profileImage,name:res.name}))
          // storeLoggedinStatus(true)
          getStoredUserDetails()
          console.log("async login",storedUser)
          navigation.navigate('DrawerScreens');
        }
        else{
            if (response.data.message === 'Invalid phone number or password') {
              alert("Invalid phone number or password");
            } else {
              alert("There was an issue in logging in,try again",
              "No user found with this phone number or password");
            }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  useEffect(() => {
    // Set default country as Pakistan
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
    // let currentUserStatus = AsyncStorage.getItem('user');
    // if(currentUserStatus){
    //  navigation.navigate('DrawerScreens');
    //     }
    // getStoredUserDetails()
  }, []);

  return (
    <View style={[LogInStyleSheet.container]}>
      <Status_bar
        darkModeBgColor={'black'}
        lightModeBgColor={AppColors.primary}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={LogInStyleSheet.scrollContainer}
          showsVerticalScrollIndicator={false}>
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
              autoCapitalize='none'
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={[LogInStyleSheet.passwordIcon]}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('ForgetPassword')
          }}>
          <Text style={[LogInStyleSheet.forgotpasswordText]}>Forgot Password?</Text>
          </TouchableOpacity>
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
                console.log("clicked")
                userLogin({navigation})
                // navigation.navigate('DrawerScreens');
              }

              // handleSubmit();
              // handleSignUp({navigation})
            }}
            style={[LogInStyleSheet.TouchableButtonStyle]}>
            <Text style={[LogInStyleSheet.TouchableTextStyle]}>LogIn</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',margin:wp('3%')}}>
          <Text style={{fontFamily:FontStyle.mediumFont}}>Don't have an account?{' '}</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('SignUpScreen')
          }}><Text style={{color:AppColors.primary,fontFamily:FontStyle.mediumFont}}>Signup</Text></TouchableOpacity>
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
            <Text style={[LogInStyleSheet.text]}>{snackbarMessage}</Text>
          </Snackbar>
    </View>
  );
};
export default LogInScreen;
