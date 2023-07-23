
import React, {useContext, useEffect, useRef,useState} from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import {
  View,StyleSheet,TouchableOpacity,Image,TextInput,Text,FlatList,ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import AppColors from '../../asset/colors/AppColors';
// import Modal from 'react-native-modal';
import Status_bar from '../../../components/statusbars/Primary_StatusBar';
import UserChatStyle from '../../../assets/styles/UserChatStyle';
import AppColors from '../../../assets/colors/Appcolors';

import UserChatHeader from '../../../components/Headers/ChatHeader/UserChatHeader';
import UserChatInput from '../../../components/ChatInput/UserChatInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AppContext from '../../../context/AppContext';

const socket = io.connect('http://192.168.1.107:8888'); 


const UserChat = props => {
  const {baseUrl}=useContext(AppContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInnerModalVisible, setInnerModalVisible] = useState(false);
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
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
const {itm} = props.route.params;
const recieverId=itm.recieverId
// console.log("item",itm)

  const sendMessage = async () => {
    if (currentMessage.trim() !== '') {
      const messageData = {
            content: currentMessage.trim(),
            name:itm.name, 
            senderId:itm.userId,
            recieverId:recieverId,
            // timestamps:moment().format('LT')
            //  timestamps :new Date().toLocaleTimeString([], {
            //   hour: '2-digit',
            //   minute: '2-digit',
            // })
          // new Date(Date.now()).getHours() +
          // ":" +
          // new Date(Date.now()).getMinutes(),
      };
      console.log("frontend",messageData)

      await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const DeleteMessage= async(msgId)=>{
    const formData = new FormData();
    formData.append("_id", msgId);


    try {
      const response = await fetch(`${baseUrl}/deleteMessage`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,

      });
   
      const data = await response.json(); // Parse the response body as JSON
      setMessageList(data)
      console.log('After Message deleted:', data);
      // Reset the new contact input
    

    } catch (error) {
      console.error('Error deleting message:', error);
    }

  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Fetch data from the server
    fetch(`${baseUrl}/messages`)
      .then((response) => response.json())
      .then((data) => setMessageList(data))
      .catch((error) => console.error(error));

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
    (message) =>
      (message.senderId === itm.userId && message.recieverId === recieverId) ||
      (message.senderId === recieverId && message.recieverId === itm.userId)
  );

  return (
<View styles={[UserChatStyle.contianer]}>
      <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.linearGradient.blue} content={'light-content'}/>
      <ImageBackground source={require('../../../assets/imges/userChatImages/img6.jpg')} style={{height:hp('100%'),width:wp('100%')}} resizeMode='cover'>
      <UserChatHeader item={itm} navigation={props.navigation}/>
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
         contentContainerStyle={{ flexGrow: 1 }}
        >
        
      <View style={[UserChatStyle.container2]}>
      <FlatList
           ref={flatListRef}
          data={filteredMessages}
          renderItem={({ item }) => (
            <TouchableOpacity>
            <View style={[item.senderId === itm.userId ? UserChatStyle.userMessageContainer : UserChatStyle.otherMessageContainer]}>
              <Text style={[item.senderId === itm.userId ? UserChatStyle.userMessageText : UserChatStyle.otherMessageText]}>{item.content}</Text>
              <Text style={[item.senderId === itm.userId ? UserChatStyle.userTimestampText : UserChatStyle.otherTimestampText]}>{moment(item.createdAt).format('hh:mm a ')}</Text>
            </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={[UserChatStyle.messagesContainer]}
           keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
      <View style={[UserChatStyle.inputContainer]}>
        <TextInput
          style={[UserChatStyle.input]}
          placeholder="Type a message..."
          value={currentMessage}
          onChangeText={(txt)=>{setCurrentMessage(txt)}}
        />
        <TouchableOpacity style={[UserChatStyle.sendButton]} onPress={sendMessage}>
          <Text style={[UserChatStyle.sendButtonText]}>Send</Text>
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

