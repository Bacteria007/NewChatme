import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { Icons } from '../../assets/Icons';
import UserChatInputStyle from '../../assets/styles/UserChatInputStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import { requestCameraAndAudioPermission } from '../Permission/Permission';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import AppContext from '../../context/AppContext';
// import EmojiPicker from 'rn-emoji-keyboard';

const UserChatInput = ({
  item,
  socket,
  setMessageList,
  sendMessage,
  setImagMessage,
  imagMessage,
}) => {
  const {
    language,
    baseUrl,
    currentUserId,
    getUserID2,
    selectedImageUri,
    storeImageUri,
  } = useContext(AppContext);

  const [currentMessage, setCurrentMessage] = useState('');
  // const [messageList, setMessageList] = useState([]);
  // const [imagMessage, setImagMessage] = useState('');
  const [videoMessage, setVideoMessage] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [height, setHeight] = useState(hp('7%')); // Initialize height with a default value
  // const {item,socket} = props.route.params;

  const onContentSizeChange = event => {
    setHeight(event.nativeEvent.contentSize.height);
  };

  // const sendMessage = async () => {
  //   // const imgMsg= {
  //   //   uri: imagMessage.uri,
  //   //   type: imagMessage.type,
  //   //   name: imagMessage.fileName,
  //   // }
  //   // console.log("imgg",imgMsg)
  //   if (currentMessage.trim() !== '') {
  //     const messageData = {
  //           content: currentMessage.trim(),
  //           name:item.name,
  //           senderId:item.userId,
  //           recieverId:item.recieverId,
  //           // image:imgMsg

  //     };
  //     console.log("frontend",messageData)

  //     await socket.emit("send_message", messageData);
  //           setMessageList((list) => [...list, messageData]);
  //     setCurrentMessage("");
  //   }
  // };

  return (
    <View style={UserChatInputStyle.main_input_and_mic}>
      <View style={UserChatInputStyle.input_and_all_icons}>
        <ScrollView style={UserChatInputStyle.scroll_inputText}>
          <TextInput
            style={UserChatInputStyle.input(height)}
            placeholder="Type here"
            value={currentMessage}
            onChangeText={txt => {
              setCurrentMessage(txt);
            }}
            keyboardType="twitter"
            multiline={true}
            placeholderTextColor={AppColors.gray}
            onContentSizeChange={onContentSizeChange}
            underlineColorAndroid={'transparent'}
          />
        </ScrollView>
        <View style={UserChatInputStyle.camera_and_papercliper}>
          <TouchableOpacity onPress={()=>{
            
          }}>
            <Icons.FontAwesome name="paperclip" size={wp('6.5%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              requestCameraAndAudioPermission();
              launchImageLibrary({
                maxWidth: hp('18%'),
                maxHeight: hp('18%'),
              }).then(async Response => {
                console.log(Response.assets[0]);
                // setImagMessage(Response.assets[0])

                const formdata = new FormData();
                if (currentMessage !== '') {
                  formdata.append('content', currentMessage.trim());
                } else {
                  formdata.append('content', 'image');
                }
                formdata.append('name', item.name);
                formdata.append('senderId', item.userId);
                formdata.append('recieverId', item.recieverId);

                formdata.append('ChatMe_Image', {
                  uri: Response.assets[0].uri,
                  type: Response.assets[0].type,
                  name: Response.assets[0].fileName,
                });
                fetch(`${baseUrl}/sendImageMsg`, {
                  method: 'POST',
                  body: formdata,
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log('res aya', data);
                    setImagMessage(data.newImage);
                  })
                  .catch(error => console.log('res error', error));
              });
            }}>
            <Icons.FontAwesome name="camera" size={wp('5.5%')} />
          </TouchableOpacity>
        </View>
      </View>
      {currentMessage == '' ? (
        <TouchableOpacity>
          <View style={[UserChatInputStyle.microphoneContainerView]}>
            <Icons.FontAwesome
              name="microphone"
              size={wp('5.7%')}
              color={AppColors.white}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[UserChatStyle.microphoneContainerView]}
          onPress={() => {
            if (currentMessage.trim() != null) {
              sendMessage();
            }
          }}>
          {isSending ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Show loading animation
          ) : (
            <Text style={[UserChatStyle.sendButtonText]}>Send</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserChatInput;
