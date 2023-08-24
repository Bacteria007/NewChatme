import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert, ActivityIndicator
} from 'react-native';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import Primary_StatusBar from '../../components/statusbars/Primary_StatusBar';
import RenderComponent from '../../components/FlatlistComponents/RenderComponent';
import { ThemeContext } from '../../context/ThemeContext';
import Containers from '../../assets/styles/Containers';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../context/AppContext';
import RenderRequest from '../../components/FlatlistComponents/RenderRequest';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
import AppColors from '../../assets/colors/Appcolors';
import { Icons } from '../../assets/Icons';
import { Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AllRequest = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, storedUser } = useContext(AppContext);
    const [waitingRequests, setWaitingRequests] = useState([]);
    const [people, setPeople] = useState([]);
    const [allPendingRequests, setAllPendingRequests] = useState([])

    // FUNCTIONS-----------------------------
    const fetchPeople = async () => {
        try {
            const response = await fetch(`${baseUrl}/usersNotInContactList?userId=${storedUser.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("reqz::::::::::", waitingRequests)
                const data = await response.json();
                console.log("data::::::::::", data)
                if (waitingRequests.length > 0) {
                    // const filteredUsers = data.filter((user) => !waitingRequests.some(waitingRequest => waitingRequest.requesterId._id === user._id))
                    // setPeople(filteredUsers);
                    setPeople(data)
                } else {
                    setPeople(data)
                }
            } else {
                console.log("error fetching people")

            }
        } catch (error) {
            console.log("error fetching people", error)

        }


    };
    const fetchPendingRequest = async () => {
        try {
            const result = await fetch(`${baseUrl}/pendingRequests?userId=${storedUser.userId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (result.ok) {
                const allFetchedRequests = await result.json()
                // //console.log('all pending req.........', allFetchedRequests)
                setAllPendingRequests(allFetchedRequests)
            }
            else {
                console.log("error fetching pending request")
            }
        } catch (error) {
            console.log("error fetching pending request", error)
        }

    }
    const fetchWaitingRequest = async () => {
        await fetch(`${baseUrl}/waitingRequests?userId=${storedUser.userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                const allFetchedRequests = await response.json()
                //console.log('all pending req.........', allFetchedRequests)
                setWaitingRequests(allFetchedRequests)
            })
            .catch((err) => {
                console.log('error fetching req.........', err)
            })
    }

    const acceptRequest = async (contact) => {
        console.log("contact in accept", contact)
        try {
            const response = await fetch(`${baseUrl}/acceptRequest?responderId=${storedUser.userId}&requesterId=${contact.requesterId._id}&requestId=${contact._id}`, {
                method: 'post',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                await fetchPeople();
                await fetchPendingRequest();
                await fetchWaitingRequest();
                // console.log("accept res//////////", res)
                const res = await response.json()

            } else {
                //console.log('Error sending request');
            }
        } catch (error) {
            console.log('Network request failed', error);
        }
    };

    const rejectRequest = async (contact) => {

        // console.log("contact in reject", contact)
        try {
            const response = await fetch(`${baseUrl}/rejectRequest?responderId=${storedUser.userId}&requesterId=${contact.requesterId._id}&requestId=${contact._id}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                await fetchPeople();
                await fetchPendingRequest();
                await fetchWaitingRequest();
                const res = await response.json()
                console.log("reject res >>>>>>>>>>", res)
            } else if (response.status == 404) {
                console.log('reject request not found');

            } else {

                console.log('Error rejecting request');
            }
        } catch (error) {
            console.log('Error rejecting request', error);
        }
    };

    const renderPeople = (item) => {

        return (

            <View
                style={HomeNeoCards.flatlistItemContainer}>

                <Neomorph
                    darkShadowColor={AppColors.primary} // <- set this
                    lightShadowColor={AppColors.primary}// <- this
                    swapShadows
                    style={[HomeNeoCards.neomorphStyle(theme.homeCardColor), { justifyContent: 'space-between' }]}
                >
                    <View style={{ flexDirection: 'row',flex:1 }}>
                        {!item.requesterId.profileImage ? (
                            <View style={[HomeNeoCards.dpVew]}>
                                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>

                                    <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />

                                </View>
                            </View>
                        ) : (
                            <Image source={{ uri: `${baseUrl}${item.requesterId.profileImage}` }} style={HomeNeoCards.dpImage} />
                        )}
                        {/* profile name view */}
                        <View style={HomeNeoCards.nameAndMsgContainer}>
                            <Text
                                style={HomeNeoCards.profileName(theme.profileNameColor)}>
                                {item.requesterId.name.length > 10 ? item.requesterId.name.substring(0, 10) + '...' : item.requesterId.name}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('35')}}>
                    <TouchableOpacity
                        onPress={() => acceptRequest(item)}
                        style={{backgroundColor:"green",paddingHorizontal:7,paddingVertical:5,borderRadius:7}}
                        >
                        <Text style={{ color: "white" }}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => rejectRequest(item)}
                        style={{backgroundColor:"red",paddingHorizontal:7,paddingVertical:5,borderRadius:7}}
                        >
                        <Text style={{ color: "white",textAlign:'center' }}>Reject </Text>
                    </TouchableOpacity>
                    </View>
                </Neomorph>
            </View>
        );
    }

    // HOOKS---------------------------------
    useEffect(() => {
        fetchWaitingRequest()
    }, [])

    return (
        <View style={Containers.whiteCenterContainer(theme.backgroundColor)}>
            <View>
                <InnerScreensHeader screenName={"All Request"} navigation={navigation} />
                {/* <Text style={{ marginTop: 20, fontSize: 20, color: AppColors.primary, textAlign: 'center' }}>All Requests</Text> */}
                <FlatList data={waitingRequests} renderItem={({ item }) => renderPeople(item)} style={{ marginTop: 20 }} />
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