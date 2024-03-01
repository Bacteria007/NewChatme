import { View, Text, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import AppColors from '../../../assets/colors/Appcolors'
import FontStyle from '../../../assets/styles/FontStyle'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import NotificationStyle from '../../../assets/styles/NotificationStyle'
import AppContext from '../../../context/AppContext'
import { TouchableRipple } from 'react-native-paper'
import TranslationFile from '../../../assets/translation/TranslationFile'


const Help = ({ navigation }) => {
  const { baseUrl, currentUser, token,language } = useContext(AppContext)

  const [helpMessage, setHelpMessage] = useState('')
  const sendHelpMessage = async () => {
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('senderName', currentUser.name);
    formData.append('message', helpMessage.trim());

    try {
      const response = await fetch(`${baseUrl}/helpRequest`, {
        method: 'POST',
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
        if (data.save) {
          console.log("request has sent successfully")
          ToastAndroid.showWithGravity('Your request has sent successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
          // navigation.navigate('Settings')
          navigation.goBack()
        } else {
          ToastAndroid.showWithGravity('Something went wrong, please try again later.', ToastAndroid.SHORT, ToastAndroid.CENTER);
          console.log("request has not sent successfully")
        }
      }
    } catch (error) {
      console.error('Error in sending help request:', error);
    };

  };
  return (
    <View style={[NotificationStyle.containerView]}>
      <InnerScreensHeader navigation={navigation} screenName={TranslationFile[language].Help_center} />
      <View style={[NotificationStyle.mainView]}>
        <Text style={[NotificationStyle.text]}>{TranslationFile[language].Sender_name} : {currentUser.name}</Text>
        <TextInput
          placeholder={TranslationFile[language].problem}
          placeholderTextColor={AppColors.gray}
          style={NotificationStyle.textInput}
          value={helpMessage}
          onChangeText={text => setHelpMessage(text)}
          multiline={true}
        />
        <TouchableRipple borderless onPress={() => {
          if (helpMessage !== '') {
            sendHelpMessage()
          }
        }}
          style={[NotificationStyle.touchableView]}>
          <Text style={[NotificationStyle.touchableText]}>
            {TranslationFile[language].Submit}
          </Text>
        </TouchableRipple>

      </View>
    </View>
  )
}

export default Help