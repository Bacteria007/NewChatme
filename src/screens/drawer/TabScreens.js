import { useCallback, useContext, useEffect, useState, } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reels from '../Reels/Reels';
import Calls from '../Calls/Calls';
import Groups from '../chats/groups/AllGroups';
import Discussions from '../chats/discussions/Discussions';
import StreamOutlineWhite from '../../assets/imges/footerIcons/streamOutlineBlack.svg';
import StreamOutlineBlack from '../../assets/imges/footerIcons/streamOutlineWhite.svg';
import { ThemeContext } from '../../context/ThemeContext';
import FontStyle from '../../assets/styles/FontStyle';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import AllUsers from '../requests/AllUsers';
import { useFocusEffect, useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
    const { darkThemeActivator, theme } = useContext(ThemeContext);
    let iconSize = 18;
    // //Tab Variables Start
    const reelsIconSize = 19;
    const focusedColor = theme.focusedTabIconsColor;
    const notfocusedColor = theme.notFocusedTabIconsColor;
    const tabColor = theme.tabColor;
    const tabFontBold = FontStyle.boldFont;
    const tabFontSemiBold = FontStyle.semiBoldFont;
    const drawerStatus = useDrawerStatus();
    const [currentRoute, setCurrentRoute] = useState('')
    const route = useRoute()
    let routeName;
    useFocusEffect(() => {
        routeName = getFocusedRouteNameFromRoute(route)
        console.log('tab screen: ', routeName);
        setCurrentRoute(routeName)
    })


    useEffect(() => {
        if (drawerStatus == 'open') {
            console.log("drawer is opened")
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(AppColors.Mauve);
        } else if (drawerStatus == 'closed') {
            // console.log("drawer is closed")
            if (currentRoute !== "Reels") {
                StatusBar.setBarStyle(theme.statusBarText);
                StatusBar.setBackgroundColor(theme.backgroundColor);
            } else {
                StatusBar.setBarStyle('light-content');
                StatusBar.setBackgroundColor(AppColors.black);
            }
        }
    }, [drawerStatus, currentRoute]);
    const progress = useDrawerProgress();
    // console.log('progress', progress);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { scale: interpolate(progress.value, [0, 1], [1, 0.75], 'clamp') },
            // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
            {
                translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp'),
            },
        ],
        overflow: 'hidden',
        borderRadius: progress.value === 1 ? 18 : 0,
        shadowColor: 'rgba(0,0,0,1)', // Shadow color
        shadowOpacity: 1, // Opacity of the shadow
        shadowRadius: 10, // Radius of the shadow blur
        shadowOffset: {
            width: 0, // Horizontal offset
            height: -10, // Vertical offset
        },
        elevation: 10,
    }));


    return (

        <Animated.View style={[animatedStyle, { flex: 1 }]}>
            <Tab.Navigator
                initialRouteName="Chats"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                    tabBarStyle: {
                        height: hp('8%'),
                        borderTopWidth: 0,
                        borderTopColor: darkThemeActivator ? AppColors.darkTheme : AppColors.transparent,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: tabColor,
                    },
                    tabBarLabelStyle: {
                        fontSize: wp('2.8%'),
                        marginBottom: hp('1%'),
                        marginTop: hp('0%'),
                        fontFamily: tabFontSemiBold,
                    },
                    tabBarItemStyle: { backgroundColor: tabColor },
                    tabBarActiveTintColor: focusedColor,
                    tabBarInactiveTintColor: notfocusedColor,
                    tabBarHideOnKeyboard: 'true',
                    tabBarPressColor: 'rgba(255,255,255,0.6)',
                    tabBarIcon: ({ focused }) => {
                        let iconColor = focused ? focusedColor : notfocusedColor;
                        if (route.name === 'Chats') {
                            return (
                                <Icons.Ionicons size={iconSize} name={focused ? 'ios-chatbubbles-sharp' : 'ios-chatbubbles-outline'} color={iconColor} />
                            );
                        } else if (route.name === 'Calls') {
                            return (
                                <Icons.Ionicons size={iconSize} name={focused ? 'call-sharp' : 'call-outline'} color={iconColor}
                                />
                            );
                        } else if (route.name === 'Discover') {
                            return (
                                <Icons.Ionicons size={21} name={'search-sharp'} color={iconColor} />

                            );
                        } else if (route.name === 'Reels') {
                            return focused ? (
                                <Icons.FontAwesome5 name="stream" size={reelsIconSize} color={iconColor}
                                />
                            ) : darkThemeActivator ? (
                                <StreamOutlineBlack />
                            ) : (
                                <StreamOutlineWhite />
                            );
                        } else if (route.name === 'Groups') {
                            return (
                                <Icons.Ionicons size={iconSize} name={focused ? 'people-sharp' : 'people-outline'} color={iconColor}
                                />
                            );
                        }

                    },
                })}>
                <Tab.Screen name="Chats" component={Discussions} />
                <Tab.Screen name="Groups" component={Groups} />
                <Tab.Screen name="Calls" component={Calls} />
                <Tab.Screen name="Reels" component={Reels} />
                <Tab.Screen name="Discover" component={AllUsers} />
            </Tab.Navigator>
        </Animated.View>
    );
};

export default TabScreens