import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ForgetScreenStyle from '../../assets/styles/AuthStyleSheet/ForgetScreen/ForgetScreenStyle';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import TranslationFile from '../../assets/translation/TranslationFile';
import { Icons } from '../../assets/Icons';
import { Snackbar } from 'react-native-paper';
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-country-picker-modal';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { ThemeContext } from '../../context/ThemeContext';


const ForgetPasswordScreen = ({ navigation }) => {
  const { language, baseUrl, updateCurrentUser, getToken } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  const [phoneNo, setPhoneNo] = useState('')
  const [newPassword, setNewPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const phoneNumberUtil = PhoneNumberUtil.getInstance();


  // Regular expression to check for special characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const showSnackbar = message => {
    setSnackbarMessage(message);
    setVisible(true);
    // ToastAndroid.showWithGravity(`${message}`,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  }
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
  // UseScreenFocus(getStoredUserDetails)
  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode);
  };

  const handleForgetPassword = () => {
    const formdata = new FormData();
    formdata.append('phoneNo', phoneNo);
    const securityQuestions = [
      { question: 'What is your favourite fruit?', answer: ques1 },
      { question: 'What is your favourite game?', answer: ques2 },
    ];
    formdata.append('securityQuestions', JSON.stringify(securityQuestions));

    fetch(`${baseUrl}/forgetPassword`, {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for form data
      },
    })
      .then((response) => response.json())
      .then(data => {
        console.log('res aya after matching', data)
        if (phoneNo == '') {
          Alert.alert("Please enter phone number")
        }
        // else if (isValidPhoneNumber()) {
        else {
          if (data.matched === true) {
            setToggleState(0);
          } else {
            Alert.alert("Please enter the right answers")
          }

        }
        // } else {
        //   Alert.alert("Invalid Phone Number")
        // }
      })
      .catch(error => console.log("res error", error));

  }
  const handleResetPassword = async () => {
    const formdata = new FormData();
    formdata.append('phoneNo', phoneNo);
    formdata.append('password', newPassword);
    try {
      await fetch(`${baseUrl}/resetPassword`, {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for form data
        },
      })
        .then((response) => response.json())
        .then(data => {
          console.log('res aya after changing', data)
          if (data.login === true) {
            let newUser = data.updated
            let token = data.token
            console.log('newUser ======== ', newUser)
            AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true))
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('profileImage', newUser.profileImage)
            AsyncStorage.setItem('name', newUser.name)
            AsyncStorage.setItem('Id', newUser._id)
            AsyncStorage.setItem('phoneNo', newUser.phoneNo)
            // AsyncStorage.setItem('user', JSON.stringify({ userId: newUser._id, phoneNumber: newUser.phoneNo, profileImage: newUser.profileImage, name: newUser.name }))
            updateCurrentUser({ userId: newUser._id, phoneNumber: newUser.phoneNo, profileImage: newUser.profileImage, name: newUser.name })
            getToken()
            navigation.replace("DrawerStack");
          } else {
            Alert.alert("There was an issue in logging in,try again")
          }
        })
        .catch(error => console.log("res error", error));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const validateInputFields = () => {
    if (newPassword == '' && confirmPassword == '') {
      showSnackbar(TranslationFile[language].Plz_enter_the_required_field);
      // return
    } else if (newPassword.length < 8) {
      showSnackbar(TranslationFile[language].Password_contain_atLeast_8_character);
    } else if (!specialCharRegex.test(newPassword)) {
      showSnackbar(TranslationFile[language].Password_must_contain_at_least_one_special_character);
    } else if (newPassword !== confirmPassword) {
      showSnackbar(TranslationFile[language].Passwords_do_not_match)
    } else {
      console.log('✅✅✅✅✅✅✅')
      console.log('thk hy pass', newPassword)
      console.log('✅✅✅✅✅✅✅')
      handleResetPassword()
    }
  }
  useEffect(() => {
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
  }, []);

  return (
    <View style={ForgetScreenStyle.container(theme.backgroundColor)}>
      <Primary_StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/imges/AuthScreenPictures/ForgetPassPic/ForgetPic2.png')}
          style={[ForgetScreenStyle.image]}
        />
        {/* *************************************************************************************************** */}
        {toggleState == 1 ? (
          <>
            <View style={ForgetScreenStyle.phoneNoAndCountryContainer}>
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
            </View>
            <View style={ForgetScreenStyle.phoneNoAndCountryContainer}>

              <View style={[LogInStyleSheet.phoneNumberContainer]}>
                <Text style={[LogInStyleSheet.countryCode]}>+{countryCode}</Text>
                <TextInput
                  style={[LogInStyleSheet.phoneNumberInput]}
                  placeholder="Phone Number"
                  onChangeText={text => setPhoneNo(text)}
                  keyboardType="numeric"
                  maxLength={15}
                  value={phoneNo}
                />
              </View>
            </View>
            <View style={ForgetScreenStyle.securityQuestionsContainer}>
              <Text style={ForgetScreenStyle.Text2}>Security questions</Text>
              <View style={ForgetScreenStyle.quesView}>
                <Text style={ForgetScreenStyle.displyNameText}>
                  Q1 : What is your favourite fruit?
                </Text>
              </View>
              <TextInput
                placeholder="Answer"
                value={ques1}
                style={ForgetScreenStyle.TextInputContainer}
                onChangeText={value => {
                  setQues1(value);
                }}
                autoCapitalize='none'
              />

              <View style={ForgetScreenStyle.quesView}>
                <Text style={ForgetScreenStyle.displyNameText}>
                  Q2 : What is your favourite game?
                </Text>
              </View>
              <TextInput
                placeholder="Answer"
                value={ques2}
                style={ForgetScreenStyle.TextInputContainer}
                onChangeText={value => {
                  setQues2(value);
                }}
                autoCapitalize='none'
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss;
                  if ((ques1 == '') & (ques2 == '')) {
                    showSnackbar(
                      TranslationFile[language].Plz_enter_the_required_field,
                    );
                    return;
                  } else if (ques1 === '') {
                    showSnackbar(
                      TranslationFile[language].Plz_enter_the_required_field,
                    );
                    return;
                  } else if (ques2 === '') {
                    showSnackbar(
                      TranslationFile[language].Plz_enter_the_required_field,
                    );
                    return;
                  } else {
                    handleForgetPassword()
                  }
                }}
                style={ForgetScreenStyle.TouchableButtonStyle}>
                <Text style={ForgetScreenStyle.TouchableTextStyle}>
                  {TranslationFile[language].Next}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={ForgetScreenStyle.Text2}>Change Password</Text>
            <View style={ForgetScreenStyle.quesView}>
              <Text style={ForgetScreenStyle.displyNameText}>Password:</Text>
            </View>
            <View style={ForgetScreenStyle.passwordContainer}>
              <TextInput
                value={newPassword}
                style={ForgetScreenStyle.passwordInput}
                secureTextEntry={passwordVisible}
                onChangeText={value => {
                  setNewPasword(value);
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                }}>
                <Icons.Feather
                  name={passwordVisible === true ? 'eye' : 'eye-off'}
                  style={ForgetScreenStyle.passwordIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={ForgetScreenStyle.quesView}>
              <Text style={ForgetScreenStyle.displyNameText}>
                Confirm Password:
              </Text>
            </View>
            <View style={ForgetScreenStyle.passwordContainer}>
              <TextInput
                value={confirmPassword}
                style={ForgetScreenStyle.passwordInput}
                secureTextEntry={confirmPasswordVisible}
                onChangeText={value => {
                  setConfirmPassword(value);
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setConfirmPasswordVisible(!confirmPasswordVisible);
                }}>
                <Icons.Feather
                  name={confirmPasswordVisible === true ? 'eye' : 'eye-off'}
                  style={ForgetScreenStyle.passwordIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => { validateInputFields() }}
                style={ForgetScreenStyle.TouchableButtonStyle} >
                <Text style={ForgetScreenStyle.TouchableTextStyle}>
                  {TranslationFile[language].Next}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      {/* ################################################################### */}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={{
          backgroundColor: '#D3D3D3',
          width: wp('70'),
          marginBottom: hp('6'),
          marginLeft: wp('15'),
        }}>
        <Text style={[ForgetScreenStyle.text]}>{snackbarMessage}</Text>
      </Snackbar>
    </View >
  );
};
export default ForgetPasswordScreen;
