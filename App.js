import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
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
import Icon, {Icons} from './src/assets/Icons'; // Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TermsAndConditions from './src/screens/TermsAndConditions';





const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {

  // const [scrollY, setScrollY] = useState(new Animated.Value(0));
  // const [visible, setVisible] = useState(true)
  // const handleScroll = Animated.event(
  //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  //   { useNativeDriver: true }
  // )
  // const togleTabVisibility = (value) => {
  //   setVisible(value)
  // }
  // useEffect(() => {
  //   scrollY.addListener(({ value }) => {
  //     if (value > 0) {
  //       togleTabVisibility(false)
  //     } else {
  //       togleTabVisibility(true)
  //     }
  //   });
  //   return () => {
  //     scrollY.removeAllListeners();
  //   }
  // }, [])



  let iconSize = 22;

  const TabScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIndicatorStyle: {height: hp('1%'), backgroundColor: 'white'},
          tabBarStyle: {
            backgroundColor: AppColors.white,
            height: hp('7%'),
            borderTopColor: 'transparent',
          },
          tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
          tabBarItemStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            color: AppColors.primary,
          },
          tabBarActiveTintColor: AppColors.primary,
          tabBarInactiveTintColor: AppColors.inActiveIconsColor,
          tabBarHideOnKeyboard: 'true',
          tabBarPressColor: 'rgba(255,255,255,0.7)',
          tabBarIcon: ({focused}) => {
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
    );
  };

  const DrawerScreens = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={TabScreens}
          options={{
            drawerType: 'slide',
            drawerIcon: ({focused}) => (
              <Icons.Ionicons
                name={focused ? 'ios-home' : 'ios-home-outline'}
                color={
                  focused ? AppColors.primary : AppColors.inActiveIconsColor
                }
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
                name={focused ? 'person' : 'person-outline'}
                color={
                  focused ? AppColors.primary : AppColors.inActiveIconsColor
                }
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
                  focused
                    ? 'ios-information-circle-sahrp'
                    : 'ios-information-circle-outline'
                }
                color={
                  focused ? AppColors.primary : AppColors.inActiveIconsColor
                }
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
                name={focused ? 'ios-settings-sharp' : 'ios-settings-outline'}
                color={
                  focused ? AppColors.primary : AppColors.inActiveIconsColor
                }
                size={iconSize}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={{
            drawerIcon: ({focused}) =>
              focused ? (
                <Icons.FontAwesome5
                  name="file-signature"
                  color={
                    focused ? AppColors.primary : AppColors.inActiveIconsColor
                  }
                  size={iconSize}
                />
              ) : (
                <Icons.MaterialCommunityIcons
                  name="file-sign"
                  color={
                    focused ? AppColors.primary : AppColors.inActiveIconsColor
                  }
                  size={iconSize}
                />
              ),
          }}
        />
      </Drawer.Navigator>


    );
  };

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          options={{headerShown: false}}
          initialRouteName="DrawerScreens">
          <Stack.Screen
            name="TabScreen"
            component={TabScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
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

    </AppProvider>
  );
};


export default App;

// const styles = StyleSheet.create({
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//     borderRadius: 16,
//   },
// });