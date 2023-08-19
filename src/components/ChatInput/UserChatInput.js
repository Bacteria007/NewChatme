import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
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
import axios from 'axios';
import Pdf from 'react-native-pdf';
// import EmojiPicker from 'rn-emoji-keyboard';

const UserChatInput = ({
  item,
  socket,
  setMessageList,
  setImagMessage,
  addContact,
  setDocument,
  // sendMessage,
  // imagMessage,
  // currentMessage,
  // setCurrentMessage,
  // isSending,
}) => {
  const {
    language,
    baseUrl,
    storedUser,
    getStoredUserDetails,
    selectedImageUri,
    storeImageUri,
  } = useContext(AppContext);
  const apiKey = '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';


  const [currentMessage, setCurrentMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  // const [messageList, setMessageList] = useState([]);
  // const [imagMessage, setImagMessage] = useState('');
  const [videoMessage, setVideoMessage] = useState('');
  const [textMessage, setTextMessage] = useState('');
  // const [isSending, setIsSending] = useState(false)
  const [height, setHeight] = useState(hp('2%')); // Initialize height with a default value
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

  const sendMessage = async () => {
    setIsSending(true);
    addContact();
    await axios
      .post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Detect the mood of the following text and give result in  emoji make sure emoji will be one : "${currentMessage.trim()}"`,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      .then(async response => {
        const moodOfUser = response.data.choices[0].text.trim();

        if (moodOfUser != '') {
          const messageData = {
            content: currentMessage.trim(),
            name:item.name, 
            senderId:item.userId,
            recieverId:item.recieverId,
            mood: moodOfUser,
          };
          console.log('frontend', messageData);

          await socket.emit('send_message', messageData);
          setMessageList(list => [...list, messageData]);
          setCurrentMessage('');
          setIsSending(false);
        }
        setIsSending(false);
      })
      .catch(async error => {
        console.error('Error detecting mood:', error);
        const messageData = {
          content: currentMessage.trim(),
          name:item.name, 
          senderId:item.userId,
          recieverId:item.recieverId,
          mood: 'normal',
        };
        console.log('frontend', messageData);

        await socket.emit('send_message', messageData);
        setMessageList(list => [...list, messageData]);
        setCurrentMessage('');
        setIsSending(false);
      });
  };

  const sendImageMessage=()=>{
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
        formdata.append('content', 'ChatMe_Image');
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
            throw new Error(`HTTP error image! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('send img res', data);
          setImagMessage(data.newImage);
        })
        .catch(error => console.log('res error image', error));
    });

  }
  const selectDoc = async () => {
    try {
       const doc = await DocumentPicker.pick({
         // type: [DocumentPicker.types.pdf],
        //  allowMultiSelection: true
       });
       // const doc = await DocumentPicker.pickSingle()
       // const doc = await DocumentPicker.pickMultiple({
       //   type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
       // })
      console.log("doc",doc)
       const formData = new FormData();
       if (currentMessage !== '') {
         formData.append('content', currentMessage.trim());
       } else {
         formData.append('content', 'document');
       }
       formData.append('name', item.name);
       formData.append('senderId', item.userId);
       formData.append('recieverId', item.recieverId);
 
       doc.forEach(item => {
        formData.append('document', {
          uri: item.uri,
          type: item.type,
          name: item.name,
        });
      });
      // formData.append('document', JSON.stringify({
      //   name: item.name,
      //   type: item.type,
      //   uri: item.uri,
      // }));
   
       const response = await fetch(`${baseUrl}/sendDocMsg2`, {
         method: 'POST',
         body: formData,
        //  headers: {
        //   'Content-Type': 'application/json',
        // },
       });
   
       if (response.ok) {
         console.log('Document uploaded successfully');
         setDocument(response.result)
       } else {
         console.log('Document upload failed');
       }
     } catch (err) {
       if (DocumentPicker.isCancel(err)) {
         console.log('User cancelled the upload', err);
       } else {
         console.log(err);
       }
     }
   }
 

  return (
    <View style={UserChatInputStyle.main_input_and_mic}>
      <View style={UserChatInputStyle.input_and_all_icons}>
        <ScrollView style={UserChatInputStyle.scroll_inputText}>
          <TextInput
          style={UserChatInputStyle.input(height)}
            placeholder="Type here"
            value={currentMessage}
            onChangeText={(txt)=>{setCurrentMessage(txt)}}
            keyboardType='twitter'
            multiline={true}
            placeholderTextColor={AppColors.gray}
            onContentSizeChange={onContentSizeChange}
            underlineColorAndroid={'transparent'}

          />
        </ScrollView>
        <View style={UserChatInputStyle.camera_and_papercliper}>
          <TouchableOpacity onPress={()=>{
            selectDoc()
          }}>
            <Icons.FontAwesome name="paperclip" size={wp('6.5%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const permission=requestCameraAndAudioPermission();
              if(permission){
                sendImageMessage()
              }else
              requestCameraAndAudioPermission()
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
