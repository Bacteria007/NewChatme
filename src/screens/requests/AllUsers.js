import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TouchableWithoutFeedback,

} from 'react-native';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import { ThemeContext } from '../../context/ThemeContext';
import Containers from '../../assets/styles/Containers';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../context/AppContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
import AppColors from '../../assets/colors/Appcolors';
import { Icons } from '../../assets/Icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UseScreenFocus from '../../components/HelperFunctions/AutoRefreshScreen/UseScreenFocus';
import FontStyle from '../../assets/styles/FontStyle';
import { ActivityIndicator } from 'react-native';

const AllUsers = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, currentUser, token } = useContext(AppContext);
    const [isSending, setIsSending] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [people, setPeople] = useState([]);
    const [badgeCount, setBadgeCount] = useState(0);
    const [allPendingRequests, setAllPendingRequests] = useState([])
    const [waitingRequests, setWaitingRequests] = useState([])
    const [clickedItem, setClickedItem] = useState(null);
    // FUNCTIONS-----------------------------
    const fetchPendingRequest = async () => {
        try {
            const result = await fetch(`${baseUrl}/pendingRequests?userId=${currentUser.userId}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (result.ok) {

                const allFetchedRequests = await result.json()
                // //console.log('all pending req.........', allFetchedRequests)
                // if (allFetchedRequests.data.message == "Please provide a valid token.") {
                //     Alert.alert("Provide a valid token.")
                // } else if (allFetchedRequests.data.message == 'Please provide a token.') {
                //     Alert.alert('Token required')
                // } else{

                setAllPendingRequests(allFetchedRequests)
                return allFetchedRequests
                // }
            }
            else {
                console.log("error fetching pending request")
            }
        } catch (error) {
            console.log("error fetching pending request", error)
        }

    }
    const fetchWaitingRequest = async () => {
        try {
            const result = await fetch(`${baseUrl}/waitingRequests?userId=${currentUser.userId}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (result.ok) {

                const allFetchedRequests = await result.json()
                // //console.log('all pending req.........', allFetchedRequests)
                setWaitingRequests(allFetchedRequests)
                return allFetchedRequests
            }
            else {
                console.log("error fetching pending request")
            }
        } catch (error) {
            console.log("error fetching pending request", error)
        }

    }
    const fetchPeople = async () => {
        try {
            const response = await fetch(`${baseUrl}/nonFriendUsers?userId=${currentUser.userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            //yha b khud e kr lyna token k error msgs ko deal blky jha jha tmny kam kia un sab ma khud e krlo jesy deal krna
            if (response.ok) {
                console.log("reqz::::::::::", waitingRequests)
                const data = await response.json();
                console.log("data::::::::::", data);
                await fetchPendingRequest();
                await fetchWaitingRequest();
                setPeople(data)
            } else {
                console.log("error fetching people")
            }
        } catch (error) {
            console.log("error fetching people", error)
        }
    }
    const sendRequest = async (contact) => {
        setIsSending(true);
        try {
            const response = await fetch(`${baseUrl}/sendRequest?senderId=${currentUser.userId}&receiverId=${contact._id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsSending(false);
                setRequestSent(true);
                setBadgeCount(prevCount => prevCount + 1);

                // Fetch pending and waiting requests
                const pdata = await fetchPendingRequest();
                console.log("pdata###########", pdata);
                const wdata = await fetchWaitingRequest();
                console.log("wdata*********", wdata);

                const res = await response.json();
                console.log("sendRequest========", res);

                // Update people array to mark the user as requested
                // setPeople(prevPeople => {
                //     return prevPeople.map(user => {
                //         if (user._id === res.senderId._id) {
                //             return { ...user, requested: true };
                //         }
                //         return user;
                //     });
                // });

            } else {
                console.log("Error in sending request");
                setIsSending(false);
                setRequestSent(false);
            }

        } catch (error) {
            console.error('Error sending request:', error);
            setIsSending(false);
            setRequestSent(false);
        }
    }
    const cancelRequest = async (contact) => {
        console.log("''''''''''======''''''''''", contact)
        const result = await fetch(`${baseUrl}/cancelRequest?senderId=${currentUser.userId}&receiverId=${contact._id}`, { method: 'get', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
        if (result.ok) {
            await fetchPendingRequest()
            await fetchWaitingRequest()
            const resultJson = await result.json()
            console.log("cancel successfully...", resultJson);
        }
        else if (result.status == 404) { console.log("request not found") }
        else { console.log("cannot cancel reuest") }
    }

    // Hooks---------------------------------
    useEffect(() => {
        fetchPeople();
        console.log("people", people);
        navigation.addListener('focus', () => {
            fetchPeople()
        });
    }, []);
    useEffect(() => {
        fetchPendingRequest();
        console.log("allPendingRequests", allPendingRequests);
        navigation.addListener('focus', () => {
            fetchPendingRequest()
        });
    }, []);
    useEffect(() => {
        fetchWaitingRequest();
        console.log("waitingRequests", waitingRequests);
        navigation.addListener('focus', () => {
            fetchWaitingRequest();
        });
    }, []);
    // }, );
    useEffect(() => {
        console.log("issending", isSending)
    }, [isSending, requestSent]);
    // =============
    const renderPeople = (item) => {
        // console.log("item__",item)

        return (

            <View style={HomeNeoCards.flatlistItemContainer}>
                <Neomorph
                    darkShadowColor={AppColors.primary} // <- set this
                    swapShadows
                    style={[HomeNeoCards.neomorphStyle(theme.homeCardColor), { justifyContent: 'space-between' }]}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {!item.profileImage ? (
                            <View style={HomeNeoCards.dpVew}>
                                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>

                                    <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />

                                </View>
                            </View>
                        ) : (
                            <Image source={{ uri: `${baseUrl}${item.profileImage}` }} style={HomeNeoCards.dpImage} />
                        )}
                        {/* profile name view */}
                        <View style={{ paddingHorizontal: 14, justifyContent: 'center' }}>
                            <Text style={HomeNeoCards.profileName(theme.profileNameColor)}>
                                {item.name}
                            </Text>
                        </View>
                    </View>

                    {waitingRequests.length > 0 && waitingRequests.some(waitingRequest => waitingRequest.senderId._id == item._id) ? (
                        <Text style={{ color: AppColors.gray, fontSize: 14, fontFamily: FontStyle.regularFont }}>
                            Requested...</Text>
                    ) : allPendingRequests.length > 0 && allPendingRequests.some(pendingRequest => pendingRequest.receiverId._id == item._id) ? (
                        <TouchableOpacity onPress={() => cancelRequest(item)}>
                            <Neomorph swapShadows style={HomeNeoCards.addUserinGroup(AppColors.Mauve)}>
                                <Text style={{ color: AppColors.white, fontSize: 14 }}>
                                    Cancel</Text>
                            </Neomorph>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => { setClickedItem(item); sendRequest(item) }}>
                            <Neomorph swapShadows style={HomeNeoCards.addUserinGroup(AppColors.primary)}>
                                {clickedItem === item && isSending ? <ActivityIndicator size="small" color={"white"} /> :
                                    <Text style={{ color: AppColors.white, fontSize: 14 }}>Add</Text>
                                }
                            </Neomorph>
                        </TouchableOpacity>
                    )}

                </Neomorph>
            </View>
        );
    }
    return (
        <View style={Containers.whiteCenterContainer(theme.backgroundColor)}>
            <View>
                <AppHeader headerTitle={"People"} navigation={navigation} />
                <FlatList data={people} renderItem={({ item }) => renderPeople(item)} />
            </View>
        </View>
    );
}

export default AllUsers

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
