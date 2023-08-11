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

const socket = io.connect('http://192.168.83.238:8888');

const UserChat = props => {
  const { baseUrl, currentUserId } = useContext(AppContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInnerModalVisible, setInnerModalVisible] = useState(false);
  const [mood, setMood] = useState('');
  const apiKey = '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';
  const [isSending, setIsSending] = useState(false);

  const [outerModal, setOuterModal] = useState([
    {
      text: 'View contact',
    },
    {
      text: 'Media,links,and docs',
    },
    {
      text: 'search',
    },
    {
      text: 'Mute notifications',
    },
    {
      text: 'Disappearing messages',
    },
    {
      text: 'Wallpaper',
    },
    {
      text: 'More',
    },
  ]);
  const [innerModal, setInnerrModal] = useState([
    {
      text: 'Report',
    },
    {
      text: 'Block',
    },
    {
      text: 'Clear chat',
    },
    {
      text: 'Export chat',
    },
    {
      text: 'Add shortcut',
    },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleInnerModal = () => {
    setInnerModalVisible(!isInnerModalVisible);
  };

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

  const sendMessage = async () => {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      setIsSending(true);
      // try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/text-davinci-003/completions',
          {
            prompt: `Detect the mood of the following text: "${currentMessage.trim()}"`,
            max_tokens: 1024,
            temperature: 0.5,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        ).then(async()=>{
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          console.log("TRY CALLED");
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          const moodDetection = response.data.choices[0].text.trim();
          setMood(moodDetection);
  
          if (mood != '') {
            const messageData = {
              content: currentMessage.trim(),
              name: itm.name,
              senderId: itm.userId,
              recieverId: recieverId,
              mood: mood,
            };
            console.log('frontend', messageData);
  
            await socket.emit('send_message', messageData);
            setMessageList(list => [...list, messageData]);
            setCurrentMessage('');
            setIsSending(false);
          }
          setIsSending(false);
        }).catch(async(error)=>{
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("CATCH CALLED");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.error('Error detecting mood:', error);
        const messageData = {
          content: currentMessage.trim(),
          name: itm.name,
          senderId: itm.userId, 
          recieverId: recieverId,
          mood: 'normal',
        };
        console.log('frontend', messageData);

        await socket.emit('send_message', messageData);
        setMessageList(list => [...list, messageData]);
        setCurrentMessage('');
        setIsSending(false);
        })
      // finally {
      //   setIsSending(false); // Activity Indicator band karo
      // }
  };

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
      setMessageList(data);
      console.log('After Message deleted:', data);
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
        <UserChatHeader item={itm} navigation={props.navigation} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[UserChatStyle.container2]}>
            <FlatList
              ref={flatListRef}
              data={filteredMessages}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={[
                      item.senderId === itm.userId
                        ? UserChatStyle.userMessageContainer
                        : UserChatStyle.otherMessageContainer,
                    ]}>
                    <Text
                      style={[
                        item.senderId === itm.userId
                          ? UserChatStyle.userMessageText
                          : UserChatStyle.otherMessageText,
                      ]}>
                      {item.content}
                    </Text>

                    <Text
                      style={[
                        item.senderId === itm.userId
                          ? UserChatStyle.userTimestampText
                          : UserChatStyle.otherTimestampText,
                      ]}>
                      {item.senderId == itm.userId ? '' : `${item.mood} mood`}{' '}
                      {moment(item.createdAt).format('hh:mm a ')}
                    </Text>
                  </View>
                </TouchableOpacity>
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
            <View style={[UserChatStyle.inputContainer]}>
              <TextInput
                style={[UserChatStyle.input]}
                placeholder="Type a message..."
                value={currentMessage}
                onChangeText={txt => {
                  setCurrentMessage(txt);
                }}
              />
              <TouchableOpacity
                style={[UserChatStyle.sendButton]}
                onPress={()=>{
                  if(currentMessage.trim() !=null)
                  {
                    sendMessage();
                  }
                  }}>
                {/* <Text style={[UserChatStyle.sendButtonText]}>Send</Text> */}
                {isSending ? (
                  <ActivityIndicator size="small" color="#ffffff" /> // Show loading animation
                ) : (
                  <Text style={[UserChatStyle.sendButtonText]}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* <UserChatInput/> */}

          {/* <View style={[UserChatStyle.containerView]}>
        <View style={[UserChatStyle.headerView]}>
          <View style={[UserChatStyle.leftview]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
              }}>
              <FontAwesome5
                name="arrow-left"
                size={wp('5.5%')}
                color="white"
                style={{marginTop: hp('2.7%')}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[UserChatStyle.leftInnerView]}>
                <View style={[UserChatStyle.dpContainerView]}>
                  <Image
                    source={item.dpImage}
                    style={[UserChatStyle.dpImageStyle]}
                  />
               </View>
            {/* </ImageBackground> */}
          {/* </View> */}

          {/* <TouchableOpacity>
          <View
            style={[UserChatStyle.microphoneContainerView]}>
            <FontAwesome name="microphone" size={wp('5.7%')} color={AppColors.white} />
          </View>
        </TouchableOpacity>
      </View> */}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default UserChat;
