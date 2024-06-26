import { View, Text, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import ChangeNumberStyle from '../../../assets/styles/ChangeNumberStyle'
import LongButton from '../../../components/Buttons/LongButton'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ThemeContext } from '../../../context/ThemeContext'
import AppContext from '../../../context/AppContext'
import AppColors from '../../../assets/colors/Appcolors'
import FontStyle from '../../../assets/styles/FontStyle'
import TranslationFile from '../../../assets/translation/TranslationFile'


const ChangePassword = ({ navigation }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const maintextColor = theme.profileNameColor
  const btnColor = AppColors.white
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black
  const { baseUrl, getToken, token, updateCurrentUser, currentUser,language } = useContext(AppContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const showAlert = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const checkPassword = () => {
    if (newPassword === '') {
      return false;
    } else if (newPassword.length < 8) {
      showAlert("Please enter a password with at least 8 characters.")
      return false;
    } else if (newPassword !== '' && newPassword !== oldPassword) {
      changepassword()
      return true;
    } else {
      showAlert("Your new password must be different than your current one.");
      return false;
    }
  }
  const changepassword = async () => {
    const formdata = new FormData();
    formdata.append('userId', currentUser.userId);
    formdata.append('oldPassword', `${oldPassword}`);
    formdata.append('newPassword', `${newPassword}`);

    try {
      await fetch(`${baseUrl}/updatepassword`, {
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
          if (data.passwordChanged === true) {
            let newUser = data.updatedData
            console.log('newUser ======== ', newUser)
            setNewPassword('')
            setOldPassword('')
            ToastAndroid.showWithGravity(TranslationFile[language].password_changed, ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.goBack()
            // navigation.replace("Settings");
          } else {
            Alert.alert(TranslationFile[language].An_error_occurred)
          }
        })
        .catch(error => {console.log("res error", error)
        Alert.alert(TranslationFile[language].An_error_occurred)
      
      });
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert(TranslationFile[language].An_error_occurred)

    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <InnerScreensHeader navigation={navigation} screenName={TranslationFile[language].changePassword} />
      <View style={[ChangeNumberStyle.mainViewStyle(theme.backgroundColor)]}>
        <Text
          style={ChangeNumberStyle.headTextStyle(theme.profileNameColor)}>
          {TranslationFile[language].Enter_your_old_password_to_change_current_password}
        </Text>
        <TextInput
          placeholder={TranslationFile[language].old_password}
          onChangeText={text => {
            setOldPassword(text);
          }}
          autoCapitalize="none"
          style={[{
            fontSize: wp('3%'),
            paddingBottom: wp('-2%'),
            color: secondaryTextColor,
            borderBottomWidth: hp('0.15'),
            fontFamily: FontStyle.regularFont,
            borderBottomColor: darkThemeActivator ? AppColors.gray : AppColors.black,
          }]}
          placeholderTextColor={AppColors.gray}
        />
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          {TranslationFile[language].Enter_your_new_password_to_change_current_password}
        </Text>
        <TextInput
          placeholder={TranslationFile[language].new_password}
          onChangeText={text => {
            setNewPassword(text);
          }}
          autoCapitalize="none"
          style={[{
            fontSize: wp('3%'),
            paddingBottom: wp('-2%'),
            color: secondaryTextColor,
            borderBottomWidth: hp('0.15'),
            fontFamily: FontStyle.regularFont,
            borderBottomColor: darkThemeActivator ? AppColors.gray : AppColors.black,
          }]}
          placeholderTextColor={AppColors.gray}

        />
        <LongButton btnTitle={TranslationFile[language].Confirm} onPress={() => { checkPassword() }} />
      </View>

    </View>

  )
}

export default ChangePassword