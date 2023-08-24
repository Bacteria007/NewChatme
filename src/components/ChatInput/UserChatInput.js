import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Dimensions,
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
import { requestCameraAndAudioPermission } from '../Permission/Permission';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AppContext from '../../context/AppContext';
import axios from 'axios';


const UserChatInput = ({
  receiver,
  socket,
  setMessageList,
  setDocument,
  currentMessage,
  setCurrentMessage,
}) => {
  const { baseUrl, storedUser  } = useContext(AppContext);
    // console.log("item%%%%%%%%%%%", item)
  const apiKey = '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';

  const screenDimensions = Dimensions.get('window');
  const [isSending, setIsSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [height, setHeight] = useState(hp('2%')); // Initialize height with a default value
  const [marginBottom, setMarginBottom] = useState(hp('0.1%'))
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const [inputHeight, setInputHeight] = useState(0);

  const handleContentSizeChange = ( contentHeight) => {
    setInputHeight(Math.min(contentHeight, 6 * 18)); // Assuming each line has an average height of 18
    setIsScrollEnabled(contentHeight / 18 > 6); // Assuming each line has an average height of 18
  };  // onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}

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
            senderId: storedUser.userId,
            receiverId: receiver._id,
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
          name: receiver.name,
          senderId: storedUser.userId,
          receiverId: receiver._id,
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
      maxWidth: 800,
      maxHeight: 800,
      selectionLimit:4
    }).then(async Response => {
      if(Response.didCancel){
        console.log("user cancelled image")
      }else if(Response.error){
        console.log("ImgPicker error",Response.error)
      }else {
        console.log(Response.assets);
        Response.assets.map((item)=>{
          setSelectedImage(oldSelected=>[...oldSelected,item.uri,item.type,item.fileName])
        })
console.log("selected img",selectedImage)
      }
      
      // const formdata = new FormData();
      // if (currentMessage !== '') {
      //   formdata.append('content', currentMessage.trim());
      // } else {
      //   formdata.append('content', 'ChatMe_Image');
      // }
      // formdata.append('name', item.name);
      // formdata.append('senderId', item.userId);
      // formdata.append('recieverId', item.recieverId);

      // formdata.append('ChatMe_Image', {
      //   uri: Response.assets[0].uri,
      //   type: Response.assets[0].type,
      //   name: Response.assets[0].fileName,
      // });
      // fetch(`${baseUrl}/sendImageMsg`, {
      //   method: 'POST',
      //   body: formdata,
      // })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error(`HTTP error image! Status: ${response.status}`);
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     console.log('send img res', data);
      //     setImagMessage(data.newImage);
      //   })
      //   .catch(error => console.log('res error image', error));
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
       formData.append('senderId', storedUser.userId);
       formData.append('recieverId', receiver._id);
 
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
   const [keyboardOpen, setKeyboardOpen] = useState(false);
  //  const handleContentSizeChange = ( contentHeight) => {
  //   // Adjust the number (6) according to your requirement
  //   setIsScrollEnabled(contentHeight / 18 > 6); // Assuming each line has an average height of 18
  // };

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
    <View style={[UserChatInputStyle.main_input_and_mic,{paddingBottom: keyboardOpen ? screenDimensions.width * 0.06 : screenDimensions.width * 0}]}>
      <View style={UserChatInputStyle.input_and_all_icons}>
        <ScrollView style={UserChatInputStyle.scroll_inputText}>
          <TextInput
          // style={UserChatInputStyle.input(height)}
          style={[
            { width: wp('58%'), alignSelf: 'center', alignItems: 'center' },
            { height: inputHeight, maxHeight: 6 * 18 },
          ]}
            placeholder="Type here"
            value={currentMessage}
            onChangeText={(txt)=>{setCurrentMessage(txt)}}
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
            // onFocus={()=>{setMarginBottom(screenDimensions.width * 0.05)}}
            // onBlur={()=>setMarginBottom(screenDimensions.width * 0.02)}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
        onPress={() => {
          if (currentMessage.trim() != null) {
            sendMessage();
          }
        }}>
          <View
        style={[UserChatInputStyle.microphoneContainerView]}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Show loading animation
          ) : (
            // <Text style={[UserChatStyle.sendButtonText]}>Send</Text>
            <Icons.Ionicons name='send-sharp' size={wp('5.7%')} color={AppColors.white}/>
          )}
          </View>
        </TouchableOpacity>
      )}
    </View>
    
  );
};

export default UserChatInput;
