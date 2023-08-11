import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reels from '../reels/Reels';
import Calls from '../calls/Calls';
import Groups from '../chats/groups/AllGroups';
import Discussions from '../chats/discussions/Discussions';
import StreamOutlineWhite from '../../assets/imges/footerIcons/streamOutlineBlack.svg';
import StreamOutlineBlack from '../../assets/imges/footerIcons/streamOutlineWhite.svg';
import { ThemeContext } from '../../context/ThemeContext';
import AddContact from '../contacts/AddContact';
import FontStyle from '../../assets/styles/FontStyle';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';

  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
const Tab = createBottomTabNavigator();

const TabScreens = () => {

    const {theme,darkThemeActivator} =useContext(ThemeContext)
    const iconSize = 18
    const reelsIconSize = 19
    const focusedColor = theme.focusedTabIconsColor
    const notfocusedColor=theme.notfocusedColor
    const tabColor=theme.tabColor
    const myFontFamily=FontStyle.regularFont
    let progress = useDrawerProgress();
    console.log('progress', progress);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { scale: interpolate(progress.value, [0, 1], [1, 0.7], 'clamp') },
            // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
            {
                translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp'),
            },
        ],
        overflow: 'hidden',
        // borderRadius:progress.value===1?12:0
    }));

    return (
        <Animated.View style={[animatedStyle, { flex: 1 }]}>
            <Tab.Navigator
                initialRouteName="Groups"
                screenOptions={({ route, focused }) => ({
                    headerShown: false,
                    tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                    tabBarStyle: {
                        height: hp('8%'),
                        borderTopWidth: 0,
                        borderTopColor: darkThemeActivator
                            ? AppColors.darkTheme
                            : AppColors.transparent,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: tabColor,

                    },

                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: wp('3.5%'),
                        marginBottom: hp('1%'),
                        marginTop: hp('0%'),
                        fontFamily:myFontFamily
                    },
                    tabBarItemStyle: { backgroundColor: tabColor },
                    tabBarActiveTintColor: focusedColor,
                    tabBarInactiveTintColor: notfocusedColor,
                    tabBarHideOnKeyboard: 'true',
                    tabBarPressColor: 'rgba(255,255,255,0.6)',
                    tabBarIcon: ({ focused }) => {
                        let iconColor = focused ? focusedColor : notfocusedColor

                        if (route.name === 'Chats') {
                            return (
                                <Icons.Ionicons
                                    size={iconSize}
                                    name={
                                        focused
                                            ? 'ios-chatbubbles-sharp'
                                            : 'ios-chatbubbles-outline'
                                    }
                                    color={iconColor}

                                />
                            );
                        } else if (route.name === 'Calls') {
                            return (
                                <Icons.Ionicons
                                    size={iconSize}
                                    name={focused ? 'call-sharp' : 'call-outline'}
                                    color={iconColor}

                                />
                            );
                        } else if (route.name === 'Contacts') {
                            return (
                                <Icons.MaterialCommunityIcons
                                    size={iconSize}
                                    name={focused ? 'contacts' : 'contacts-outline'}
                                    color={iconColor}

                                />
                            );
                        } else if (route.name === 'Reels') {
                            return focused ? (
                                <Icons.FontAwesome5
                                    name="stream"
                                    size={reelsIconSize}
                                    color={iconColor}

                                />
                            ) : darkThemeActivator ? (
                                <StreamOutlineBlack />
                            ) : (
                                <StreamOutlineWhite />
                            );
                        } else if (route.name === 'Groups') {
                            return (
                                <Icons.Ionicons
                                    size={iconSize}
                                    name={focused ? 'people-sharp' : 'people-outline'}
                                    color={iconColor}

                                />
                            );
                        }
                    },
                })}>
                <Tab.Screen name="Chats" component={Discussions} />
                <Tab.Screen name="Groups" component={Groups} />
                <Tab.Screen name="Calls" component={Calls} />
                <Tab.Screen name="Reels" component={Reels} />
                <Tab.Screen name="Contacts" component={AddContact} />
            </Tab.Navigator>
        </Animated.View>
    );
};

export default TabScreens;