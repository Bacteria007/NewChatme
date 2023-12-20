import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList, TouchableOpacity, Platform, Dimensions, Image, } from 'react-native';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import AppContext from '../../../context/AppContext';
import GroupMsgItem from '../../../components/MessageItem/GroupMsgItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GroupChatInput from '../../../components/ChatInput/GroupChatInput';
import PushNotification from 'react-native-push-notification';
import GroupChatHeader from '../../../components/Headers/ChatHeader/GroupChatHeader';
import { ThemeContext } from '../../../context/ThemeContext';
import { launchImageLibrary } from 'react-native-image-picker';
import ReactNativeModal from 'react-native-modal';
import GroupChatStyle from '../../../assets/styles/GroupScreenStyle/GroupChatStyle';
import { Icons } from '../../../assets/Icons';
import { ScrollView } from 'react-native';
import { PaperProvider, TouchableRipple } from 'react-native-paper';
import axios from 'axios';
import ChangedChatHeader from '../../../components/Headers/ChatHeader/ChangedChatHeader';
import {socket} from "../../../helpers/Socket/Socket";

const GroupChat = props => {

  // VARIABLES
  const { item } = props.route.params;
  const { baseUrl, currentUser, token, apiKey } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  let userId = currentUser.userId;
  console.log('userId====', userId);
  console.log('currentUser===', currentUser);
  const groupId = item._id;
  const [newMsg, setNewMsg] = useState('');
  const [selecetdImageMsg, setSelecetdImageMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const [changeHeader, setChangeHeader] = useState(false);
  const [msgId, setMsgId] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // FUNCTION
  const sendMessage = async () => {
    setIsSending(true);
    await axios
      .post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Detect the mood of the following text and give result in  emoji make sure emoji will be one : "${newMsg.trim()}"`,
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
          const msgData = {
            text: newMsg,
            sender_id: currentUser.userId,
            sender_name: currentUser.name,
            sender_phone: currentUser.phoneNumber,
            groupId: groupId,
            msg_type: 'text',
            mood: moodOfUser,
          };
          console.log('msg ^^^^^^^^^^^^^^^^', msgData);
          await socket.emit('send_group_message', msgData);
          setIsSending(false);
          scrollToBottom();
          setNewMsg('');
        } else {
          setIsSending(false);
        }
      })
      .catch(async error => {
        console.error('Error detecting mood:', error);
        const msgData = {
          text: newMsg,
          sender_id: currentUser.userId,
          sender_name: currentUser.name,
          sender_phone: currentUser.phoneNumber,
          groupId: groupId,
          msg_type: 'text',
          mood: 'normal',
        };
        console.log('msg ^^^^^^^^^^^^^^^^', msgData);
        await socket.emit('send_group_message', msgData);
        setNewMsg('');
        scrollToBottom();
        setIsSending(false);
      });
  };

  const sendImageMessage = async () => {

    console.log('imageMsgData ^^^^^^^^^^^^^^^^', selecetdImageMsg);
    const formData = new FormData()
    formData.append("text", "ChatMe_Iamge")
    formData.append("sender_id", currentUser.userId)
    formData.append("sender_name", currentUser.name)
    formData.append("groupId", groupId)
    formData.append("msg_type", 'image')
    formData.append("ChatMe_Image", selecetdImageMsg);
    const result = await fetch(`${baseUrl}/sendGroupImageMsg`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    });
    if (result.ok) {
      const data = await result.json();
      const newImageMsg = await data.newImage
      setMsgList([...msgList, newImageMsg])
      console.log("((((((((((((((+>")
      console.log(msgList)
      console.log("((((((((((((((+>")
      hideModal();
      scrollToBottom();
    } else {
      console.log("((((((((((((((+>", result)
      throw new Error(`HTTP error image! Status: ${result.status}`);
    }
  };
  const DeleteGroupMessage = async msgId => {
    setLastAction('delete');
    console.log("GGGGGGGGG")
    console.log(msgId)
    console.log("GGGGGGGGG")
    const formData = new FormData();
    formData.append('msgId', msgId);
    formData.append('groupId', groupId);

    try {
      const response = await fetch(`${baseUrl}/deleteGroupMessage`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json(); // Parse the response body as JSON
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        const updatedMessageList = data.messages;
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log(updatedMessageList);
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        setMsgList(updatedMessageList);
        setChangeHeader(false);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setChangeHeader(false);
    }
  };
  const clearGroupChat = async msgId => {
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('groupId', groupId);

    try {
      const response = await fetch(`${baseUrl}/clearGroupChat`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json(); // Parse the response body as JSON
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        const updatedMessageList = data.clearedArray;
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log(updatedMessageList);
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        if (data.success) {
          setMsgList(data.clearedArray);
        } else {
          console.log("chat is not cleared")
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const handleNotification = item => {
    if (item.sender_id != userId) {
      PushNotification.localNotification({
        channelId: '1233',
        title: `${item.sender_name}`.toUpperCase(),
        message: `${item.text}`,
        color: 'red',
        // bigText:`${item.sender_name} = ${item.text}`
      });
    }
  };
  const handleGetCurrentMsg = msgData => {
    if (msgData.sender_id != userId) {
      handleNotification(msgData);
    } else {
      console.log('msg notification gya tmhary receiver ko');
    }
    setMsgList([...msgList, msgData]);
    console.log("%%%%%%%%%%%")
    console.log(msgData)
    console.log("%%%%%%%%%")
    scrollToBottom();
  };
  const receivePreviousMessagesFromDb = async () => {
    await fetch(`${baseUrl}/message_history/?groupId=${groupId}&userId=${currentUser.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        const msgs = await res.json();
        if (msgs.message == 'Please provide a valid token.') {
          Alert.alert('Provide a valid token.');
        } else if (msgs.message == 'Please provide a token.') {
          Alert.alert('Token required');
        } else {
          setMsgList(msgs);
          scrollToBottom();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const selectImage = () => {
    const options = {
      maxWidth: 1080,
      maxHeight: 1080,
    };
    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
        console.log('User cancelled image picker');
      } else if (Response.error) {
        console.log('ImagePicker Error: ', Response.error);
      } else {
        const imageMessage = { uri: Response.assets[0].uri, name: Response.assets[0].fileName, type: Response.assets[0].type };
        setSelecetdImageMsg(imageMessage);
      }
    }).then(() => {
      showModal();
    });
  };
  const scrollToBottom = () => {
    console.log('scrollToBottom called----------');
    if (flatListRef.current && msgList.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  // EFFECTS
  useEffect(() => {
    scrollToBottom();
  }, []);
  // get currently sent message
  useEffect(() => {
    socket.on('getCurrentMsg', handleGetCurrentMsg);
    // socket.on('getCurrentImageMsg', handleGetCurrentMsg);
    // Clean up the event listener when component unmounts
    return () => {
      socket.off('getCurrentMsg', handleGetCurrentMsg);
      // socket.off('getCurrentImageMsg', handleGetCurrentMsg);
    };
  }, [handleGetCurrentMsg]);

  useEffect(() => {
    receivePreviousMessagesFromDb();
    props.navigation.addListener('focus', () => {
      receivePreviousMessagesFromDb();
    });
  }, []);
  const joinGroupChat = async () => {
    const data = { user_name: currentUser.name, group_name: item.group_name,groupId:groupId }
    socket.emit('join_group_chat', data);
    // Clean up when component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  };
  useEffect(() => {
    joinGroupChat();
  }, []);

  return (
    <PaperProvider>
      <GestureHandlerRootView
        style={GroupChatStyle.container(theme.backgroundColor)}>
        <KeyboardAvoidingView
          style={GroupChatStyle.secondContainer(theme.backgroundColor)}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 22}>
          <Primary_StatusBar />
          {changeHeader ? (
            <ChangedChatHeader
              // ID={msgId}
              DeleteFunction={() => { DeleteGroupMessage(msgId) }}
              setChangeHeader={setChangeHeader}
              navigation={props.navigation}
            />
          ) : (
            <GroupChatHeader navigation={props.navigation} item={item} callClearGroupChat={() => { clearGroupChat() }} />
          )}
          <View style={{ flex: 1 }}>
            {msgList.length != 0 ? (
              <FlatList
                data={msgList.length != 0 ? msgList : []}
                renderItem={({ item }) => (
                  <GroupMsgItem
                    msgData={item}
                    changeHeader={changeHeader}
                    setChangeHeader={setChangeHeader}
                    msgId={msgId}
                    setMsgId={setMsgId}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onContentSizeChange={() => {
                  if (lastAction !== 'delete') {
                    scrollToBottom();
                  }
                  setLastAction(null);
                }}
                contentContainerStyle={{ flexGrow: 1 }}
                ref={flatListRef}
              // keyboardShouldPersistTaps='never'
              // extraData={msgList.length != 0 ? msgList : []}
              // enableOnAndroid={false}
              />
            ) : (
              <View style={GroupChatStyle.startConvBtn}>
                <Text style={GroupChatStyle.startConvText}>
                  Start Conversation
                </Text>
              </View>
            )}
          </View>
          <GroupChatInput
            scrollToBottomFunc={() => {
              scrollToBottom();
            }}
            inputRef={inputRef}
            inputVal={newMsg}
            setter={msg => setNewMsg(msg)}
            sendMessageFunc={() => {
              sendMessage();
            }}
            sendGroupImageMessage={() => {
              selectImage();
            }}
            isSending={isSending}
          />
        </KeyboardAvoidingView>
        <ReactNativeModal
          visible={visible}
          onDismiss={hideModal}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          coverScreen={true}
          style={GroupChatStyle.modalStyle}>
          <View style={GroupChatStyle.modalMainView}>
            <ScrollView>
              <Image
                source={{ uri: selecetdImageMsg ? selecetdImageMsg.uri : null }}
                style={GroupChatStyle.image}
              />
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
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default GroupChat;