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
import Primary_StatusBar from '../../../../components/statusbars/Primary_StatusBar';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import UserChatInputStyle from '../../../../assets/styles/UserChatInputStyle';
import { Icons } from '../../../../assets/Icons';
import UserChatHeader from '../../../../components/Headers/ChatHeader/UserChatHeader';
import {
    Appbar,
    Divider,
    Modal,
    Portal,
    Provider,
    Surface,
    TouchableRipple,
} from 'react-native-paper';
import FontStyle from '../../../../assets/styles/FontStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import AppContext from '../../../../context/AppContext';
import GroupMsgItem from '../../../../components/MessageItem/GroupMsgItem';
import moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GroupChatInput from './GroupChatInput';
import PushNotification from "react-native-push-notification";

const socket = io.connect('http://192.168.43.145:8888');

const GroupChat = props => {
    // VARIABLES
    const { item } = props.route.params;
    const { baseUrl, curentUser } = useContext(AppContext)
    let currentId = JSON.parse(curentUser._j);
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
    const getSenderDetails = async () => {
        const userDetails = groupMembers.find(member => member._id === currentId);
        return userDetails; // This will return the matching user details or undefined if not found
    };
    const sendMessage = async () => {

        const user_details = await getSenderDetails();
        const msgData = {
            text: newMsg,
            sender_id: user_details._id,
            sender_name: user_details.name,
            sender_phone: user_details.phoneNo,
            group_id: groupId,
            readStatus: true,
            deliverStatus: true
        };
        await socket.emit('send_group_message', msgData);
        setNewMsg('');

    }
    const handleNotification = (item) => {
        if (item.sender_id != currentId) {
            PushNotification.localNotification({
                channelId: "1233",
                title: `${item.sender_name}`.toUpperCase(),
                message: `${item.text}`,
                color:'red',
                // bigText:`${item.sender_name} = ${item.text}`
            })
        }
    }
    const handleGetCurrentMsg = (msgData) => {
        
        if (msgData.sender_id != currentId) {
            handleNotification(msgData)
        } else {
        }
        setMsgList([...msgList, msgData]);
    };
    const receivePreviousMessagesFromDb = async () => {
        await fetch(`${baseUrl}/message_history/?groupId=${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            const msgs = await res.json()
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
        const user_details = await getSenderDetails();
        // Initialize socket.io connection
        socket.emit('join_group', groupId);
        const name = user_details.name;
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider>
                <View styles={[UserChatStyle.contianer]}>
                    <Primary_StatusBar />
                    <Surface>
                        <Appbar.Header>
                            <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                            <Appbar.Content title={item.group_name} style={{ paddingTop: 7 }} />
                            <Appbar.Action
                                icon={() => <Icons.Ionicons name="people" size={24} />}
                                color="purple"
                            />
                            {/* <Appbar.Action icon="dots-vertical" onPress={console.log('dots pressed')} /> */}
                        </Appbar.Header>
                    </Surface>
                    {/* Display the list of received messages */}
                    <View style={{ height: hp('45') }}>
                        {msgList.length != 0 ?
                            <FlatList
                                data={msgList.length != 0 ? msgList : []}
                                // ref={flatListRef}
                                renderItem={({ item }) => { return <GroupMsgItem msgData={item} /> }}
                                keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
                            />
                            :
                            <Text style={{ color: 'purple' }}>Start Conversation</Text>
                        }
                        {/* {swipeToReply && <View style={{backgroundColor:'blue',height:wp('20'),width:wp('100')}}>
                <Text style={{color:'white'}}>Reply to your friend</Text>
                </View>} */}
                    </View>
                    <Portal>
                        <Modal
                            visible={visible}
                            onDismiss={() => { hideModal() }}
                            contentContainerStyle={styles.modalContentContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList
                                    indicatorStyle="black"
                                    data={groupMembers}
                                    renderItem={({ item }) => (
                                        <View style={{ padding: 4 }}>
                                            <Text>
                                                {item._id == adminId ? (
                                                    <Text
                                                        style={{
                                                            color: 'purple',
                                                            fontFamily: FontStyle.boldFont,
                                                            fontSize: 16,
                                                        }}>
                                                        Group created by
                                                    </Text>
                                                ) : null}
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontFamily: FontStyle.regularFont,
                                                    }}>
                                                    {item.name}
                                                </Text>
                                            </Text>
                                            <Text style={{ color: 'gray', fontSize: 18 }}>
                                                {item.phoneNo}
                                            </Text>
                                            <Divider />
                                        </View>
                                    )}
                                />
                            </View>
                        </Modal>
                    </Portal>
                    {/* Textinput */}
                    <GroupChatInput inputVal={newMsg} setter={(msg) => setNewMsg(msg)} sendMessageFunc={() => {
                        sendMessage()
                    }} />
                </View>
                {/* </View> */}
            </Provider>
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