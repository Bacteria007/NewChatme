import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import AppColors from '../../asset/colors/AppColors';
// import Modal from 'react-native-modal';
import Status_bar from '../../../components/statusbars/Primary_StatusBar';
import UserChatStyle from '../../../assets/styles/UserChatStyle';
import AppColors from '../../../assets/colors/Appcolors';

import UserChatHeader from '../../../components/Headers/ChatHeader/UserChatHeader';
import UserChatInput from '../../../components/ChatInput/UserChatInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppContext from '../../../context/AppContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangedChatHeader from '../../../components/Headers/ChatHeader/ChangedChatHeader';
import RenderChats from '../../../components/RenderAllChats/RenderChats';

const socket = io.connect('http://192.168.76.238:8888');

const UserChat = props => {
  const { baseUrl, storedUser } = useContext(AppContext);
  const [changeHeader, setChangeHeader] = useState(false);
  const [imagMessage, setImagMessage] = useState('');
  const [msgId, setMsgId] = useState();

  const apiKey = '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';
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    console.log('data');
  }, [isSending]);
  // const {item} = props.route.params;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
  const { itm } = props.route.params;
  const recieverId = itm.recieverId;

  AsyncStorage.setItem('receiverId', recieverId)
    .then(() => {
      // console.log('Receiver ID stored successfully');
    })
    .catch(error => {
      // console.error('Error storing receiver ID:', error);
    });
  // console.log("item",itm)

  const addContact = async () => {
    //ye backend mein contact ko add krta
    const user =await AsyncStorage.getItem('user');
   const userData = JSON.parse(user);

    const formData = new FormData();
    formData.append('userId', itm.userId);
    formData.append('name', itm.name);
    formData.append('SenderName', userData.name);
    formData.append('SenderPhoneNo', userData.phoneNumber);
    formData.append('phoneNumber', itm.phoneNumber);
    formData.append('recieverId', itm.recieverId);

    // Call the addContact API
    await fetch(`${baseUrl}/addContacts`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        console.log('Data added successfully');
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };


//   const sendMessage = async () => {
//     setIsSending(true);
//     addContact();
//     await axios
//       .post(
//         'https://api.openai.com/v1/engines/text-davinci-003/completions',
//         {
//           prompt: `Detect the mood of the following text and give result in  emoji make sure emoji will be one : "${currentMessage.trim()}"`,
//           max_tokens: 1024,
//           temperature: 0.5,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//           },
//         },
//       )
//       .then(async response => {
//         const moodOfUser = response.data.choices[0].text.trim();
// console.log('sendMsg recieverid',recieverId)
//         if (moodOfUser != '') {
//           const messageData = {
//             content: currentMessage.trim(),
//             name: itm.name,
//             senderId: itm.userId,
//             recieverId: recieverId,
//             mood: moodOfUser,
//           };
//           console.log('frontend', messageData);

//           await socket.emit('send_message', messageData);
//           setMessageList(list => [...list, messageData]);
//           setCurrentMessage('');
//           setIsSending(false);
//         }
//         setIsSending(false);
//       })
//       .catch(async error => {
//         console.error('Error detecting mood:', error);
//         const messageData = {
//           content: currentMessage.trim(),
//           name: itm.name,
//           senderId: itm.userId,
//           recieverId: recieverId,
//           mood: 'normal',
//         };
//         console.log('frontend', messageData);

//         await socket.emit('send_message', messageData);
//         setMessageList(list => [...list, messageData]);
//         setCurrentMessage('');
//         setIsSending(false);
//       });
//   };

  const DeleteMessage = async msgId => {
    const formData = new FormData();
    formData.append('_id', msgId);

    try {
      const response = await fetch(`${baseUrl}/deleteMessage`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
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

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data]);
    });

    // Fetch data from the server
    fetch(`${baseUrl}/messages`)
      .then(response => response.json())
      .then(data => setMessageList(data))
      .catch(error => console.error(error));

    // Join the room based on the user's ID
    socket.emit('join_room', recieverId);

    return () => {
      socket.off('receive_message');
    };
  }, [recieverId]);

  useEffect(() => {
    // Scroll to the end when messageList changes
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messageList]);

  const filteredMessages = messageList.filter(
    message =>
      (message.senderId === itm.userId && message.recieverId === recieverId) ||
      (message.senderId === recieverId && message.recieverId === itm.userId),
  );

  return (
    <View styles={[UserChatStyle.contianer]}>
      <Status_bar
        darkModeBgColor={AppColors.black}
        lightModeBgColor={AppColors.linearGradient.blue}
        content={'light-content'}
      />
      <ImageBackground
        source={require('../../../assets/imges/userChatImages/img6.jpg')}
        style={{ height: hp('100%'), width: wp('100%') }}
        resizeMode="cover">
        {changeHeader != true ? (
          <UserChatHeader item={itm} navigation={props.navigation} />
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
          <View style={[UserChatStyle.container2]}>
            <FlatList
              ref={flatListRef}
              data={filteredMessages}
              renderItem={({ item }) => (
                <RenderChats
                  item={item}
                  itm={itm}
                  setChangeHeader={setChangeHeader}
                  setMsgId={setMsgId}
                />
                // <TouchableOpacity onLongPress={()=>{
                //   setChangeHeader(true)
                //   setMsgId(item._id)
                // }}>
                // <View style={[item.senderId === itm.userId ? UserChatStyle.userMessageContainer : UserChatStyle.otherMessageContainer]}>
                //   <Text style={[item.senderId === itm.userId ? UserChatStyle.userMessageText : UserChatStyle.otherMessageText]}>{item.content}</Text>
                //   <Text style={[item.senderId === itm.userId ? UserChatStyle.userTimestampText : UserChatStyle.userTimestampText]}>{moment(item.createdAt).format('hh:mm a ')}</Text>
                // </View>
                // </TouchableOpacity>
              )}
              contentContainerStyle={[UserChatStyle.messagesContainer]}
              keyExtractor={(item, index) => index.toString()}
              onContentSizeChange={() =>
                flatListRef.current.scrollToEnd({ animated: true })
              }
              onLayout={() =>
                flatListRef.current.scrollToEnd({ animated: true })
              }
            />
          </View>
          <UserChatInput
            item={itm}
            socket={socket}
            setMessageList={(ml)=>{setMessageList(ml)}}
            setImagMessage={setImagMessage}
            imagMessage={imagMessage}
            addContact={()=>{addContact()}}
            // sendMessage={() => {
            //   sendMessage();
            // }}
            // currentMessage={currentMessage}
            // setCurrentMessage={(cm)=>{setCurrentMessage(cm)}}
            // isSending={isSending}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default UserChat;
