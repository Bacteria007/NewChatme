import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
 
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Icons } from '../../assets/Icons';
import UserChatInputStyle from '../../assets/styles/UserChatInputStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import EmojiPicker from 'rn-emoji-keyboard';

const UserChatInput = () => {
  
  const [textMessage, setTextMessage] = useState('');
  const [height, setHeight] = useState(hp('7%')); // Initialize height with a default value

  const onContentSizeChange = (event) => {
    setHeight(event.nativeEvent.contentSize.height);
  };
  return (
    <View style={UserChatInputStyle.main_input_and_mic}>
      <View style={UserChatInputStyle.input_and_all_icons}>  
      <ScrollView style={UserChatInputStyle.scroll_inputText}>    
          <TextInput style={UserChatInputStyle.input(height)}
            placeholder="Type here"
            value={textMessage}
            onChangeText={e => {
              setTextMessage(e);
            }}
            keyboardType='twitter'
            multiline={true}
            placeholderTextColor={AppColors.gray}
            onContentSizeChange={onContentSizeChange}
            underlineColorAndroid={'transparent'}
          />
       </ScrollView>    
        <View style={UserChatInputStyle.camera_and_papercliper}>
          <TouchableOpacity>
            <Icons.FontAwesome name="paperclip" size={wp('6.5%')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons.FontAwesome name="camera" size={wp('5.5%')} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <View style={[UserChatInputStyle.microphoneContainerView]}>
          <Icons.FontAwesome
            name="microphone"
            size={wp('5.7%')}
            color={AppColors.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserChatInput;
