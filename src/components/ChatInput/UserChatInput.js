import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Icons } from '../../assets/Icons';
import UserChatInputStyle from '../../assets/styles/UserChatInputStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AppContext from '../../context/AppContext';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';
import { requestCameraAndGalleryPermission } from '../Permission/Permission';


const UserChatInput = ({
  receiver,
  socket,
  setMessageList,
  setDocument,
  currentMessage,
  setCurrentMessage,
  chatId,
  messageget,
  inputRef,
  callScrollToBottomFunc,
}) => {
  const { baseUrl, currentUser, token, apiKey } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const iconsColor = AppColors.coolgray
  const iconsColor2 = AppColors.black
  const screenDimensions = Dimensions.get('window');
  const [isSending, setIsSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleContentSizeChange = (contentHeight) => {
    setInputHeight(Math.min(contentHeight, 6 * 18)); // Assuming each line has an average height of 18
    setIsScrollEnabled(contentHeight / 18 > 6); // Assuming each line has an average height of 18
  };
  const sendMessage = async () => {
    setIsSending(true);
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
            name: receiver.name,
            senderId: currentUser.userId,
            receiverId: receiver._id,
            chatId: chatId,
            mood: moodOfUser,
          };
          await socket.emit('send_message', messageData);
          setMessageList(list => [...list, messageData]);
          callScrollToBottomFunc();
          setCurrentMessage('');
          messageget();
          setIsSending(false);
        }
        setIsSending(false);
      })
      .catch(async error => {
        console.error('Error detecting mood:', error);
        const messageData = {
          content: currentMessage.trim(),
          name: receiver.name,
          senderId: currentUser.userId,
          receiverId: receiver._id,
          chatId: chatId,
          mood: 'normal',
        };

        await socket.emit('send_message', messageData);
        setMessageList(list => [...list, messageData]);
        callScrollToBottomFunc()
        setCurrentMessage('');
        messageget()
        setIsSending(false);
      });
  };
  const sendImageMessage = async () => {
    try {
      console.log('before launching image library');
      const Response = await launchImageLibrary({
        maxWidth: 1080,
        maxHeight: 1080,
        selectionLimit: 4,

      });
      console.log('After launching image library', Response);
      if (Response.didCancel) {
        console.log("user cancelled image");
      } else if (Response.error) {
        console.log("ImgPicker error", Response.error);
      } else {
        console.log("jis pr map lgaya************", typeof Response.assets);
        Response.assets.map((item) => {
          setCurrentMessage(oldSelected => [...oldSelected, item.uri, item.type, item.fileName]);
        });
      }
      const formdata = new FormData();
      console.log("KKKKKKKKKK", typeof currentMessage)
      // if (currentMessage !== '') {
      // console.log("HHHHH", currentMessage)
      // formdata.append('content', currentMessage.trim());
      // } else {
      //   console.log("JJJJJJJJJJJJJJ", currentMessage)
      formdata.append('content', 'ChatMe_Image');
      // }
      formdata.append('name', currentUser.name);
      formdata.append('senderId', currentUser.userId);
      formdata.append('recieverId', receiver._id);
      formdata.append('chatId', chatId);

      if (Response && Response.assets && Response.assets.length > 0) {
        formdata.append('ChatMe_Image', {
          uri: Response.assets[0].uri,
          type: Response.assets[0].type,
          name: Response.assets[0].fileName,
        });
      } else {
        console.log('library k response ka error')
      }

      const response = await fetch(`${baseUrl}/sendImageMsg`, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      if (!response.ok) {
        console.log("+>", response)
        setCurrentMessage('');
        throw new Error(`HTTP error image! Status: ${response.status}`);

      } else {
        const data = await response.json();
        console.log('send img res', data.newImage);
        setMessageList(list => [...list, data.newImage]);
        await setSelectedImage(data.newImage);
        callScrollToBottomFunc()
        setCurrentMessage('');
      }
    } catch (error) {
      console.error(`catch sending img msg error: ${error.message}`);
    }
  };

  const handleFocus = () => {
    if (!keyboardOpen) {
      setKeyboardOpen(true);
    }
  };
  const handleBlur = () => {
    if (keyboardOpen) {
      setKeyboardOpen(false);
    }
  };
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <View style={[UserChatInputStyle.main_input_and_mic(theme.chatScreenColor), { paddingBottom: keyboardOpen ? screenDimensions.width * 0.06 : screenDimensions.width * 0 }]}>
      <View style={UserChatInputStyle.input_and_all_icons}>
        <ScrollView style={UserChatInputStyle.scroll_inputText}>
          <TextInput
            style={UserChatInputStyle.input}
            placeholder="Message"
            value={typeof currentMessage === 'string' ? currentMessage : currentMessage[0]}
            onChangeText={(txt) => { setCurrentMessage(txt) }}
            keyboardType='twitter'
            multiline={true}
            placeholderTextColor={AppColors.gray}
            // onContentSizeChange={onContentSizeChange}
            onContentSizeChange={(e) =>
              handleContentSizeChange(
                e.nativeEvent.contentSize.height
              )
            }
            underlineColorAndroid={'transparent'}
            scrollEnabled={isScrollEnabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            const permission = requestCameraAndGalleryPermission();
            requestCameraAndGalleryPermission()
              .then((granted) => {
                console.log("perm------", granted)
                if (granted) {
                  sendImageMessage()
                } else {
                  console.log("permision denied")
                }
              }).catch((error) => {
                console.log(`permison ni chali: ${error}`);
                requestCameraAndGalleryPermission()
              })
          }}>
          <Icons.FontAwesome name="camera" size={wp('5.5%')} color={iconsColor} />
        </TouchableOpacity>

        {/* </View> */}
      </View>
      {currentMessage == '' ? (
        <TouchableOpacity>
          <View style={[UserChatInputStyle.microphoneContainerView]}>
            <Icons.FontAwesome
              name="microphone"
              size={wp('5.7%')}
              color={iconsColor2}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (typeof currentMessage === 'string' && currentMessage.trim() !== '') {
              sendMessage();
            } else if (typeof currentMessage === 'object') {
              sendImageMessage();
            }
          }}>
          <View
            style={[UserChatInputStyle.microphoneContainerView]}
          >
            {isSending ? (
              <ActivityIndicator size="small" color={iconsColor2} /> // Show loading animation
            ) : (

              <Icons.Ionicons name='send-sharp' size={wp('5.7%')} color={iconsColor2} />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>

  );
};

export default UserChatInput;

// const selectDoc = async () => {
//   try {
//     const doc = await DocumentPicker.pick({
//       // type: [DocumentPicker.types.pdf],
//       //  allowMultiSelection: true
//     });
//     // const doc = await DocumentPicker.pickSingle()
//     // const doc = await DocumentPicker.pickMultiple({
//     //   type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//     // })

//     const formData = new FormData();
//     if (currentMessage !== '') {
//       formData.append('content', currentMessage.trim());
//     } else {
//       formData.append('content', 'document');
//     }
//     formData.append('name', item.name);
//     formData.append('senderId', currentUser.userId);
//     formData.append('chatId', chatId);

//     doc.forEach(item => {
//       formData.append('document', {
//         uri: item.uri,
//         type: item.type,
//         name: item.name,
//       });
//     });
//     // formData.append('document', JSON.stringify({
//     //   name: item.name,
//     //   type: item.type,
//     //   uri: item.uri,
//     // }));

//     const response = await fetch(`${baseUrl}/sendDocMsg2`, {
//       method: 'POST',
//       body: formData,
//       //  headers: {
//       //   'Content-Type': 'application/json',
//       // },
//     });

//     if (response.ok) {
//       setDocument(response.result)
//     } else {
//       console.log('Document upload failed');
//     }
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       console.log('User cancelled the upload', err);
//     } else {
//       console.log(err);
//     }
//   }
// }