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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ForgetScreenStyle from '../../assets/styles/AuthStyleSheet/ForgetScreen/ForgetScreenStyle';
import Primary_StatusBar from '../../components/statusbars/Primary_StatusBar';
import TranslationFile from '../../assets/translation/TranslationFile';
import { Icons } from '../../assets/Icons';
import { Snackbar } from 'react-native-paper';
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-country-picker-modal';
import LogInStyleSheet from '../../assets/styles/AuthStyleSheet/LogInStyleSheet/LogInStyleSheet';
import { PhoneNumberUtil } from 'google-libphonenumber';


const ForgetPasswordScreen = ({ navigation }) => {
  const { language, baseUrl,currentUserId,getUserID2,selectedImageUri,storeImageUri } = useContext(AppContext);
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  const [phoneNo, setPhoneNo] = useState('')
  const [newPassword, setNewPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleState, setToggleState] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const phoneNumberUtil = PhoneNumberUtil.getInstance();

  const [visible, setVisible] = useState(false);

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

  const handleForgetPassword=()=>{
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
        console.log('res aya after matching',data)
        if(data.matched===true){
          setToggleState(0);
        }else{
          Alert.alert("Please enter the right answers")
        }
      })
      .catch(error => console.log("res error",error));
  
  }
  const handleResetPassword = async () => {   
    const formdata = new FormData();
    formdata.append('phoneNo', phoneNo);
    formdata.append('password', newPassword);
    try {
      fetch(`${baseUrl}/resetPassword`, {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for form data
        },
      })
      .then((response) => response.json())
      .then(data => {
          console.log('res aya after changing',data)
          if(data.login===true){
            let res=data.updated
            AsyncStorage.setItem('user', JSON.stringify({userId:res._id,phoneNumber:res.phoneNo,profileImage: res.profileImage,name:res.name}))
  
            navigation.replace('DrawerScreens');
          }else{
            Alert.alert("There was an issue in logging in,try again")
          }
        })
        .catch(error => console.log("res error",error));
  
      const data = await response.json();
      console.log('res after updating', data);
      if(data.message==="This user name is not available."){
      setErrorMessage(true)
      setAlreadyExist(data.message)
    }
    else{
    AsyncStorage.getItem("user").then((userData) => {
      if (userData) {
        const existingData = JSON.parse(userData);
        const updatedData = { ...existingData, name: data.updated.name };
        console.log("update async",updatedData)
        AsyncStorage.setItem("user", JSON.stringify(updatedData));
      }
      navigation.navigate('DrawerScreens');
    });
  }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  useEffect(() => {
    setSelectedCountry({ cca2: 'PK', callingCode: '92' });
    setCountryCode('92');
  }, []);

  return (
    <View style={ForgetScreenStyle.container}>
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
              style={[{
                flex: 1,
                alignItems: 'center',
                paddingTop: hp('1'),
                // backgroundColor:'red'
                borderBottomColor:'#e2e2e2',
                borderBottomWidth:1
              }]}
              placeholder="Phone Number"
              onChangeText={text => setPhoneNo(text)}
              keyboardType="numeric"
              maxLength={15}
              value={phoneNo}
            />
          </View>
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
              secureTextEntry={passwordVisible}
              onChangeText={value => {
                setConfirmPassword(value);
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
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                if (newPassword == '' && confirmPassword == '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else if (newPassword.length < 8) {
                  if (newPassword === '') {
                    showSnackbar(
                      TranslationFile[language].Password_must_not_be_empty,
                    );
                    return;
                  } else {
                    showSnackbar(
                      TranslationFile[language]
                        .Password_contain_atLeast_8_character,
                    );

                    if (!specialCharRegex.test(newPassword)) {
                      showSnackbar(
                        TranslationFile[language]
                          .Password_must_contain_at_least_one_special_character,
                      );
                      return;
                    }

                    return;
                  }
                } else if (confirmPassword == '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else {
                  if (newPassword !== confirmPassword) {
                    showSnackbar(
                      TranslationFile[language].Passwords_do_not_match,
                    );
                    return;
                  } else {
                    handleResetPassword()
                  }
                }
              }}
              style={ForgetScreenStyle.TouchableButtonStyle}>
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
    </View>
  );
};
export default ForgetPasswordScreen;
