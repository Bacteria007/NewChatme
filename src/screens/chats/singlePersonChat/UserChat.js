import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import {
  View, FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
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
import { Primary_StatusBar, UserChatStatusBar } from '../../../components/statusbars/Primary_StatusBar';
import axios from 'axios';
import AppColors from '../../../assets/colors/Appcolors';
import { SafeAreaView } from 'react-native-safe-area-context';

const socket = io.connect('http://192.168.43.145:8888');


const UserChat = props => {
  const { baseUrl, storedUser } = useContext(AppContext);
  const [changeHeader, setChangeHeader] = useState(false);
  const [imagMessage, setImagMessage] = useState('');
  const [document, setDocument] = useState('')
  const [msgId, setMsgId] = useState();
  const scrollRef = useRef()
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
  const { receiver } = props.route.params;
  const apiKey = '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';


  const DeleteMessage = async msgId => {
    const formData = new FormData();
    formData.append('_id', msgId);

    try {
      const response = await fetch(`${baseUrl}/deleteMessage`, {
        method: 'POST', body: formData,
      });

      const data = await response.json(); // Parse the response body as JSON
      // setMessageList(data)
      setMessageList(list => [...list, data]);
      console.log('After Message deleted:', data);
      setChangeHeader(!changeHeader);
      // Reset the new contact input
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleGetCurrentMsg = (msgData) => {
    setMessageList([...messageList, msgData]);
  };
  useEffect(() => {
    // Listen for the "getCurrentMsg" event
    socket.on('receive_message', handleGetCurrentMsg);
    // Clean up the event listener when component unmounts
    return () => {
      socket.off('receive_message', handleGetCurrentMsg);
    };
  }, [handleGetCurrentMsg]);

  const messagesFromDb = async () => {

    const res = await fetch(`${baseUrl}/messages?userId=${storedUser.userId}&receiverId=${receiver._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setMessageList(data);
  }
  const initialize_socket=async()=>{
    const joinData={
      receiverId:receiver._id,
      receiverName:receiver.name,
      senderId:storedUser.userId,
      senderName:storedUser.name,
     }
     socket.emit('join_room', joinData);
     return () => {
       socket.disconnect();
     };
  }
  useEffect(() => {
    messagesFromDb()
  }, [])
  useEffect(() => {
    initialize_socket()
  }, [socket]);
  // useEffect(() => {
  //   // Scroll to the end when messageList changes
  //   flatListRef.current.scrollToEnd({ animated: true });
  // }, [messageList]);
  const scrollingStop = () => {
    const lastChildElement = scrollRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => {
    scrollingStop()
    console.log('scrollref effect')
    // if (scrollRef.current) {
    //   scrollRef.current.scrollToEnd({ behavior: 'smooth' });
    // }
  })
  return (
      <View styles={[UserChatStyle.contianer]}>
        <View
          // source={require('../../../assets/imges/userChatImages/chatbg3.jpg')}
          style={{ height: hp('100%'), width: wp('100%') }}
          // resizeMode="cover"
        >
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
          <StatusBar barStyle={'dark-content'} backgroundColor={AppColors.white} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
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
              socket={socket}
              setMessageList={(ml) => { setMessageList(ml) }}
              setImagMessage={setImagMessage}
              imagMessage={imagMessage}
              setDocument={(doc) => { setDocument(doc) }}
              currentMessage={currentMessage}
              setCurrentMessage={(cm) => { setCurrentMessage(cm) }}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
  );
};

export default UserChat;
