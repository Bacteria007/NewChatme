import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  LayoutAnimation,
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
import AppColors from '../../../assets/colors/Appcolors';
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import { io } from 'socket.io-client';

const socket = io.connect('http://192.168.78.238:8888');

const UserChat = props => {
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const [changeHeader, setChangeHeader] = useState(false);
  const [imagMessage, setImagMessage] = useState('');
  const [document, setDocument] = useState('');
  const [msgId, setMsgId] = useState();
  const scrollRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
  const { contact } = props.route.params;
  const receiver = contact.contactData;
  const DeleteMessage = async msgId => {
   
    const formData = new FormData();
    formData.append('_id', msgId);
    formData.append('userId', currentUser.userId);

    try {
      const response = await fetch(`${baseUrl}/deleteMessage`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json(); // Parse the response body as JSON
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        const filterMsgs = data.filter(message => {
          // Check if senderID and currentUser.id are equal and deletedBySender is true
          if (
            message.senderId === currentUser.userId &&
            message.deletedBySender === true
          ) {
            return false; // Don't include this message in the filtered list
          } else if (
            message.recieverId === currentUser.userId &&
            message.deletedByReceiver === true
          ) {
            return false; // Don't include this message in the filtered list
          }

          return true; // Include other messages in the filtered list
        });
        
        const updatedMessageList = filterMsgs.filter(message => {
          if (message._id === msgId) {
            // Agar msgList k msg ki Id or msgId equal hoo to screen pr na display krwao
            return false; // Remove the deleted message
          }
          return true; // Keep other messages
        });
        setMessageList(updatedMessageList);

        setChangeHeader(!changeHeader);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleGetCurrentMsg = msgData => {
    if (msgData.senderId !== currentUser.userId)
      setMessageList([...messageList, msgData]);
  };

  useEffect(() => {
    socket.on(`receive_message`, handleGetCurrentMsg);
    return () => {
      socket.off(`receive_message`, handleGetCurrentMsg);
    };
  }, [handleGetCurrentMsg]);

  const messagesFromDb = async () => {
    const res = await fetch(`${baseUrl}/messages?chatId=${contact._id}`, {
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
        // Check if senderID and currentUser.id are equal and deletedBySender is true
        if (
          message.senderId === currentUser.userId &&
          message.deletedBySender === true
        ) {
          return false; // Don't include this message in the filtered list
        } else if (
          message.recieverId === currentUser.userId &&
          message.deletedByReceiver === true
        ) {
          return false; // Don't include this message in the filtered list
        }

        return true; // Include other messages in the filtered list
      });
      // setMessageList(list => [...list,filterMsgs ]);
      setMessageList(filterMsgs);
      
    }
  };
  const initialize_socket = async () => {
    const joinData = {
      receiverId: receiver._id,
      receiverName: receiver.name,
      senderId: currentUser.userId,
      senderName: currentUser.name,
      chatId: contact._id,
    };

    socket.emit('join_room', joinData);
    return () => {
      socket.disconnect();
    };
  };
  useEffect(() => {
    messagesFromDb();
  }, []);
  useEffect(() => {
    initialize_socket();
  }, []);
  // useEffect(() => {
  //   // Scroll to the end when messageList changes
  //   flatListRef.current.scrollToEnd({ animated: true });
  // }, [messageList]);
  const scrollingStop = () => {
    const lastChildElement = scrollRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollingStop();
    // console.log('scrollref effect')
    // if (scrollRef.current) {
    //   scrollRef.current.scrollToEnd({ behavior: 'smooth' });
    // }
  });
  return (
    <View styles={[UserChatStyle.contianer]}>
      <Primary_StatusBar />
      <View style={{ height: hp('100%'), width: wp('100%') }}>
        {changeHeader != true ? (
          <UserChatHeader item={receiver} navigation={props.navigation} />
        ) : (
          <ChangedChatHeader
            msgId={msgId}
            navigation={props.navigation}
            setChangeHeader={setChangeHeader}
            DeleteMessage={() => {
              DeleteMessage(msgId);
            }}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[UserChatStyle.container2]} ref={scrollRef}>
            <FlatList
              ref={{ flatListRef, scrollRef }}
              data={messageList}
              // onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}

              renderItem={({ item }) => (
                <RenderChats
                  msgItem={item}
                  receiver={receiver}
                  setChangeHeader={setChangeHeader}
                  setMsgId={setMsgId}
                  document={document}
                />
              )}
              contentContainerStyle={[UserChatStyle.messagesContainer]}
              keyExtractor={(item, index) => index.toString()}
              onContentSizeChange={scrollingStop}
              // onContentSizeChange={() =>{
              //   flatListRef.current.scrollToEnd({ animated: true }),

              //   scrollRef.current?.scrollToEnd({ animated: true })}
              // }
              // onLayout={() =>
              //   flatListRef.current.scrollToEnd({ animated: true })
              // }
            />
          </View>
          <UserChatInput
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
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default UserChat;
