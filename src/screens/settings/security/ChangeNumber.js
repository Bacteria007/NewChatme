import { View, Text, ToastAndroid, Alert } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import LongButton from '../../../components/Buttons/LongButton';
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle';
import TextInputForChangeNumber from '../../../components/TextInputs/TextInputForChangeNumber';
import { ThemeContext } from '../../../context/ThemeContext';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppColors from '../../../assets/colors/Appcolors';
import PhoneInput from 'react-native-phone-number-input';
import TextInputStyleForChangeNumber from '../../../assets/styles/TextInputStyleForChangeNumber';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import { Icons } from '../../../assets/Icons';
import { Divider } from 'react-native-paper';

const ChangeNumber = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  const { baseUrl, getToken, token, updateCurrentUser, currentUser } = useContext(AppContext)

  const [oldPhoneNo, setOldPhoneNo] = useState('')
  const [oldCountryCode, setOldCountryCode] = useState('+92')
  const [newPhoneNo, setNewPhoneNo] = useState('')
  const [newCountryCode, setNewCountryCode] = useState('+92')
  const oldPhoneInputRef = useRef(null);
const newPhoneInputRef = useRef(null);

const validatePhoneNumber = async (phoneInputRef, phoneNo, country) => {
  console.log('in validate number function');
//   getCountryCode: () => CountryCode
// getCallingCode: () => string | undefined
  try {

    console.log('checking this',phoneNo);
    const isValidNumber = await phoneInputRef.current?.isValidNumber(phoneNo)
    if (!isValidNumber) {
     console.log(`Invalid ${country} number`);
      Alert.alert(`Invalid phone number for ${country}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error validating phone number:', error);
    return false;
  }
};

const checkNumber = async () => {
  console.log('in check number  function');
  const oldP=await oldPhoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
  const newP=await newPhoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
  const oldcode=await oldPhoneInputRef.current?.getCallingCode()
  const newcode=await newPhoneInputRef.current?.getCallingCode()

  const isOldPhoneValid = await validatePhoneNumber(oldPhoneInputRef, oldP.formattedNumber, oldCountryCode);
  const isNewPhoneValid = await validatePhoneNumber(newPhoneInputRef, newP.formattedNumber, newCountryCode);

  if (isOldPhoneValid && isNewPhoneValid) {
    changenumber(oldP.formattedNumber,newP.formattedNumber); // Both phone numbers are valid, proceed with changing number
  }
};

  const changenumber = async (oldp,newp) => {
    const formdata = new FormData();
    formdata.append('userId', currentUser.userId);
    // formdata.append('oldPhoneNo', `${oldPhoneNo}`);
    formdata.append('oldPhoneNo', oldp);
    // formdata.append('newPhoneNo', `${newPhoneNo}`);
    formdata.append('newPhoneNo', newp);

    try {
      await fetch(`${baseUrl}/changeNumber`, {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for form data
        },
      })
        .then((response) => response.json())
        .then(async data => {
          console.log('res aya after changing', data)
          if (data.numberChanged === true) {
            let newUser = data.updatedData
            console.log('newUser ======== ', newUser)
            // AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true))
            // AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(true))
            // AsyncStorage.setItem('token', token);
            // AsyncStorage.setItem('profileImage', newUser.profileImage)
            // AsyncStorage.setItem('name', newUser.name)
            // AsyncStorage.setItem('Id', newUser._id)
            await AsyncStorage.setItem('phoneNo', newUser.phoneNo)
            // AsyncStorage.setItem('user', JSON.stringify({ userId: newUser._id, phoneNumber: newUser.phoneNo, profileImage: newUser.profileImage, name: newUser.name }))
            updateCurrentUser({ userId: newUser._id, phoneNumber: newUser.phoneNo, profileImage: newUser.profileImage, name: newUser.name })
            ToastAndroid.showWithGravity('Phone number is changed successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.goBack()
          } else {
            Alert.alert(`${data.message}`)
          }
        })
        .catch(error => console.log("res error", error));
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  }
  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <InnerScreensHeader navigation={navigation} screenName="Change number" />
      <View style={[ChangeNumberStyle.mainViewStyle(theme.backgroundColor)]}>
        <Text
          style={[ChangeNumberStyle.headTextStyle(secondaryTextColor)]}>
          Enter your old phone number :
        </Text>
        {/* <TextInputForChangeNumber setPhoneNo={setOldPhoneNo} setCountryCode={setOldCountryCode} /> */}
        <PhoneInput
          defaultCode='PK'
          defaultValue='+92'
          value={oldPhoneNo} ref={oldPhoneInputRef}
          onChangeText={(t) => setOldPhoneNo(t)}
          onChangeCountry={(c) => setOldCountryCode(c)}

          // styling hy nechy sari
          containerStyle={{
            alignSelf: 'center', marginTop: hp(4), backgroundColor: theme.backgroundColor,
            justifyContent: 'center', alignItems: 'center', height: 'auto', width: 'auto'
          }}
          textInputProps={{
            cursorColor:secondaryTextColor,
            placeholder: "Old number...", placeholderTextColor: "gray",
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
        <Text
          style={[ChangeNumberStyle.headTextStyle(secondaryTextColor)]}>
          Enter your new phone number :
        </Text>
        <PhoneInput
          defaultCode='PK'
          defaultValue='+92'
          value={newPhoneNo} ref={newPhoneInputRef}
          onChangeText={(t) => setNewPhoneNo(t)}
          onChangeCountry={(c) => setNewCountryCode(c)}

           // styling hy nechy sari
           containerStyle={{
            alignSelf: 'center', marginTop: hp(4), backgroundColor: theme.backgroundColor,
            justifyContent: 'center', alignItems: 'center', height: 'auto', width: 'auto'
          }}
          textInputProps={{
            cursorColor:secondaryTextColor,
            placeholder: "New number...", placeholderTextColor: "gray",
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
        <LongButton btnTitle={"Confirm"} onPress={checkNumber} />
      </View>
    </View>

  );
};
export default ChangeNumber;
