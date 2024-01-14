import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView, Image, ActivityIndicator, ToastAndroid
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import UserChatStyle from '../../../assets/styles/UserChatStyle';
import UserChatHeader from '../../../components/Headers/ChatHeader/UserChatHeader';
import UserChatInput from '../../../components/ChatInput/UserChatInput';
import AppContext from '../../../context/AppContext';
import ChangedChatHeader from '../../../components/Headers/ChatHeader/ChangedChatHeader';
import RenderChats from '../../../components/RenderAllChats/RenderChats';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { ThemeContext } from '../../../context/ThemeContext';
import { socket } from "../../../helpers/Socket/Socket";
import { PaperProvider, TouchableRipple } from 'react-native-paper';
import { SelectImage } from '../../../helpers/launchCameraHelper/SelectImage';
import ReactNativeModal from 'react-native-modal';
import GroupChatStyle from '../../../assets/styles/GroupScreenStyle/GroupChatStyle';
import { Icons } from '../../../assets/Icons';
import axios from 'axios';

const UserChat = (props) => {

  // GLOBAL STATES
  const { baseUrl, currentUser, token, apiKey } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  // VARIABLES
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const [changeHeader, setChangeHeader] = useState(false);
  const [imagMessage, setImagMessage] = useState('');
  const [document, setDocument] = useState('');
  const [msgId, setMsgId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [lastAction, setLastAction] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false)
  const [iInitBlock, setIinitBlock] = useState(false)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // PARAMS
  const { contact, allMsgs } = props.route.params;
  const receiver = contact.contactData;
  // console.log('ak', allMsgs)
  // FUNCTIONS

  const scrollToBottom = () => {
    // // console.log('---------------------');
    // console.log('scrollToBottom singleuserchat called');
    // // console.log('----------------------');
    if (messageList) {
      if (flatListRef.current && messageList.length > 0) {
        flatListRef.current.scrollToEnd({ behavior: 'smooth' });
      }
    }
  };
  const DeleteMessage = async msgId => {
    setLastAction('delete')
    const formData = new FormData();
    formData.append('_id', msgId);
    formData.append('userId', currentUser.userId);
    formData.append('receiverId', receiver._id);

    try {
      const response = await fetch(`${baseUrl}/deleteMessage`, {
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
        const updatedMessageList = messageList.filter(message => {
          if (message._id === msgId) {
            return false;
          }
          return true;
        });
        setMessageList(updatedMessageList);
        setChangeHeader(!changeHeader);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const clearChat = async () => {
    setLastAction('delete')
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('chatId', contact._id);
    formData.append('receiverId', receiver._id);

    try {
      const response = await fetch(`${baseUrl}/clearChatHistory`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      // // console.log(data.clearedArray)
      // // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        if (data.success) {
          setMessageList(data.clearedArray);
        } else {
          // console.log("chat is not cleared")
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  // const messagesFromDb = async () => {
  //   const res = await fetch(`${baseUrl}/messages?chatId=${contact._id}&userId=${currentUser.userId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await res.json();

  //   if (data.message == 'Please provide a valid token.') {
  //     Alert.alert('Provide a valid token.');
  //   } else if (data.message == 'Please provide a token.') {
  //     Alert.alert('Token required');
  //   } else {
  //     const filterMsgs = data.filter(message => {
  //       return !message.deletedBy.includes(currentMessage.userId);
  //     });
  //     setMessageList(filterMsgs);
  //     // console.log('//////////////////\\\\\\\\\\\\\\\\\\',messageList)
  //     setIsLoading(false)
  //   }
  // };
  const joinPrivateChat = async () => {
    const joinData = {
      receiverId: receiver._id,
      receiverName: receiver.name,
      senderId: currentUser.userId,
      senderName: currentUser.name,
      chatId: contact._id,
    };

    socket.emit('join_private_chat', joinData);
    // return () => {
    //   socket.disconnect();
    // };
  };
  const handleSelectImage = async () => {
    SelectImage(setImagMessage)
  };
  const sendImageMessage = async () => {
    // console.log("{{{{{{}}}}}}", imagMessage)
    const formdata = new FormData();
    // console.log("KKKKKKKKKK", typeof imagMessage)
    formdata.append('content', 'ChatMe_Image');
    formdata.append('senderId', currentUser.userId);
    formdata.append('recieverId', receiver._id);
    formdata.append('chatId', contact._id);
    formdata.append('ChatMe_Image', imagMessage);

    const response = await fetch(`${baseUrl}/sendImageMsg`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });

    if (!response.ok) {
      // console.log("+>", response)
      hideModal()
      throw new Error(`HTTP error image! Status: ${response.status}`);
    } else {
      const data = await response.json();
      // console.log('send img res', data.newImage);
      scrollToBottom()
      hideModal()
    }

    // console.error(`catch sending img msg error: ${error.message}`);

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
            senderId: currentUser.userId,
            receiverId: receiver._id,
            chatId: contact._id,
            mood: moodOfUser,
          };
          console.log('kkmm',messageData)
          await socket.emit('send_message', messageData);
          setIsSending(false);
          scrollToBottom();
          setCurrentMessage('');
        } else {
          setIsSending(false);
        }
      })
      .catch(async error => {
        console.error('Error detecting mood:', error);
        const messageData = {
          content: currentMessage.trim(),
          senderId: currentUser.userId,
          receiverId: receiver._id,
          chatId: contact._id,
          mood: 'normal',
        };
        console.log('kkmm cth',messageData)

        await socket.emit('send_message', messageData);
        setIsSending(false);
        setCurrentMessage('');
        scrollToBottom()
      });
  };
  const handleGetCurrentMsg = async (msgData) => {
    console.log('🕊️🕊️🕊️msgData', msgData)
    setMessageList(prevList => [...prevList, msgData]);
    scrollToBottom()
    if (currentUser.userId == msgData.receiverId) {
      try {
        await socket.emit('message_read_ack', { messageId: msgData._id });
        setNewMsgCount(0)
      } catch (error) {
        console.error('Error sending read acknowledgment:', error);
      }
    }
  };
  const userBlocked = async () => {
    const formData = new FormData();
    formData.append('senderId', currentUser.userId);
    formData.append('chatId', contact._id);
    formData.append('receiverId', receiver._id);

    try {
      const response = await fetch(`${baseUrl}/blockUser`, {
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
        if (data.success) {
          // console.log("user blocked")
          setIsBlocked(true)
          setIinitBlock(true)
        } else {
          // console.log("user not blocked")
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    };

  };
  const userUnBlocked = async () => {
    const formData = new FormData();
    formData.append('senderId', currentUser.userId);
    formData.append('chatId', contact._id);
    formData.append('receiverId', receiver._id);

    try {
      const response = await fetch(`${baseUrl}/unBlockUser`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      // // console.log(data.clearedArray)
      // // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      }
      // else {
      if (data.msg == 'user unBlocked successfuly') {
        // console.log("user unblocked")
        setIinitBlock(false)
        setIsBlocked(false)
      } else {
        // console.log("user not unblocked")
        setIinitBlock(true)

      }
      // }
    } catch (error) {
      console.error('Error in unblocking:', error);
    };

  };
  const isUserBlocked = async () => {
    const formdata = new FormData();

    formdata.append('senderId', currentUser.userId);
    formdata.append('receiverId', receiver._id);
    formdata.append('chatId', contact._id);

    try {
      // console.log("try block req")
      const response = await fetch(`${baseUrl}/checkBlockUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      const data = await response.json(); // Parse the response body as JSON
      // console.log('block res', data);
      if (data.msg == "Your friend blocked you.") {
        // console.log('111...')
        ToastAndroid.showWithGravity('Your friend blocked you.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(false)
      } else if (data.msg == "You blocked this user.") {
        ToastAndroid.showWithGravity('You blocked this user.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(true)
      } else if (data.msg == "Both users have blocked each other.") {
        ToastAndroid.showWithGravity('Both have blocked each other.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(true)
      }
    } catch (error) {
      console.error('Error in block res:', error);
    }
  };

  // HOOKS
  useEffect(() => {
    socket.on(`receive_message`, handleGetCurrentMsg);
    socket.on(`receive_image_message`, handleGetCurrentMsg);
    return () => {
      socket.off(`receive_message`, handleGetCurrentMsg);
      socket.off(`receive_image_message`, handleGetCurrentMsg);
    };
  }, [handleGetCurrentMsg]);
  useEffect(() => {
    setMessageList(allMsgs)
  }, []);
  useEffect(() => {
    joinPrivateChat();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    isUserBlocked()
  }, [])
  return (
    <PaperProvider>
      <View styles={UserChatStyle.contianer(theme.chatScreenColor)}>
        <Primary_StatusBar />
        <View style={{ height: hp('100%'), width: wp('100%') }}>
          {changeHeader != true ? (
            <UserChatHeader item={receiver} navigation={props.navigation} clearFunc={() => { clearChat() }} iInitBlock={iInitBlock} blockFunc={()=>{userBlocked()}} unBlockFunc={()=>{userUnBlocked()}} isBlocked={isBlocked} />
          ) : (
            <ChangedChatHeader
              // msgId={msgId}
              navigation={props.navigation}
              setChangeHeader={setChangeHeader}
              DeleteFunction={() => {
                DeleteMessage(msgId);
              }}

            />
          )}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[UserChatStyle.container2(theme.chatScreenColor)]}>
              {/* {isLoading && <View style={UserChatStyle.contianer(theme.chatScreenColor)}><ActivityIndicator size="small" color={'black'} /></View>} */}
              <FlatList
                data={messageList}
                renderItem={({ item }) => (
                  <RenderChats
                    navigation={props.navigation}
                    msgItem={item}
                    receiver={receiver}
                    setChangeHeader={setChangeHeader}
                    setMsgId={setMsgId}
                    document={document}
                    changeHeader={changeHeader}
                    msgId={msgId}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onContentSizeChange={() => {
                  if (lastAction !== 'delete') {
                    scrollToBottom();
                  }
                  setLastAction(null);
                }}
                contentContainerStyle={[UserChatStyle.messagesContainer]}
                ref={flatListRef}
              />
            </View>

            {!isBlocked && <UserChatInput
              inputRef={inputRef}
              callScrollToBottomFunc={() => { scrollToBottom() }}
              callSendMessageFunc={() => { sendMessage() }}
              callSendImageMessageFunc={() => { handleSelectImage().then(() => { showModal() }) }}
              isSending={isSending}
              currentMessage={currentMessage}
              setCurrentMessage={(msg) => setCurrentMessage(msg)}
            />
            }
          </KeyboardAvoidingView>
        </View>
      </View>
      <ReactNativeModal
        isVisible={visible}
        onDismiss={hideModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        coverScreen={true}
        style={GroupChatStyle.modalStyle}
      >
        <View style={GroupChatStyle.modalMainView}>
          <ScrollView
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          // maximumZoomScale={2} 
          >
            <ScrollView
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              horizontal={true}
            >
              <Image
                source={{ uri: imagMessage ? imagMessage.uri : null }}
                style={GroupChatStyle.image}
              />
            </ScrollView>
          </ScrollView>
          <View style={GroupChatStyle.iamgeHeader}>
            <TouchableRipple
              rippleColor={theme.rippleColor}
              borderless
              onPress={() => {
                hideModal();
              }}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={GroupChatStyle.microphoneContainerView}>
                <Icons.Ionicons
                  name="close"
                  size={wp('5.7%')}
                  color={'black'}
                />
              </View>
            </TouchableRipple>
            <TouchableRipple
              rippleColor={theme.rippleColor}
              borderless
              onPress={() => {
                sendImageMessage();
              }}>
              <View style={GroupChatStyle.microphoneContainerView}>
                <Icons.Octicons
                  name="check"
                  size={wp('5.7%')}
                  color={'black'}
                />
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ReactNativeModal>
    </PaperProvider>

  );
};

export default UserChat;
