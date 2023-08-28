import { useContext, useEffect, useState } from "react";
import HomeNeoCards from "../../assets/styles/homeScreenCardStyles/HomeNeoCards";
import { ThemeContext } from "../../context/ThemeContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert, ToastAndroid } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import { Icons } from "../../assets/Icons";
import AppColors from "../../assets/colors/Appcolors";
import ReactNativeModal from "react-native-modal";
import AppContext from "../../context/AppContext";
import moment from "moment";
import UseScreenFocus from "../HelperFunctions/AutoRefreshScreen/UseScreenFocus";
import FontStyle from "../../assets/styles/FontStyle";

const RenderComponent = ({ name, dp, callingScreen, discussions_item, groups_item, contacts_item, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, storedUser } = useContext(AppContext);
    const [profileModal, setProfileModal] = useState(false);
    const [userLastMsg, setUserLastMsg] = useState('');
    const [groupLastMsg, setGroupLastMsg] = useState('');
    const maxLength = 25;
    const nameMaxLength = 20;
    // Time format
    const formatMessageDate = (createdAt) => {
        const messageDate = moment(createdAt);
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        if (messageDate.isSame(today, 'd')) {
            return messageDate.format('h:mm A'); // Format time as hour:minutes AM/PM
        } else if (messageDate.isSame(yesterday, 'd')) {
            return 'Yesterday';
        } else {
            return messageDate.format('DD/MM/YYYY');
        }
    }
    const showProfileModal = () => {
        setProfileModal(true);
    };
    const hideProfileModal = () => {
        setProfileModal(false);
    };
    const blockContact = async (item) => {
        // console.log("discussion ma ", storedUser.userId)
        // console.log("discussion ma ", item._id)
        try {
            const response = await fetch(`${baseUrl}/blockContact?userId=${storedUser.userId}&contactId=${item._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const data = await response.json();
                console.log('blocked contact from db', data);
                ToastAndroid.showWithGravity(
                    'blocked successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
            } else {
                console.log('Error blocking contact:', response.status);
                ToastAndroid.showWithGravity('Cannot blocked', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (error) {
            console.error('Error blocking contact: ', error);
        }

    }
    const unblockContact = async (item) => {
        // console.log("discussion ma ", storedUser.userId)
        // console.log("discussion ma ", item._id)
        try {
            const response = await fetch(`${baseUrl}/unblockContact?userId=${storedUser.userId}&contactId=${item._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const data = await response.json();
                console.log("contact unblocked successfully", data);
                ToastAndroid.showWithGravity(
                    ' unblocked successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                console.log('Error un blocking contact:', response.status);
                ToastAndroid.showWithGravity('cannot unblocked', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (error) {
            console.error('Error blocking contact: ', error);
        }

    }
    const handleLongPress = (item) => {
        Alert.alert(
            'Delete Chat', 'All Media and chat history wil be deleted',
            [{ text: 'Block', onPress: () => { blockContact(item) } }, { text: 'UnBlock', onPress: () => { unblockContact(item) } }],
            { cancelable: true },
        )
    }
    const getUserLastMessage = async () => {
        // console.log("req.query", discussions_item)

        const res = await fetch(`${baseUrl}/userLatestMessage?userId=${storedUser.userId}&receiverId=${discussions_item._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        // console.log("----------", data)

        setUserLastMsg(data);
    }
    const getGroupLastMessage = async () => {
        // console.log("i(((((())))))))))m", groups_item._id)
        const res = await fetch(`${baseUrl}/groupLatestMessage?groupId=${groups_item._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        setGroupLastMsg(data);
        // console.log("i(((((())))))))))m", data)

    }

    UseScreenFocus(getGroupLastMessage)
    UseScreenFocus(getUserLastMessage)
    useEffect(() => {
        getUserLastMessage();
        getGroupLastMessage();
    }, []);
    return (
        <TouchableOpacity
            onPress={() => {
                if (callingScreen === "Discussions") {
                    console.log("Comming form Discussions", discussions_item)
                    navigation.navigate('UserChat', { receiver: discussions_item });
                }
                else if (callingScreen === "Groups") {
                    console.log("Comming form Groups")
                    navigation.navigate('GroupChat', { item: groups_item });
                }
            }}
            onLongPress={() => { handleLongPress(discussions_item) }}>
            <View
                style={HomeNeoCards.flatlistItemContainer}>
                <Neomorph
                    darkShadowColor={AppColors.primary} // <- set this
                    lightShadowColor={AppColors.primary}// <- this
                    swapShadows
                    style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
                >
                    <TouchableOpacity onPress={() => {
                        showProfileModal()
                        // console.log("dp", dp)
                    }}>
                        {dp == null ? (
                            <View style={HomeNeoCards.dpVew}>
                                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                                    {callingScreen === 'Discussions' || callingScreen === 'Contacts' ? (
                                        <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />
                                    ) : (
                                        <Icons.MaterialIcons name={'people'} size={29} color={theme.groupDpIconColor} />
                                    )}
                                </View>
                            </View>
                        ) : (
                            <Image source={{ uri: `${baseUrl}${dp}` }} style={HomeNeoCards.dpImage} />
                        )}
                    </TouchableOpacity>

                    {/* profile name view */}
                    <View style={HomeNeoCards.nameAndMsgContainer}>
                        <View style={HomeNeoCards.nameAndTimeContainer}>
                            <Text
                                style={HomeNeoCards.profileName(theme.profileNameColor)}>
                                {name ? (name.length > nameMaxLength ? name.substring(0, nameMaxLength) + '...' : name) : null}

                            </Text>
                            <Text
                                style={HomeNeoCards.lastMsgTime(theme.lastMsgColor)}>
                                {callingScreen !== 'Groups' ? (userLastMsg ? (formatMessageDate(userLastMsg.createdAt)) : null)
                                    : (groupLastMsg ? (formatMessageDate(groupLastMsg.createdAt)) : null)}
                            </Text>
                        </View>
                        <Text
                            style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                            {callingScreen !== 'Groups' ? (userLastMsg ? ((userLastMsg.content.length) > maxLength ? userLastMsg.content.substring(0, maxLength) + '...' : userLastMsg.content) : null)
                                :
                                (groupLastMsg ? ((groupLastMsg.text.length) > maxLength ?
                                    <Text>
                                        <Text style={HomeNeoCards.senderName}>{groupLastMsg.sender_name == storedUser.name ? "You" : groupLastMsg.sender_name}{": "}</Text>
                                        {groupLastMsg.text.substring(0, maxLength) + '...'}</Text> :
                                    <Text>
                                        <Text style={HomeNeoCards.senderName}>{groupLastMsg.sender_name == storedUser.name ? "You" : groupLastMsg.sender_name}{": "}</Text>
                                        {groupLastMsg.text}</Text>) : null)}
                        </Text>
                    </View>
                </Neomorph>
            </View>
            <ReactNativeModal
                visible={profileModal}
                coverScreen={true}
                style={HomeNeoCards.modalContainer}
                animationIn='slideInUp'
                animationOut='slideInDown'
                onDismiss={hideProfileModal}
                onBackdropPress={hideProfileModal}
                onBackButtonPress={hideProfileModal}
            >
                <View style={HomeNeoCards.modalView}>
                    {dp == null ? (
                        <View style={HomeNeoCards.dpVew}>
                            <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                                {callingScreen === 'Discussions' || callingScreen === 'Contacts' ? (
                                    <Image source={require('../../assets/imges/default/userProfileDark.jpg')} style={HomeNeoCards.dpInModal} />
                                ) : (
                                    <Image source={require('../../assets/imges/default/group.png')} style={HomeNeoCards.dpInModal} />
                                )}
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={HomeNeoCards.dpHeader(theme.backgroundColor)}>
                                <Text
                                    style={HomeNeoCards.profileName(theme.profileNameColor)}>
                                    {name ? (name.length > nameMaxLength ? name.substring(0, nameMaxLength) + '...' : name) : null}

                                </Text>
                            </View>
                            <Image source={{ uri: `${baseUrl}${dp}` }} style={HomeNeoCards.dpInModal} />
                        </View>
                    )}
                </View>
            </ReactNativeModal>

        </TouchableOpacity>
    );
};

export default RenderComponent;

const styles = StyleSheet.create({

})