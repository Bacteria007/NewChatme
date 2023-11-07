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
  currentMessage,
  setCurrentMessage,
  inputRef,
  callSendMessageFunc,
  callSendImageMessageFunc,
  isSending
}) => {
  const { theme } = useContext(ThemeContext);
  const iconsColor = AppColors.coolgray
  const iconsColor2 = AppColors.black
  const screenDimensions = Dimensions.get('window');
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleContentSizeChange = (contentHeight) => {
    setInputHeight(Math.min(contentHeight, 6 * 18)); 
    setIsScrollEnabled(contentHeight / 18 > 6); 
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
        <ScrollView style={UserChatInputStyle.scroll_inputText} scrollEnabled showsVerticalScrollIndicator>
          <TextInput
            style={[UserChatInputStyle.input,{maxHeight:inputHeight}]}
            placeholder="Message"
            value={currentMessage}
            onChangeText={(txt) => { setCurrentMessage(txt) }}
            keyboardType='twitter'
            multiline={true}
            
            placeholderTextColor={AppColors.gray}
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
        {currentMessage == '' && <TouchableOpacity
          onPress={() => { callSendImageMessageFunc() }}>
          <Icons.FontAwesome name="camera" size={wp('5.5%')} color={iconsColor} />
        </TouchableOpacity>
        }
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
          onPress={() => { callSendMessageFunc() }}>
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