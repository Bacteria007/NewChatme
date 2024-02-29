import { View, Text, ToastAndroid, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import LongButton from '../../../components/Buttons/LongButton';
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle';
import TextInputForChangeNumber from '../../../components/TextInputs/TextInputForChangeNumber';
import { ThemeContext } from '../../../context/ThemeContext';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppColors from '../../../assets/colors/Appcolors';

const ChangeNumber = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  const { baseUrl, getToken, token, updateCurrentUser, currentUser } = useContext(AppContext)

  const [oldPhoneNo, setOldPhoneNo] = useState('')
  const [oldCountryCode, setOldCountryCode] = useState('')
  const [newPhoneNo, setNewPhoneNo] = useState('')
  const [newCountryCode, setNewCountryCode] = useState('')


  const checkNumber=()=>{
    if (newPhoneNo === '' || oldPhoneNo === '') return false;
    else {
      changenumber()
    }
  };
  const changenumber = async () => {
    const formdata = new FormData();
    formdata.append('userId', currentUser.userId);
    // formdata.append('oldPhoneNo', `${oldPhoneNo}`);
    formdata.append('oldPhoneNo', `+${oldCountryCode}${oldPhoneNo}`);
    // formdata.append('newPhoneNo', `${newPhoneNo}`);
    formdata.append('newPhoneNo', `+${newCountryCode}${newPhoneNo}`);

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
            Alert.alert("Something went wrong,try again later.")
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
          Enter your old phone number with country code:
        </Text>
        <TextInputForChangeNumber setPhoneNo={setOldPhoneNo} setCountryCode={setOldCountryCode}
        />
        <Text
          style={[ChangeNumberStyle.headTextStyle(secondaryTextColor)]}>
          Enter your new phone number with country code:
        </Text>
        <TextInputForChangeNumber setPhoneNo={setNewPhoneNo} setCountryCode={setNewCountryCode} />
        <LongButton btnTitle={"Confirm"} onPress={() => { checkNumber() }} />
      </View>
    </View>

  );
};
export default ChangeNumber;
