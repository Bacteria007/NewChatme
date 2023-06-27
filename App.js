<<<<<<< HEAD
import 'react-native-gesture-handler';
import React from 'react'
=======
import React, { useRef, useEffect, useState } from 'react'
>>>>>>> 684f34d871163ca04cd0b2dc0a56df899011c0cc
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// SCREENS
import Reels from './src/screens/Reels/Reels';
import Contacts from './src/screens/Contact/Contacts';
import Calls from './src/screens/Calls/Calls';
import AppColors from './src/assets/colors/Appcolors';
// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // add call SimpleLineIcons call-in out
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //more
import Ionicons from 'react-native-vector-icons/Ionicons'; //more
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
// import Drawer from './src/components/Drawer/Drawer';
import UserChat from './src/screens/chats/UserChat';
import Chats from './src/screens/Home/Chats';
import { AppProvider } from './src/context/AppContext';
import Icon, { Icons } from './src/assets/Icons';

import SignUpScreen from './src/screens/Auth/SignUpScreen';
import AppHeader from './src/components/Headers/AppHeaders/AppHeader';
<<<<<<< HEAD
import UserProfile from './src/screens/profile/UserProfile';
import AboutUs from './src/screens/About/AboutUs';

=======
import Containers from './src/assets/styles/Containers';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
>>>>>>> 684f34d871163ca04cd0b2dc0a56df899011c0cc

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App = ({ navigation }) => {

  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(true)
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )
  const togleTabVisibility = (value) => {
    setVisible(value)
  }
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > 0) {
        togleTabVisibility(false)
      } else {
        togleTabVisibility(true)
      }
    });
    return () => {
      scrollY.removeAllListeners();
    }
  }, [])


  let focusedIconColor = AppColors.primary;
  let inActiveIconKAColor = 'rgba(0,0,0,0.4)';
  let activeTextColor = AppColors.primary;
  let inActiveTextColor = inActiveIconKAColor;
  let iconSize = 22;
  const tabkacolor = "white"

  const TabScreens = ({ navigation }) => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIndicatorStyle: { height: hp('1%'), backgroundColor: 'white' },
          tabBarStyle: { backgroundColor: AppColors.white, height: hp('7%') },
          tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
          tabBarItemStyle: { fontWeight: 'bold', fontSize: 12, color: activeTextColor },
          tabBarActiveTintColor: activeTextColor,
          tabBarInactiveTintColor: inActiveTextColor,
          tabBarHideOnKeyboard: 'true',
          tabBarPressColor: 'rgba(255,255,255,0.7)',
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Chats') {
              return (
                <FontAwesome
                  name={'home'}
                  size={iconSize}
                  color={focused ? focusedIconColor : inActiveIconKAColor}
                />
              );
            } else if (route.name === 'Calls') {
              return (
                <Ionicons
                  name={'call'}
                  size={iconSize}
                  color={focused ? focusedIconColor : inActiveIconKAColor}
                />
              );
            } else if (route.name === 'Contacts') {
              return (
                // materialicon antdesign contacts
                <MaterialIcons
                  // sound antdesign
                  // notifi
                  name={'contacts'}
                  size={iconSize}
                  color={focused ? focusedIconColor : inActiveIconKAColor}
                />
              );
            } else if (route.name === 'Reels') {
              return (
                <FontAwesome5
                  name={'stream'}
                  size={iconSize}
                  color={focused ? focusedIconColor : inActiveIconKAColor}
                />
              );
            }
          },
        })}>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Calls" component={Calls} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Contacts" component={Contacts} />
      </Tab.Navigator>

    )
  }
<<<<<<< HEAD
  const DrawerScreens=()=>{
    return (
      <Drawer.Navigator 
      screenOptions={{
        headerShown:false
      }} initialRouteName="UserProfile">
          <Drawer.Screen name="UserProfile" component={UserProfile} />
          <Drawer.Screen name="AboutUs" component={AboutUs} />
      </Drawer.Navigator>
      
=======
  const Discussion = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }} initialRouteName="Chats">
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="UserChat" component={UserChat} />
      </Stack.Navigator>

>>>>>>> 684f34d871163ca04cd0b2dc0a56df899011c0cc
    );
  };

  return (
<<<<<<< HEAD
  <AppProvider>
    {/* <View style={{ flex: 1, backgroundColor: 'white' }}> */}

       {/* <AppHeader title={'ChatMe'} navigation={navigation} />  */}

      <NavigationContainer >
        <Stack.Navigator options={{headerShown:false}}> 
           {/* <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown:false}}/>
           <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown:false}}/> */}
          <Stack.Screen name='TabScreen' component={TabScreens} options={{headerShown:false}}/>
           <Stack.Screen name='DrawerScreens' component={UserProfile} options={{headerShown:false}}/> 
           {/* <Stack.Screen name='Discussion' component={Discussion} options={{headerShown:false}}/>  */}
          {/* <Stack.Screen name="Chats" component={Chats} />  */}
          <Stack.Screen name="UserChat" component={UserChat} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    {/* </View> */}
=======
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: 'white', }}>
        {/* <AppHeader title={'ChatMe'} navigation={navigation} />  */}

        <NavigationContainer>
          <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name='TabScreen' component={TabScreens} options={{ headerShown: false }} />
            <Stack.Screen name='Drawer' component={Drawer} options={{ headerShown: false }} />
            <Stack.Screen name='Discussion' component={Discussion} options={{ headerShown: false }} />
            <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
            <Stack.Screen name="UserChat" component={UserChat} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
>>>>>>> 684f34d871163ca04cd0b2dc0a56df899011c0cc
    </AppProvider>
  );
};


export default App;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});