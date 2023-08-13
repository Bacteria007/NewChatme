import { useContext } from "react";
import HomeNeoCards from "../../assets/styles/homeScreenCardStyles/HomeNeoCards";
import { ThemeContext } from "../../context/ThemeContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import { Icons } from "../../assets/Icons";
import AppColors from "../../assets/colors/Appcolors";


const RenderComponent = ({ name, dp,callingScreen,discussions_item,groups_item,contacts_item,navigation}) => {
    const { theme } = useContext(ThemeContext)
    return (
        <TouchableOpacity
            onPress={() => {
                if(callingScreen==="Discussions"){
                    console.log("Comming form Discussions")
                    console.log('CONTACT INFOOOOOOOOOOOOOOOOOOOOOO',discussions_item)
                    navigation.navigate('UserChat', { itm: discussions_item });
                }
               else if(callingScreen==="Groups"){
                    console.log("Comming form Groups")
                    navigation.navigate('GroupChat', { item: groups_item });
                }
               else if(callingScreen==="Contacts"){
                    console.log("Comming form Contacts")
                    console.log('CONTACT INFOOOOOOOOOOOOOOOOOOOOOO',contacts_item)
                    navigation.navigate('UserChat', { itm: contacts_item });
                }
              
            }}
        >
            <View
                style={HomeNeoCards.flatlistItemContainer}>
                <Neomorph
                    darkShadowColor={AppColors.purple} // <- set this
                    lightShadowColor={AppColors.purple}// <- this
                    swapShadows
                    style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}
                >
                    {dp == null ?
                    <View style={HomeNeoCards.dpVew}>
                    <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                        <TouchableOpacity>
                            {/* <Image
                            source={item.dpImage}
                            style={[HomeNeoCards.dpIcon]}
                            /> */}
                          
                            {callingScreen==="Discussions" || callingScreen==="Contacts" ?
                            <Icons.MaterialIcons name={'person'} size={29} color={theme.groupDpIconColor} />
                            :
                            <Icons.Ionicons name={'people'} size={25} color={theme.groupDpIconColor} />
                        }
                        </TouchableOpacity>
                    </View>
                    </View>
                    : 
                    // jo backend sy aye ga wo is null ki jga pr rkhna hy
                    null
                    }
                    {/* msg view */}
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
        </TouchableOpacity>

    );
};

export default RenderComponent;