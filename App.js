import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// SCREENS
import Reels from './src/screens/Reels/Reels';
import Contacts from './src/screens/contacts/Contacts';
import Calls from './src/screens/Calls/Calls';
import AppColors from './src/assets/colors/Appcolors';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import UserProfile from './src/screens/profile/UserProfile';
import AboutUs from './src/screens/About/AboutUs';
import Groups from './src/screens/chats/groups/AllGroups';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import Discussions from './src/screens/chats/discussions/Discussions';
import UserChat from './src/screens/chats/singlePersonChat/UserChat';
import Settings from './src/screens/settings/Settings';

import {AppProvider} from './src/context/AppContext';
// ICONS
import Icon, { Icons } from './src/assets/Icons'; // Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator, useDrawerProgress
} from '@react-navigation/drawer';
import TermsAndConditions from './src/screens/TermsAndConditions';
import Containers from './src/assets/styles/Containers';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

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

  let iconSize = 22;
  const TabScreens = () => {
    const progress = useDrawerProgress()
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 1000 },
        { scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp') },
        // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
        { translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp') }
      ],
      // borderRadius:10,
      overflow:'hidden',

    }));
    return (
      <Animated.View style={[animatedStyle, { flex: 1}]}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIndicatorStyle: { backgroundColor: 'transparent' },
            tabBarStyle: {
              backgroundColor: AppColors.white,
              height: hp('11%'),
              borderTopColor: 'transparent',
            },
            tabBarItemStyle: { backgroundColor: AppColors.white },
            tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12, marginBottom: hp('2%'), marginTop: hp('0%') },
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
                    size={iconSize}
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
                    size={iconSize}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Contacts') {
                return (
                  <Icons.MaterialCommunityIcons
                    name={focused ? 'contacts' : 'contacts-outline'}
                    size={iconSize}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Reels') {
                return (
                  <Icons.MaterialCommunityIcons
                    name={focused ? 'video-wireless' : 'video-wireless-outline'}
                    size={iconSize}
                    color={
                      focused ? AppColors.primary : AppColors.inActiveIconsColor
                    }
                  />
                );
              } else if (route.name === 'Groups') {
                return (
                  <Icons.Ionicons
                    name={focused ? 'people-sharp' : 'people-outline'}
                    size={iconSize}
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
  const DrawerScreens = () => {
    return (
      <Drawer.Navigator

        screenOptions={{
          headerShown: false,
          overlayColor: 'transparent',
          drawerType: 'slide',
          drawerActiveTintColor: AppColors.black,
          drawerInactiveTintColor: AppColors.black,
          drawerStyle: { backgroundColor: AppColors.primary, width: wp('60%') },
          drawerLabelStyle: { marginLeft: wp('-6%') },
          sceneContainerStyle: { backgroundColor: AppColors.primary },

        }}
        backBehavior="initialRoute"
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
                  <Text style={{ fontSize: hp('3%'), color: AppColors.white }}>
                    User Name
                  </Text>
                </Animated.View>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            </View>
          );
        }}

      >
        <Drawer.Screen
          name="Home"
          component={TabScreens}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.Ionicons
                name={'ios-home' }
                color={AppColors.black}
                // name={focused ? 'ios-home' : 'ios-home-outline'}
                // color={focused ? AppColors.white : AppColors.black}
                size={iconSize}
              />
            ),

          }}
        />
        <Drawer.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            drawerIcon: ({focused}) => (
              <Icons.MaterialIcons
                name={ 'person'}
                color={ AppColors.black}
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
            drawerIcon: ({focused}) => (
              <Icons.Ionicons
                name={
                  
                     'ios-information-circle-sharp'
                    
                }
                color={ AppColors.black}
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
          component={Settings}
          options={{
            drawerIcon: ({focused}) => (
              <Icons.Ionicons
                name={'ios-settings-sharp'}
                color={ AppColors.black}
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
            drawerIcon: ({ focused }) =>
              // focused ? (
                <Icons.FontAwesome5
                  name="file-signature"
                  color={ AppColors.black}               
                  size={iconSize}
                />
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
      <NavigationContainer>
        <Stack.Navigator
          options={{ headerShown: false }}
          initialRouteName="DrawerScreens">
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserChat"
            component={UserChat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerScreens"
            component={DrawerScreens}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
