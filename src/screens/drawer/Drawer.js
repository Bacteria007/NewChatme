import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
  } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
  } from '@react-navigation/drawer';
  import TermsAndConditions from '../TermsAndConditions';
// import TabScreens from './TabScreens';
import UserProfile from '../profile/UserProfile';
import AboutUs from '../about/AboutUs';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import AppContext from '../../context/AppContext';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { useContext } from 'react';
import Settings2 from '../settings/Settings2';
import { Icons } from '../../assets/Icons';
import Animated , { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Containers from '../../assets/styles/Containers';

// ======================TAB  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reels from '../reels/Reels';
import Calls from '../calls/Calls';
import Groups from '../chats/groups/AllGroups';
import Discussions from '../chats/discussions/Discussions';
import StreamOutlineWhite from '../../assets/imges/footerIcons/streamOutlineBlack.svg';
import StreamOutlineBlack from '../../assets/imges/footerIcons/streamOutlineWhite.svg';
import AddContact from '../contacts/AddContact';
import FontStyle from '../../assets/styles/FontStyle';
import { useDrawerProgress } from '@react-navigation/drawer';


// ================



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
     //  DRAWER VARIABLES START
    const {isUserLoggedin } = useContext(AppContext);
    const { darkThemeActivator, theme } = useContext(ThemeContext);
    let iconSize = 18
    const drawerBackgroungColor=theme.drawerColor
    const activeTintColor=AppColors.black
    const inActiveTintColor=AppColors.black
    const activeBgColor=AppColors.white
    const inActiveBgColor=AppColors.transparent
    const myFontFamily=FontStyle.regularFont
// DRAWER VARIABLES END

// ==================


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


// ==================


// FINCTIONS
    const logoutUser = async ({ navigation }) => {
      try {
        console.log("isUserLoggedin ", isUserLoggedin)
        await AsyncStorage.removeItem('user');
        // storeLoggedinStatus(false)
        console.log('User removed from storage');
        // updateCurrentUserId(''); // Clear the currentUserId in the context
        navigation.replace('LogInScreen');
      } catch (error) {
        console.log('Error while removing user from storage:', error);
        Alert.alert('You are unable to logout, try again later!');
        // updateCurrentUserId(blank); // Clear the currentUserId in the context
        // navigation.navigate('LogInScreen'); // Navigate even if there's an error (you may handle it differently as per your app's logic)
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            overlayColor: 'white',
            drawerType: 'slide',
            drawerActiveTintColor: activeTintColor,
            drawerInactiveTintColor: inActiveTintColor,
            drawerStyle: {
              width: wp('50%'),
              backgroundColor: drawerBackgroungColor,
            },
            drawerLabelStyle: { marginLeft: wp('-6%'),fontFamily:myFontFamily },
            drawerActiveBackgroundColor: activeBgColor,
            sceneContainerStyle: {
              backgroundColor:drawerBackgroungColor,
            },
            // drawerHideStatusBarOnOpen: true,
            // swipeEnabled:false,  //--->> for drawerHideStatusBarOnOpen
          }}
          // backBehavior='history'
          initialRouteName="Settings"
          drawerContent={props => {
            return (
              <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                  <Animated.View
                    style={[Containers.centerContainer, { height: hp('25%') }]}>
                    <Image
                      source={require('../../assets/imges/w11.jpg')}
                      style={{
                        height: wp('25%'),
                        width: wp('25%'),
                        borderRadius: wp('100%'),
                      }}
                    />
                    <Text
                      style={{ fontSize: hp('3%'), color: AppColors.black }}>
                      User Name
                    </Text>
                  </Animated.View>
                  <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <TouchableOpacity
                  onPress={() => {
                    logoutUser(props);
                  }}>
                  <View
                    style={{
                      paddingLeft: wp('5%'),
                      paddingBottom: hp('4%'),
                      flexDirection: 'row',
                    }}>
                    <Icons.AntDesign
                      name="logout"
                      color={AppColors.black}
                      size={iconSize}
                    />
                    <Text
                      style={{
                        fontSize: wp('4%'),
                        fontFamily: FontStyle.regularFont,
                        color: AppColors.black,
                        marginLeft: wp('3.5%'),
                      }}>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}>
          <Drawer.Screen
            name="Home"
            component={TabScreens}
            options={{
              drawerIcon: ({ focused }) => (
                <Icons.MaterialCommunityIcons
                  name={'home'}
                  color={AppColors.black}
                  // name={focused ? 'ios-home' : 'ios-home-outline'}
                  // color={focused ? AppColors.white : AppColors.black}
                  size={iconSize}
                />
                // <Icons.Ionicons
                //   name={'ios-home'}
                //   color={AppColors.black}
                //   // name={focused ? 'ios-home' : 'ios-home-outline'}
                //   // color={focused ? AppColors.white : AppColors.black}
                //   size={iconSize}
                // />
              ),
            }}
          />
          <Drawer.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              drawerIcon: ({ focused }) => (
                <Icons.MaterialIcons
                  name={'person'}
                  color={AppColors.black}
                  // name={focused ? 'person' : 'person-outline'}
                  // color={focused ? AppColors.white : AppColors.black}
                  size={iconSize}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="AboutUs"
            component={AboutUs}
            options={{
              drawerIcon: ({ focused }) => (
                <Icons.Ionicons
                  name={'ios-information-circle-sharp'}
                  color={AppColors.black}
                  // name={
                  //   focused
                  //     ? 'ios-information-circle-sharp'
                  //     : 'ios-information-circle-outline'
                  // }
                  // color={focused ? AppColors.white : AppColors.black}
                  size={iconSize}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={Settings2}
            options={{
              drawerIcon: ({ focused }) => (
                <Icons.Ionicons
                  name={'ios-settings-sharp'}
                  color={AppColors.black}
                  // name={focused ? 'ios-settings-sharp' : 'ios-settings-outline'}
                  // color={focused ? AppColors.white : AppColors.black}
                  size={iconSize}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Terms And Conditions"
            component={TermsAndConditions}
            options={{
              drawerIcon: ({ focused }) => (
                // focused ? (
                <Icons.FontAwesome5
                  name="file-signature"
                  color={AppColors.black}
                  size={iconSize}
                />
              ),
              // ) : (
              //   <Icons.MaterialCommunityIcons
              //     name="file-sign"
              //     color={focused ? AppColors.white : AppColors.black}
              //     size={iconSize}
              //   />
              // ),
            }}
          />
        </Drawer.Navigator>
      </View>
    );
  };

  export default DrawerScreens