import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
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

import { AppProvider } from './src/context/AppContext';
// ICONS
import Icon, { Icons } from './src/assets/Icons'; // Navigation
import { NavigationContainer } from '@react-navigation/native';
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

import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import ChangeNumber from './src/screens/settings/security/ChangeNumber';
import ChangeNumberInfo from './src/screens/settings/security/ChangeNumberInfo';
import ChangePassword from './src/screens/settings/security/ChangePassword';
import BlockContacts from './src/screens/settings/security/BlockContacts';
import DeleteAccount from './src/screens/settings/accountPreferences/DeleteAccount';
import Theme from './src/screens/settings/accountPreferences/Theme';
import MyActivity from './src/screens/settings/accountPreferences/MyActivity';
import LogInScreen from './src/screens/auth/LogInScreen';


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
      // borderRadius:progress.value===1?12:0
    }));

    return (
      <Animated.View style={[animatedStyle, { flex: 1 }]}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIndicatorStyle: { backgroundColor: 'transparent' },
            tabBarStyle: {
              height: hp('12%'),
              borderTopColor: 'transparent',
              flex: 0.12,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            tabBarItemStyle: { backgroundColor: AppColors.tab },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: wp('3.5%'),
              marginBottom: hp('2.2%'),
              marginTop: hp('0%'),
            },
            tabBarActiveTintColor: AppColors.primary,
            tabBarInactiveTintColor: AppColors.inActiveIconsColor,
            tabBarHideOnKeyboard: 'true',
            tabBarPressColor: 'rgba(255,255,255,0.6)',
            tabBarIcon: ({ focused }) => {
              if (route.name === 'Chats') {
                return (
                  <Icons.Ionicons
                    name={
                      focused
                        ? 'ios-chatbubbles-sharp'
                        : 'ios-chatbubbles-outline'
                    }
                    size={22}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Calls') {
                return (
                  <Icons.Ionicons
                    name={focused ? 'call-sharp' : 'call-outline'}
                    // ios-call ios-call-sharp
                    size={21}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Contacts') {
                return (
                  <Icons.MaterialCommunityIcons
                    name={focused ? 'contacts' : 'contacts-outline'}
                    size={21}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Reels') {
                return (
                  <Icons.MaterialCommunityIcons
                    name={focused ? 'video-wireless' : 'video-wireless-outline'}
                    size={21}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Groups') {
                return (
                  <Icons.Ionicons
                    name={focused ? 'people-sharp' : 'people-outline'}
                    size={22}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              }
            },
          })}>
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
        options={{headerShown: false}}
        initialRouteName="mainScreen">
        <Stack.Screen
          name="mainScreen"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="chnageNumber"
          component={ChangeNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="changeNumberInfo"
          component={ChangeNumberInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="blocked"
          component={BlockContacts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="deleteAccount"
          component={DeleteAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="theme"
          component={Theme}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="activity"
          component={MyActivity}
          options={{headerShown: false}}
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
          drawerStyle: { backgroundColor: AppColors.primary, width: wp('50%') },
          drawerLabelStyle: { marginLeft: wp('-6%') },
          sceneContainerStyle: { backgroundColor: AppColors.primary },
          // drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor:AppColors.white,

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

  return (
    <AppProvider>

     

      <Animated.View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            options={{ headerShown: false }}
            initialRouteName="WelcomeScreen">
            <Stack.Screen
            name="TabScreen"
            component={TabScreens}
            options={{ headerShown: false }}
          /> 
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}

              options={{headerShown: false}}


            />
             <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}

              options={{headerShown: false}}


            />
            <Stack.Screen
              name="UserChat"
              component={UserChat}

              options={{headerShown: false}}


            />
            <Stack.Screen
              name="DrawerScreens"
              component={DrawerScreens}

              options={{headerShown: false}}


            />
          </Stack.Navigator>
        </NavigationContainer>
      </Animated.View>
    </AppProvider>
  );
};

export default App;
