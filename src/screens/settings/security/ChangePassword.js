import { View, Text,TextInput, ToastAndroid, Alert } from 'react-native'
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


const ChangePassword = ({navigation}) => {
  const {theme}=useContext(ThemeContext);
  const { baseUrl, getToken,token, updateCurrentUser, currentUser } = useContext(AppContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const changepassword=async()=>{
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
            ToastAndroid.showWithGravity('Password is changed successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.goBack()
            // navigation.replace("Settings");
          } else {
            alert("Something went wrong,try again later.")
          }
        })
        .catch(error => console.log("res error", error));
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

  return (
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <InnerScreensHeader navigation={navigation} screenName="Change password" />
      <View style={[ChangeNumberStyle.mainViewStyle(theme.backgroundColor)]}>
        <Text
          style={ChangeNumberStyle.headTextStyle(theme.profileNameColor)}>
          Enter your old password to change current password:
        </Text>
        <TextInput
        placeholder="old password"
        onChangeText={text => {
          setOldPassword(text);
        }}
        autoCapitalize="none"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
        <Text
          style={[ChangeNumberStyle.headTextStyle]}>
          Enter your new password to change current password:
        </Text>
        <TextInput
        placeholder="new password"
        onChangeText={text => {
          setNewPassword(text);
        }}
        autoCapitalize="none"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />        
        <LongButton btnTitle={"Confirm"}  onPress={()=>{changepassword()}}  />
      </View>

    </View>

  )
}

export default ChangePassword