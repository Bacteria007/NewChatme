import { useContext, useEffect, useState } from "react";
import HomeNeoCards from "../../assets/styles/homeScreenCardStyles/HomeNeoCards";
import { ThemeContext } from "../../context/ThemeContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import { Icons } from "../../assets/Icons";
import AppColors from "../../assets/colors/Appcolors";
import ReactNativeModal from "react-native-modal";
import AppContext from "../../context/AppContext";
import { Button } from "react-native-paper";

const RenderRequest = ({ item }) => {
    const { theme } = useContext(ThemeContext);
    const { baseUrl, storedUser } = useContext(AppContext);
    const [isSending, setIsSending] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    const sendRequest = async () => {
        // console.log("contacst_item", contacts_item)
        await fetch({
            method: 'post',
            url: `${baseUrl}/sendRequest?requesterId=${storedUser.userId}?responderId=${contacts_item.receiverId}`,
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            //     // 'Content-Type': 'application/json',
            // },
        }).then(async res => {
            // const result=await res.json()
            console.log('send regquest=========', res.message);
        }).catch(error => {
            console.log('error in sending request', error);
        });
    }
useEffect(()=>{
    
},[requestSent])
    return (
        <View>
            <View
                style={HomeNeoCards.flatlistItemContainer}>
                <Neomorph
                    darkShadowColor={AppColors.primary} // <- set this
                    lightShadowColor={AppColors.primary}// <- this
                    swapShadows
                    style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
                >
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
                   {/* profile name view */}
                    <View style={HomeNeoCards.nameAndMsgContainer}>
                        <Text
                            style={HomeNeoCards.profileName(theme.profileNameColor)}>
                            {item.name}
                        </Text>
                        <Text
                            style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                            {item.phoneNo}
                        </Text>
                    </View>
                    <Button mode="contained"
                        style={{
                            width: wp('25'),
                            alignSelf: 'center',
                            margin: 10,
                            backgroundColor: theme.buttonsColor
                        }}
                        onPress={() => sendRequest().then(() => { setIsSending(true); setRequestSent(true) })}
                        accessibilityLabel="Send Label">
                        {isSending ? (
                            <ActivityIndicator size="small" color="#ffffff" /> // Show loading animation
                        ) : (
                            <Text style={[UserChatStyle.sendButtonText]}>{requestSent?"Cancel":"Send Request"}</Text>
                        )}
                    </Button>
                </Neomorph>
            </View>
        </View>
    );
};

export default RenderRequest;