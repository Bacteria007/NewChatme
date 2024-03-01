import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid, Alert } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Icons } from '../../../assets/Icons';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import DeleteAccountStyle from '../../../assets/styles/DeleteAccountStyle';
// import LongButton from '../../../components/Buttons/LongButton';
import AppContext from '../../../context/AppContext';
import { Button, Menu, Divider, IconButton, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';
import { ThemeContext } from '../../../context/ThemeContext';
import PhoneInput from 'react-native-phone-number-input';
import ValidateNumber from '../../../helpers/phoneNumber/ValidateNumber';
import TranslationFile from '../../../assets/translation/TranslationFile';


const DeleteAccount = ({ navigation }) => {
  //  Constants
  const { baseUrl, currentUser, updateCurrentUser, token,language } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext)
  const maintextColor = theme.profileNameColor
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  // Variables
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [countryCode, setCountryCode] = useState('')
  const phoneRef = useRef(null)
  // Functions
  const checkNumber = async () => {
    console.log('in check number  function');
    const getFormattedNumber = await phoneRef.current?.getNumberAfterPossiblyEliminatingZero()

    const isPhoneValid = await ValidateNumber(phoneRef, getFormattedNumber.formattedNumber, countryCode);

    if (!isPhoneValid) {
      setPhoneNumberError("Phone Number is invalid")
      console.log("Phone Number is invalid")
      return
    }
     if (password.trim() == '') {
      setPasswordError(TranslationFile[language].Plz_enter_the_required_field)
      console.log("Please enter your password to delete account.");
      return

    }
     if (password.length < 8) {
      setPasswordError("Password is invalid")
      console.log("Password is invalid")
      return

    }
    else {
      dltAccount(getFormattedNumber.formattedNumber); // Both phone numbers are valid, proceed with changing number
    }
  };
  const dltAccount = async (phone) => {
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('name', currentUser.name);
    formData.append('phoneNo', phone);
    // formData.append('phoneNo', `+${countryCode}${phoneNumber}`);
    formData.append('password', password);

    try {
      const response = await fetch(`${baseUrl}/deleteAccount`, {
        method: 'DELETE',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        if (data.success) {
          console.log("account dlted")
          await AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(false))
          await AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(false))
          await AsyncStorage.setItem('token', '')
          await AsyncStorage.setItem('profileImage', '')
          await AsyncStorage.setItem('name', '')
          await AsyncStorage.setItem('Id', '')
          await AsyncStorage.setItem('phoneNo', '')
          updateCurrentUser({})
          RNExitApp.exitApp();
          // navigation.replace('LogInScreen')
        } else {
          ToastAndroid.showWithGravity('User not found.', ToastAndroid.SHORT, ToastAndroid.CENTER);
          console.log("account  not dlted")
        }
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    };

  };

  return (
    <View style={DeleteAccountStyle.containerView(theme.backgroundColor)}>
      <InnerScreensHeader navigation={navigation} screenName="Delete Account" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp('5%'), }}
          showsVerticalScrollIndicator={false}>

          <View style={[DeleteAccountStyle.mainView(theme.backgroundColor)]}>
            <View style={[DeleteAccountStyle.warningView(theme.backgroundColor)]}>
              <View style={[DeleteAccountStyle.warningLeftView(theme.backgroundColor)]}>
                <Icons.FontAwesome
                  name="exclamation-triangle"
                  size={wp('5.5%')}
                  color={AppColors.red}
                />
              </View>
              <View style={[DeleteAccountStyle.warningRightView]}>
                <Text style={[DeleteAccountStyle.warningHeadText]}>
                  Deleting your account will:
                </Text>
                <View style={[DeleteAccountStyle.buletedView]}>
                  <Text style={{ color: secondaryTextColor }}>{'\u25cf'} </Text>
                  <Text style={[DeleteAccountStyle.buletedText(secondaryTextColor)]}>
                    Delete your account from ChatMe
                  </Text>
                </View>
                <View style={[DeleteAccountStyle.buletedView]}>
                  <Text style={{ color: secondaryTextColor }}>{'\u25cf'} </Text>
                  <Text style={[DeleteAccountStyle.buletedText(secondaryTextColor)]}>
                    Earase your message history
                  </Text>
                </View>
                <View style={[DeleteAccountStyle.buletedView]}>
                  <Text style={{ color: secondaryTextColor }}>{'\u25cf'} </Text>
                  <Text style={[DeleteAccountStyle.buletedText(secondaryTextColor)]}>
                    Delete you from all of your ChatMe groups
                  </Text>
                </View>
              </View>
            </View>
            <View style={[DeleteAccountStyle.actionContainerView]}>
              <Text style={[DeleteAccountStyle.actionConfirmText(darkThemeActivator)]}>
                To delete your account, confirm your country code and enter your phone
                number.
              </Text>
              {/* <Text style={[DeleteAccountStyle.labelText]}>Country code</Text>
              <TextInput
                placeholder="country code"
                onChangeText={text => setCountryCode(text)}
                style={DeleteAccountStyle.textinput(darkThemeActivator, secondaryTextColor)}
                placeholderTextColor={AppColors.gray}

              /> */}
              {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
              <Text style={[DeleteAccountStyle.labelText]}>Phone</Text>
              {/* <TextInput
                placeholder="phone number"
                keyboardType='numeric'
                style={DeleteAccountStyle.textinput(darkThemeActivator, secondaryTextColor)}
                maxLength={15}
                onChangeText={text => setPhoneNumber(text)}
          placeholderTextColor={AppColors.gray}
             
             /> */}
              <PhoneInput
                defaultCode='PK'
                defaultValue='+92'
                value={phoneNumber}
                ref={phoneRef}
                onChangeText={(t) => setPhoneNumber(t)}
                onChangeCountry={(c) => setCountryCode(c)}

                // styling hy nechy sari
                containerStyle={{
                  alignSelf: 'center', marginTop: hp(1.5), backgroundColor: theme.backgroundColor,
                  justifyContent: 'center', alignItems: 'center', height: 'auto', width: 'auto'
                }}
                textInputProps={{
                  cursorColor: secondaryTextColor,
                  onFocus: () => setPhoneNumberError(''),
                  placeholder: "Phone number", placeholderTextColor: "gray",
                  style: {
                    color: secondaryTextColor, backgroundColor: theme.backgroundColor,
                    fontFamily: FontStyle.regularFont, flex: 1, width: 'auto',
                    height: hp(6), textAlignVertical: 'center', padding: 0, margin: 0,
                    borderBottomWidth: 1, borderBottomColor: secondaryTextColor
                  }
                }}

                textContainerStyle={{ height: 0, backgroundColor: theme.backgroundColor }}
                codeTextStyle={{ color: secondaryTextColor, fontFamily: FontStyle.regularFont, textAlign: 'center', textAlignVertical: 'center' }}
                countryPickerButtonStyle={{ backgroundColor: theme.backgroundColor, height: hp(6), width: 'auto', borderBottomWidth: 1, borderBottomColor: secondaryTextColor }}
                // renderDropdownImage={<Icons.AntDesign name='caretdown' color={secondaryTextColor} />}
                disableArrowIcon
                layout='second'

              />
              {phoneNumberError && <Text style={{ color: 'red', fontFamily: FontStyle.regularFont }}>{phoneNumberError}</Text>}

              {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
              <Text style={[DeleteAccountStyle.labelText]}>Password</Text>
              <TextInput
                placeholder="password"
                style={DeleteAccountStyle.textinput(darkThemeActivator, secondaryTextColor)}
                autoCapitalize='none'
                onChangeText={text => setPassword(text)}
                placeholderTextColor={AppColors.gray}
                onFocus={() => setPasswordError('')}
              />
              {passwordError && <Text style={{ color: 'red', fontFamily: FontStyle.regularFont }}>{passwordError}</Text>}
              <TouchableRipple borderless
                onPress={() => {
                  checkNumber()
                }}
                style={{
                  height: hp('5.5'),
                  width: hp('16'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp('8%'),
                  marginTop: wp('20%'),
                  alignSelf: 'center',
                  backgroundColor: AppColors.primary,
                }}>
                <Text style={{
                  color: AppColors.white,
                  fontSize: wp('4.5%'),
                  fontFamily: FontStyle.regularFont,
                }}>
                  Delete
                </Text>
              </TouchableRipple>
              {/* <LongButton/> */}
            </View>
          </View>
        </ScrollView></KeyboardAvoidingView>
    </View>
  );
};

export default DeleteAccount;
