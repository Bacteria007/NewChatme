import { useContext, useState } from "react";
import HomeNeoCards from "../../assets/styles/homeScreenCardStyles/HomeNeoCards";
import { ThemeContext } from "../../context/ThemeContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert, ToastAndroid } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import { Icons } from "../../assets/Icons";
import AppColors from "../../assets/colors/Appcolors";
import ReactNativeModal from "react-native-modal";
import AppContext from "../../context/AppContext";

const RenderComponent = ({ name, dp, callingScreen, discussions_item, groups_item, contacts_item, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, storedUser } = useContext(AppContext);
    const [profileModal, setProfileModal] = useState(false);
    const showProfileModal = () => {
        setProfileModal(true);
    };
    const hideProfileModal = () => {
        setProfileModal(false);
    };

    const blockContact = async (item) => {
        console.log("discussion ma ", storedUser.userId)
        console.log("discussion ma ", item._id)
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
        console.log("discussion ma ", storedUser.userId)
        console.log("discussion ma ", item._id)
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

    return (
        <TouchableOpacity
            onPress={() => {
                if (callingScreen === "Discussions") {
                    console.log("Comming form Discussions", discussions_item)
                    navigation.navigate('UserChat', { receiver : discussions_item });
                }
                else if (callingScreen === "Groups") {
                    console.log("Comming form Groups")
                    navigation.navigate('GroupChat', { item: groups_item });
                }
                
            }}
            onLongPress={() => { handleLongPress(discussions_item) }}
        >
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
                        console.log("dp", dp)
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
                        <Text
                            style={HomeNeoCards.profileName(theme.profileNameColor)}>
                            {name}
                        </Text>
                        <Text
                            style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                            {"yaha last msg"}
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
                        <Image source={{ uri: `${baseUrl}${dp}` }} style={HomeNeoCards.dpInModal} />
                    )}
                </View>
            </ReactNativeModal>
        </TouchableOpacity>
    );
};

export default RenderComponent;