import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import { ThemeContext } from '../../context/ThemeContext';
import Containers from '../../assets/styles/Containers';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../context/AppContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../../assets/colors/Appcolors';
import { Icons } from '../../assets/Icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import FooterComponent from '../../components/FlatlistComponents/FooterComponent';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';
import { capitalizeFirstLetter } from '../../helpers/UiHelpers/CapitalizeFirstLetter';
import { CreateNameSubString } from '../../helpers/UiHelpers/CreateSubString';
import ReactNativeModal from 'react-native-modal';

const AllRequest = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, currentUser, token, } = useContext(AppContext);
    const [waitingRequests, setWaitingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profileModals, setProfileModals] = useState([]);
    const [accepted, setAccepted] = useState(false)

    const showProfileModal = (index) => {
        console.log('👋', index)
        const updatedProfileModals = [...profileModals];
        updatedProfileModals[index] = true;
        setProfileModals(updatedProfileModals);
    };

    const hideProfileModal = (index) => {
        const updatedProfileModals = [...profileModals];
        updatedProfileModals[index] = false;
        setProfileModals(updatedProfileModals);
    };

    // FUNCTIONS----------------------------
    const fetchWaitingRequest = async () => {
        await fetch(`${baseUrl}/waitingRequests?userId=${currentUser.userId}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                const allFetchedRequests = await response.json()
                //console.log('all pending req.........', allFetchedRequests)
                // if (allFetchedRequests.data.message == "Please provide a valid token.") {
                //     Alert.alert("Provide a valid token.")
                // } else if (allFetchedRequests.data.message == 'Please provide a token.') {
                //     Alert.alert('Token required')
                // } else
                setWaitingRequests(allFetchedRequests)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('error fetching req.........', err)
                setIsLoading(false)
            })
    }
    const acceptRequest = async (contact) => {
        console.log("contact in accept-----------", contact)
        try {
            const response = await fetch(`${baseUrl}/acceptRequest?requesterId=${currentUser.userId}&responderId=${contact.requesterId._id}&requestId=${contact._id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                ToastAndroid.showWithGravity('user added in friend list.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                const res = await response.json();
                console.log("accept request ka response", res)
                setAccepted(res.accepted)
            } else {
                ToastAndroid.showWithGravity('user is not added in friend list.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                console.log('Error accepting request');
            }
        } catch (error) {
            console.log('Network request failed', error);
        }
    }
    const rejectRequest = async (contact) => {

        // console.log("contact in reject", contact)
        try {
            const response = await fetch(`${baseUrl}/rejectRequest?requesterId=${currentUser.userId}&responderId=${contact.requesterId._id}&requestId=${contact._id}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                ToastAndroid.showWithGravity('request rejected successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                const res = await response.json();
                console.log("reject request ka response", res)
                setAccepted(res.rejected)
            } else if (response.status == 404) {
                console.log('reject request not found');

            } else {
                ToastAndroid.showWithGravity('cannot perform reject.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                console.log('Error rejecting request');
            }

        } catch (error) {
            console.log('Error rejecting request', error);
        }
    }

    // HOOKS---------------------------------
    useEffect(() => {
        fetchWaitingRequest();
        navigation.addListener('focus', () => {
            fetchWaitingRequest();
        });
        console.log('Ⓜ️allllllllllllllllllllllllll',)
    }, [accepted]);

    // Render requests
    const renderRequests = (item, index) => {
        // console.log("hhhh", typeof item.requesterId.profileImage)

        return (

            <View style={HomeNeoCards.flatlistItemContainer}>
                <Neomorph
                    darkShadowColor={AppColors.primary} // <- set this
                    lightShadowColor={AppColors.primary}// <- this
                    swapShadows
                    style={[HomeNeoCards.neomorphStyle(theme.homeCardColor), { justifyContent: 'space-between' }]}
                >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {item.requesterId.profileImage == '' ? (
                            <View style={[HomeNeoCards.dpVew]}>
                                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>

                                    <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />

                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => { showProfileModal(index) }}>
                                <Image source={{ uri: `${baseUrl}${item.requesterId.profileImage}` }} style={HomeNeoCards.dpImage} />
                            </TouchableOpacity>
                        )}
                        {/* profile name view */}
                        <View style={HomeNeoCards.nameAndMsgContainer}>
                            <Text
                                style={HomeNeoCards.profileName(theme.profileNameColor)}>
                                {item.requesterId.name ? capitalizeFirstLetter(CreateNameSubString(item.requesterId.name)) : null}
                            </Text>
                            <Text
                                style={HomeNeoCards.lastMsg(theme.profileNameColor)}>
                                {item.requesterId.phoneNo ? capitalizeFirstLetter(CreateNameSubString(item.requesterId.phoneNo)) : null}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('35') }}>

                        <TouchableOpacity
                            onPress={() => acceptRequest(item)}
                            style={{
                                // backgroundColor:AppColors.Mauve,
                                paddingHorizontal: 7, paddingVertical: 5, borderRadius: 7
                            }}
                        >
                            <Text style={{ color: "green", fontFamily: FontStyle.mediumFont, fontSize: wp('3') }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => rejectRequest(item)}
                            style={{
                                // backgroundColor:"#eadff0",
                                paddingHorizontal: 7, paddingVertical: 5, borderRadius: 7
                            }}
                        >
                            <Text style={{ color: 'red', fontFamily: FontStyle.mediumFont, fontSize: wp('3'), textAlign: 'center' }}>Reject </Text>
                        </TouchableOpacity>
                    </View>
                </Neomorph>
                <ReactNativeModal
                    visible={profileModals.length==0?setProfileModals(new Array(waitingRequests.length).fill(false)): profileModals[index]}
                    style={HomeNeoCards.modalContainer}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    onDismiss={() => hideProfileModal(index)}
                    onBackdropPress={() => hideProfileModal(index)}
                    onBackButtonPress={() => hideProfileModal(index)}>
                    <View style={HomeNeoCards.modalView}>
                        <View style={HomeNeoCards.dpHeader}>
                            <Text style={HomeNeoCards.profileName(AppColors.black)}>
                                {item.requesterId.name
                                    ? CreateNameSubString(item.requesterId.name)
                                    : null}
                            </Text>
                        </View>

                        <View>
                            {item.requesterId.profileImage !== '' ?
                                <Image
                                    source={{ uri: `${baseUrl}${item.requesterId.profileImage}` }}
                                    style={HomeNeoCards.dpInModal}
                                />
                                : null}
                        </View>

                    </View>
                </ReactNativeModal>
            </View>
        );
    }
    return (
        <View style={Containers.whiteCenterContainer(theme.backgroundColor)}>
            <View>
                <Primary_StatusBar />
                <InnerScreensHeader screenName={"All Request"} navigation={navigation} />
                {isLoading && <View style={ReelscreenStyle.LoaderView}><ActivityIndicator size="small" color={'black'} /></View>}
                {waitingRequests.length != 0 ?
                    <FlatList data={waitingRequests} renderItem={({ item, index }) => renderRequests(item, index)} style={{ marginTop: 20 }}
                        ListFooterComponent={FooterComponent}
                    />

                    :
                    !isLoading && (
                        <View style={Containers.centerContainer}>
                            <Text style={HomeNeoCards.noSearchResultText}>No new requests.</Text>
                        </View>
                    )
                }
            </View>

        </View>
    )
}
export default AllRequest

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        bottom: wp('4%'),
        right: wp('90%'),
        backgroundColor: 'red',
        borderRadius: wp('2%'),
        width: wp('5%'),
        height: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: wp('3%'),
    },
});