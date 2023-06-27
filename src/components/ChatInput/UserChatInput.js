import { View, Text, TouchableOpacity, TextInput,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Icons } from '../../assets/Icons'
import UserChatInputStyle from '../../assets/styles/UserChatInputStyle'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';


const UserChatInput = () => {
  const [textMessage, setTextMessage] = useState('')
  return (
    //KeyboardAvoidingView is not working why
    <KeyboardAvoidingView style={{flex:1}} enabled={true} behavior='padding'>
    <View
    style={[UserChatInputStyle.bottomActionContainerView]}>
    <View
      style={[UserChatInputStyle.bottomLeftContainer]}>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Icons.Entypo name="emoji-happy" size={wp('6.4%')} />
      </TouchableOpacity>
      <TextInput
        placeholder="Write a message" 
        multiline={true}
        editable={true}
        inlineImageLeft='search_icon'
        style={[UserChatInputStyle.textInputStyle]}
        value={textMessage}
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => setTextMessage(text)}
      />
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Icons.FontAwesome name="paperclip" size={wp('6.5%')} />
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Icons.FontAwesome name="camera" size={wp('5.5%')} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity>
      <View
        style={[UserChatInputStyle.microphoneContainerView]}>
        <Icons.FontAwesome name="microphone" size={wp('5.7%')} color={AppColors.white} />
      </View>
    </TouchableOpacity>
  </View>
 </KeyboardAvoidingView> 
  )
}

export default UserChatInput