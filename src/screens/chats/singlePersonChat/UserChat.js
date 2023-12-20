import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
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
import {socket} from "../../../helpers/Socket/Socket";
import { PaperProvider } from 'react-native-paper';
const UserChat = (props) => {

  // GLOBAL STATES
  const { baseUrl, currentUser, token, chatWithNewMsg, setChatWithNewMsg } = useContext(AppContext);
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
  const [lastAction, setLastAction] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false)
  const [iInitBlock, setIinitBlock] = useState(false)

  // PARAMS
  const { contact } = props.route.params;
  const receiver = contact.contactData;

  // FUNCTIONS
  const [onlineUsers, setOnlineUsers] = useState([]);
  const showOnlineUsers = async (users) => {
    await setOnlineUsers(users);
  }
  const scrollToBottom = () => {
    // console.log('---------------------');
    console.log('scrollToBottom singleuserchat called');
    // console.log('----------------------');
    if (flatListRef.current && messageList.length > 0) {
      flatListRef.current.scrollToEnd({ behavior: 'smooth' });
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
      // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      // console.log(data.clearedArray)
      // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        if (data.success) {
          setMessageList(data.clearedArray);
        } else {
          console.log("chat is not cleared")
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
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
          console.log("user blocked")
          setIsBlocked(true)
          setIinitBlock(true)
        } else {
          console.log("user not blocked")
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
    // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
    // console.log(data.clearedArray)
    // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
    if (data.message == 'Please provide a valid token.') {
      Alert.alert('Provide a valid token.');
    } else if (data.message == 'Please provide a token.') {
      Alert.alert('Token required');
    } 
    // else {
      if (data.msg=='user unBlocked successfuly') {
        console.log("user unblocked")
        setIinitBlock(false)
        setIsBlocked(false)
      } else {
        console.log("user not unblocked")
        setIinitBlock(true)

      }
    // }
  } catch (error) {
    console.error('Error in unblocking:', error);
};

};

  const handleGetCurrentMsg = msgData => {
    // console.log("######################")
    // console.log(msgData)
    // console.log("######################")
    if (msgData.senderId !== currentUser.userId) {
      setMessageList([...messageList, msgData])
    }
  };
  const messagesFromDb = async () => {
    const res = await fetch(`${baseUrl}/messages?chatId=${contact._id}&userId=${currentUser.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data.message == 'Please provide a valid token.') {
      Alert.alert('Provide a valid token.');
    } else if (data.message == 'Please provide a token.') {
      Alert.alert('Token required');
    } else {
      const filterMsgs = data.filter(message => {
        return !message.deletedBy.includes(currentMessage.userId);
      });
      setMessageList(filterMsgs);
    }
  };
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
  const isUserBlocked = async () => {
    const formdata = new FormData();

    formdata.append('senderId', currentUser.userId);
    formdata.append('receiverId', receiver._id);
    formdata.append('chatId', contact._id);

    try {
      console.log("try block req")
      const response = await fetch(`${baseUrl}/checkBlockUser`, {
        method: 'POST',
        headers: {         
          'Content-Type': 'multipart/form-data',
         },
        body: formdata,
      });

      const data = await response.json(); // Parse the response body as JSON
      console.log('block res', data);
      if(data.msg=="Your friend blocked you."){
        ToastAndroid.showWithGravity('Your friend blocked you.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(false)
      }else if(data.msg=="You blocked this user."){
        ToastAndroid.showWithGravity('You blocked this user.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(true)
      }else if(data.msg=="Both users have blocked each other."){
        ToastAndroid.showWithGravity('Both have blocked each other.', ToastAndroid.SHORT, ToastAndroid.BOTTOM,);
        setIsBlocked(true)
        setIinitBlock(true)
      }
    } catch (error) {
      console.error('Error in block res:', error);
    }
  };


  // HOOKS
  useEffect(()=>{
      isUserBlocked()
  },[scrollToBottom])
  useEffect(() => {
    socket.on(`receive_message`, handleGetCurrentMsg);
    socket.on(`receive_image_message`, handleGetCurrentMsg);
    return () => {
      socket.off(`receive_message`, handleGetCurrentMsg);
      socket.off(`receive_image_message`, handleGetCurrentMsg);
    };
  }, [handleGetCurrentMsg]);
  useEffect(() => {
    messagesFromDb();
  }, []);
  useEffect(() => {
    joinPrivateChat();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <PaperProvider>
    <View styles={UserChatStyle.contianer(theme.chatScreenColor)}>
      <Primary_StatusBar />
      <View style={{ height: hp('100%'), width: wp('100%') }}>
        {changeHeader != true ? (
          <UserChatHeader item={receiver} navigation={props.navigation} iInitBlock={iInitBlock} clearFunc={() => { clearChat() }} blockFunc={()=>{userBlocked()}} unBlockFunc={()=>{userUnBlocked()}} isBlocked={isBlocked}/>
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
            <FlatList
              data={messageList}
              renderItem={({ item }) => (
                <RenderChats
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
            // keyboardShouldPersistTaps="handled"
            // enableOnAndroid={false}
            // extraData={messageList}
            />
          </View>
          {!isBlocked&&
          <UserChatInput
            inputRef={inputRef}
            callScrollToBottomFunc={() => {
              scrollToBottom();
            }}
            receiver={receiver}
            chatId={contact._id}
            socket={socket}
            setMessageList={ml => {
              setMessageList(ml);
            }}
            setImagMessage={setImagMessage}
            imagMessage={imagMessage}
            setDocument={doc => {
              setDocument(doc);
            }}
            currentMessage={currentMessage}
            setCurrentMessage={cm => {
              setCurrentMessage(cm);
            }}
            messageget={messagesFromDb}
          />}
        </KeyboardAvoidingView>
      </View>
    </View>
    </PaperProvider>
  );
};

export default UserChat;
