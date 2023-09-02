import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native';
import UserChatStyle from '../../../../assets/styles/UserChatStyle';
import AppColors from '../../../../assets/colors/Appcolors';
import { Primary_StatusBar } from '../../../../components/statusbars/Primary_StatusBar';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Icons } from '../../../../assets/Icons';
import {
    Appbar,
    Divider,
    Modal,
    Portal,
    Provider,
    Surface,
} from 'react-native-paper';
import FontStyle from '../../../../assets/styles/FontStyle';
import AppContext from '../../../../context/AppContext';
import GroupMsgItem from '../../../../components/MessageItem/GroupMsgItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GroupChatInput from './GroupChatInput';
import PushNotification from "react-native-push-notification";
import UserChatHeader from '../../../../components/Headers/ChatHeader/UserChatHeader';
import GroupChatHeader from '../../../../components/Headers/ChatHeader/GroupChatHeader';
import { io } from 'socket.io-client';

const socket = io.connect('http://192.168.43.145:8888');

const GroupChat = props => {
    // VARIABLES
    const { item } = props.route.params;

    const { baseUrl, currentUser,socket,token} = useContext(AppContext)
    let userId = currentUser.userId
    console.log("userId====",userId)
    console.log("currentUser===",currentUser)
    const groupMembers = item.members;
    const adminId = item.group_admin;
    const groupId = item._id;
    const [newMsg, setNewMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [height, setHeight] = useState(hp('7%')); // Initialize height with a default value
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const flatListRef = useRef(null);

    // FUNCTIONS

    useEffect(() => {
        if (flatListRef.current && msgList.length > 0) {
            const lastIndex = msgList.length - 1;
            flatListRef.current.scrollToOffset({ offset: lastIndex, animated: true })
        }
    }, [msgList]);
    const onContentSizeChange = event => {
        setHeight(event.nativeEvent.contentSize.height);
    };
    const sendMessage = async () => {

        const msgData = {
            text: newMsg,
            sender_id: currentUser.userId,
            sender_name: currentUser.name,
            sender_phone: currentUser.phoneNumber,
            group_id: groupId,
            readStatus: true,
            deliverStatus: true
        };
        console.log("msg ^^^^^^^^^^^^^^^^", msgData)
        await socket.emit('send_group_message', msgData);
        setNewMsg('');
    }
    const handleNotification = (item) => {
        if (item.sender_id != userId) {
            PushNotification.localNotification({
                channelId: "1233",
                title: `${item.sender_name}`.toUpperCase(),
                message: `${item.text}`,
                color: 'red',
                // bigText:`${item.sender_name} = ${item.text}`
            })
        }
    }
    const handleGetCurrentMsg = (msgData) => {

        if (msgData.sender_id != userId) {
            handleNotification(msgData)
        } else {
            console.log("msg notification gya tmhary receiver ko")
        }
        setMsgList([...msgList, msgData]);
    };
    const receivePreviousMessagesFromDb = async () => {
        await fetch(`${baseUrl}/message_history/?groupId=${groupId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            const msgs = await res.json()
            if(msgs.message=="Please provide a valid token."){
                Alert.alert("Provide a valid token.")
              }else if(msgs.message=='Please provide a token.'){
                Alert.alert('Token required')
              }else
            setMsgList(msgs)
        }).catch((err) => {
            console.log(err)
        })
    }

    // EFFECTS  
    // get currently sent message
    useEffect(() => {
        // Listen for the "getCurrentMsg" event
        socket.on('getCurrentMsg', handleGetCurrentMsg);
        // Clean up the event listener when component unmounts
        return () => {
            socket.off('getCurrentMsg', handleGetCurrentMsg);
        };
    }, [handleGetCurrentMsg]);

    useEffect(() => {
        receivePreviousMessagesFromDb()
    }, [])
    const initialize_socket = async () => {
        socket.emit('join_group', groupId);
        const name = currentUser.name;
        socket.emit('user_connected', name);
        // Clean up when component unmounts
        return () => {
            socket.disconnect();
        };
    }
    useEffect(() => {
        initialize_socket()
    }, []);
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column' }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 22}>
                    <Primary_StatusBar />
                    <GroupChatHeader navigation={props.navigation} item={item}/>                   
                    <View style={{ flex: 1 }}>
                        {msgList.length != 0 ?
                            <FlatList
                                data={msgList.length != 0 ? msgList : []}
                                // ref={flatListRef}
                                renderItem={({ item }) => { return <GroupMsgItem msgData={item} /> }}
                                keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
                            />
                            :
                            <Text style={{ color: AppColors.primary }}>Start Conversation</Text>
                        }

                    </View>
                   
                    <GroupChatInput inputVal={newMsg} setter={(msg) => setNewMsg(msg)} sendMessageFunc={() => {
                        sendMessage()
                    }} />
                </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

export default GroupChat;

const styles = StyleSheet.create({
    modalContentContainer: {
        backgroundColor: 'white',
        height: hp('40'),
        width: wp('87'),
        alignSelf: 'center',
        padding: wp('4'),
        borderRadius: 5,
        justifyContent: 'space-evenly',
    },
})