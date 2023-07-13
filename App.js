import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, View, Text, SafeAreaView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
// SCREENS
import Reels from './src/screens/reels/Reels';
import Contacts from './src/screens/contacts/Contacts';
import Calls from './src/screens/calls/Calls';
import AppColors from './src/assets/colors/Appcolors';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import UserProfile from './src/screens/profile/UserProfile';
import AboutUs from './src/screens/about/AboutUs';
import Groups from './src/screens/chats/groups/AllGroups';
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import Discussions from './src/screens/chats/discussions/Discussions';
import UserChat from './src/screens/chats/singlePersonChat/UserChat';
import Settings from './src/screens/settings/Settings';

import AppContext, { AppProvider } from './src/context/AppContext';
// ICONS
import Icon, { Icons } from './src/assets/Icons'; // Navigation
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
  useDrawerProgress,
} from '@react-navigation/drawer';
import TermsAndConditions from './src/screens/TermsAndConditions';
import Containers from './src/assets/styles/Containers';

import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import ChangeNumber from './src/screens/settings/security/ChangeNumber';
import ChangeNumberInfo from './src/screens/settings/security/ChangeNumberInfo';
import ChangePassword from './src/screens/settings/security/ChangePassword';
import BlockContacts from './src/screens/settings/security/BlockContacts';
import DeleteAccount from './src/screens/settings/accountPreferences/DeleteAccount';
import Theme from './src/screens/settings/accountPreferences/Theme';
import MyActivity from './src/screens/settings/accountPreferences/MyActivity';
import LogInScreen from './src/screens/auth/LogInScreen';

import Notification from './src/screens/settings/notification/Notification';
import RejectedCall from './src/screens/calls/RejectedCall';
import OutgoingCall from './src/screens/calls/OutgoingCall';


import ChatBot from './src/screens/ChatBot';
import LanguageChangeScreen from './src/components/LanguageChange/LanguageChangeScreen';
import TabIcons from './src/components/TabIcons';
import StreamOutline from './src/assets/imges/footerIcons/streamOutline.svg';
import ReelsoutlineIcon from './src/assets/imges/footerIcons/reels.svg'
import ReelsFilledIcon from './src/assets/imges/footerIcons/reelsFilled.svg'
import ContactsFill from './src/assets/imges/footerIcons/contacts.svg'
import ContactsOutline from './src/assets/imges/footerIcons/contactsOutline.svg'
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from './src/context/ThemeContext';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {

  //   const [scrollY, setScrollY] = useState(new Animated.Value(0));
  //   const [visible, setVisible] = useState(true)
  //   const handleScroll = Animated.event(
  //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  //     { useNativeDriver: true }
  //   )
  //   const togleTabVisibility = (value) => {
  //     setVisible(value)
  // console.log(value)

  //   }
  //   useEffect(() => {
  //     scrollY.addListener(({ value }) => {
  //       if (value > 0) {
  //         togleTabVisibility(false)
  //       } else {
  //         togleTabVisibility(true)
  //       }
  //     });
  //     return () => {
  //       scrollY.removeAllListeners();
  //     }
  //   }, [])

  let iconSize = 20;
  const TabScreens = () => {
    const isFocused = useIsFocused()
    const { darkThemeActivator,theme } = useContext(ThemeContext);

    let progress = useDrawerProgress();
    console.log('progress', progress);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 1000 },
        { scale: interpolate(progress.value, [0, 1], [1, 0.7], 'clamp') },
        // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
        { translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp') },
      ],
      overflow: 'hidden',
      // shadowColor:AppColors.white,
      // shadowOffset:{height:hp('50%'),width:wp('30%')},
      // shadowOpacity:0.5,shadowRadius:50,
      // elevation: 2,
      // borderRadius:progress.value===1?12:0
    }));

    return (
      <Animated.View style={[animatedStyle, { flex: 1 }]}>
        <Tab.Navigator
initialRouteName='Groups'
          screenOptions={({ route, focused }) => ({

            headerShown: false,
            tabBarIndicatorStyle: { backgroundColor: 'transparent' },
            tabBarStyle: {
              height: hp('9%'),
              borderTopWidth: 0,
              borderTopColor: darkThemeActivator ? AppColors.darkTheme : AppColors.transparent,
              // flex: 0.12,
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor:AppColors.lightwhite,
              // backgroundColor:"rgba(255, 182, 193,0.7)", //pink
              // backgroundColor:"rgba (196,221,254,0.4)", //blue
              elevation: 0,  // <-- this is the solution
              position: 'absolute',
            },
            tabBarItemStyle: { backgroundColor: theme.tabColor  },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: wp('3.5%'),
              marginBottom: hp('2.2%'),
              marginTop: hp('0%'),
              marginBottom: hp('2%'),
              // marginTop: hp('0%'),
            },
            // tabBarLabel:({ focused }) => {
            //   return <Text style={{fontSize: hp('1.7%'), fontWeight: 'bold', color:focused? AppColors.black:AppColors.inActiveIconsColor,

            //   marginBottom: hp('1%')}}>{focused ? route.name : route.name}</Text>
            // },
            // tabBarBackground: () => (
            //   <View>
            //     <LinearGradient
            //       //---1
            //       // colors={["rgba(255, 255, 255,0.0)", "rgba(255, 255, 255,0.7)"]}  // pink only
            //       // start={{ x: 1, y: 0.0 }} end={{ x: 1, y: 1 }} // horizontal
            //       // locations={[0.1, 0.4]}
            //       //---2
            //       // colors={["rgba(196,221,254,0.2)", "rgba(196,221,254,0.9)"]} // blue
            //       // locations={[0.1, 0.4]}
            //       //---3
            //       colors={["rgba(255, 255, 255,0.1)", "rgba(255, 255, 255,1)"]}  // pink only
            //       start={{ x: 1, y: 0.0 }} end={{ x: 1, y: 1 }} // horizontal
            //        locations={[0.1, 0.3]}
            //       //---
            //       //--------
            //       // start={{ x: 0.6, y: 0.5 }} end={{ x: 0.1, y: 0.5 }} // for vertical colors
            //       // colors={["rgba(196,221,254,0.6)", "rgba(255, 182, 193,0.7)"]} //pink blue
            //       // colors={[AppColors.linearGradient.blue, AppColors.linearGradient.pink]} //pink blue
            //       style={{ height: hp('9%') }}
            //     />
            //   </View>
            // ),
            tabBarActiveTintColor:  theme.focusedTabIconsColor,
            tabBarInactiveTintColor: theme.notFocusedTabIconsColor,
            tabBarHideOnKeyboard: 'true',
            tabBarPressColor: 'rgba(255,255,255,0.6)',
            // tabBarLabelPosition:'beside-icon',
            // tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => {
              if (route.name === 'Chats') {
                return (
                  <TabIcons focused={focused} size={19} type={Icons.Ionicons} name={focused ? 'ios-chatbubbles-sharp' : 'ios-chatbubbles-outline'} />
                );
              } else if (route.name === 'Calls') {
                return (
                  <TabIcons focused={focused} size={19} type={Icons.Ionicons} name={focused ? 'call-sharp' : 'call-outline'} />
                );
              } else if (route.name === 'Contacts') {
                return (
                  <TabIcons focused={focused} size={19} type={Icons.MaterialCommunityIcons} name={focused ? 'contacts' : 'contacts-outline'} />

                );
              } else if (route.name === 'Reels') {
                return (
                  focused ?
                    <Icons.FontAwesome5 name="stream" size={16} color={AppColors.black} /> :
                    <StreamOutline />

                );
              } else if (route.name === 'Groups') {
                return (
                  <TabIcons focused={focused} size={19} type={Icons.Ionicons} name={focused ? 'people-sharp' : 'people-outline'} />


                );
              }
            },

          })
          }
        >


          <Tab.Screen name="Chats" component={Discussions} />
          <Tab.Screen name="Groups" component={Groups} />
          <Tab.Screen name="Calls" component={Calls} />
          <Tab.Screen name="Reels" component={Reels} />
          <Tab.Screen name="Contacts" component={Contacts} />

        </Tab.Navigator>
      </Animated.View>
    );
  };
  const SettingStack = () => {
    return (
      <Stack.Navigator
        options={{ headerShown: false }}
        initialRouteName="mainScreen">
        <Stack.Screen
          name="mainScreen"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changeNumber"
          component={ChangeNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changeNumberInfo"
          component={ChangeNumberInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="blocked"
          component={BlockContacts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="deleteAccount"
          component={DeleteAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="theme"
          component={Theme}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="activity"
          component={MyActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="appLanguage"
          component={LanguageChangeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  const DrawerScreens = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          overlayColor: 'transparent',
          drawerType: 'slide',
          drawerActiveTintColor: AppColors.black,
          drawerInactiveTintColor: AppColors.black,
          drawerStyle: {
            width: wp('55%'),
            backgroundColor: AppColors.linearGradient.pink,
          },
          drawerLabelStyle: { marginLeft: wp('-6%') },
          drawerActiveBackgroundColor: AppColors.white,
          sceneContainerStyle: {
            backgroundColor: AppColors.linearGradient.pink,
            // shadowColor:AppColors.white,
            // shadowOffset:{height:hp('50%'),width:wp('30%')},
            // shadowOpacity:0.5,shadowRadius:50,elevation:10
          },
          // drawerHideStatusBarOnOpen: true,
          // swipeEnabled:false,  //--->> for drawerHideStatusBarOnOpen 
        }}
        // backBehavior='history'
        initialRouteName="Home"
        drawerContent={props => {
          return (
            <View style={{ flex: 1 }}>
              <DrawerContentScrollView {...props}>
                <Animated.View
                  style={[Containers.centerContainer, { height: hp('25%') }]}>
                  <Image
                    source={require('./src/assets/imges/w11.jpg')}
                    style={{
                      height: wp('25%'),
                      width: wp('25%'),
                      borderRadius: wp('100%'),
                    }}
                  />
                  <Text style={{ fontSize: hp('3%'), color: AppColors.black }}>
                    User Name
                  </Text>
                </Animated.View>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
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
          component={SettingStack}
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
    );
  };
  const theme = {
    colors: {
      background: "transparent",
    },
  }
  return (

    <AppProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          options={{ headerShown: false }}
          initialRouteName="DrawerScreens"
        // screenOptions={{navigationBarColor:"rgba(255, 182, 193,0.5)"}}
        >

          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}

            options={{ headerShown: false }}


          />
          <Stack.Screen
            name="LogInScreen"
            component={LogInScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="UserChat"
            component={UserChat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="rejected"
            component={OutgoingCall}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DrawerScreens"
            component={DrawerScreens}

            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChatBot'
            component={ChatBot}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>

  );
};

export default App;