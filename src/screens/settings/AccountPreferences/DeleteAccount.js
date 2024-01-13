import {View, Text,TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid} from 'react-native';
import React, { useContext, useState } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {Icons} from '../../../assets/Icons';
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


const DeleteAccount = ({navigation}) => {
  const { baseUrl, currentUser,updateCurrentUser, token } = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('')

  const dltAccount = async (navigation) => {
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('name', currentUser.name);
    formData.append('phoneNo', phoneNumber);
    formData.append('password', password);
    formData.append('country', country);

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
          ToastAndroid.showWithGravity('Something went wrong, please try again later.', ToastAndroid.SHORT, ToastAndroid.CENTER);
          console.log("account  not dlted")
        }
      }
    } catch (error) {
      console.error('Error deleting account:', error);
  };

};

  return (
    <View style={[DeleteAccountStyle.containerView]}>
      <InnerScreensHeader navigation={navigation} screenName="Delete Account" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp('5%'),}}
          showsVerticalScrollIndicator={false}>

      <View style={[DeleteAccountStyle.mainView]}>
      <View style={[DeleteAccountStyle.warningView]}>
        <View style={[DeleteAccountStyle.warningLeftView]}>
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
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Delete your account from ChatMe
            </Text>
          </View>
          <View style={[DeleteAccountStyle.buletedView]}>
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Earase your message history
            </Text>
          </View>
          <View style={[DeleteAccountStyle.buletedView]}>
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Delete you from all of your ChatMe groups
            </Text>
          </View>
        </View>
      </View>
      <View style={[DeleteAccountStyle.actionContainerView]}>
        <Text style={[DeleteAccountStyle.actionConfirmText]}>
          To delete your account, confirm your country code and enter your phone
          number.
        </Text>
        <Text style={[DeleteAccountStyle.labelText]}>Country</Text>
        <TextInput
        placeholder="country"
        onChangeText={text => setCountry(text)}
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
        {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
        <Text style={[DeleteAccountStyle.labelText]}>Phone</Text>
        <TextInput
        placeholder="phone number"
        keyboardType='numeric'
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
        maxLength={15}
        onChangeText={text => setPhoneNumber(text)}
        />
        {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
        <Text style={[DeleteAccountStyle.labelText]}>Password</Text>
        <TextInput
        placeholder="password"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
        onChangeText={text => setPassword(text)}
      />
      <TouchableRipple borderless onPress={() => dltAccount({navigation})}
                style={{
                  height: hp('6'),
    width: hp('14'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp('8%'),
                  marginTop: wp('20%'),
                  alignSelf:'center',
                  backgroundColor: AppColors.primary,
                }}>
                <Text style={{
    color: AppColors.white,
    fontSize: wp('6%'),
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
