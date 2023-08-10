import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
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
import AfterSignUpProfileScreen from './src/screens/auth/AfterSignUpProfileScreen';

import { Icons } from './src/assets/Icons'; // Navigation
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
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
import ChangeNumber from './src/screens/settings/security/ChangeNumber';
import ChangeNumberInfo from './src/screens/settings/security/ChangeNumberInfo';
import ChangePassword from './src/screens/settings/security/ChangePassword';
import BlockContacts from './src/screens/settings/security/BlockContacts';
import DeleteAccount from './src/screens/settings/accountPreferences/DeleteAccount';
import MyActivity from './src/screens/settings/accountPreferences/MyActivity';
import LogInScreen from './src/screens/auth/LogInScreen';
import Notification from './src/screens/settings/notification/Notification';
import ChatBot from './src/screens/chats/chatBot/ChatBot';
import LanguageChangeScreen from './src/components/LanguageChange/LanguageChangeScreen';
import TabIcons from './src/components/TabIcons';
import StreamOutlineWhite from './src/assets/imges/footerIcons/streamOutlineBlack.svg';
import StreamOutlineBlack from './src/assets/imges/footerIcons/streamOutlineWhite.svg';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from './src/context/ThemeContext';
import AppContext, { AppProvider } from './src/context/AppContext';
import Theme from './src/screens/settings/accountPreferences/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ForgetPasswordScreen from './src/screens/auth/ForgetPasswordScreen';
import { LogBox } from 'react-native';
import AddContact from './src/screens/contacts/AddContact';
import FontStyle from './src/assets/styles/FontStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = props => {
  const { darkThemeActivator, theme, storeLoggedinStatus } = useContext(
    ThemeContext,
    AppContext,
  );
  // const {updateCurrentUserId}=useContext(AppContext);
  const blank = '';
  // const loggedInUser=AsyncStorage.getItem('user')
  const logoutUser = async ({ navigation }) => {
    try {
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
  let iconSize = 20;
  const TabScreens = () => {
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
          initialRouteName="Chats"
          screenOptions={({ route, focused }) => ({
            headerShown: false,
            tabBarIndicatorStyle: { backgroundColor: 'transparent' },
            tabBarStyle: {
              height: hp('8%'),
              borderTopWidth: 0,
              borderTopColor: darkThemeActivator
                ? AppColors.darkTheme
                : AppColors.transparent,
              // flex: 0.12,
              justifyContent: 'flex-end',
              alignItems: 'center',
              // backgroundColor: AppColors.lightwhite,
              // backgroundColor:"rgba(255, 182, 193,0.7)", //pink
              // backgroundColor:"rgba (196,221,254,0.4)", //blue
              // elevation: 0,  // <-- this is the solution
              // position: 'absolute',
            },
            // tabBarItemStyle: { backgroundColor: AppColors.tab },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: wp('3.5%'),
              marginBottom: hp('1%'),
              marginTop: hp('0%'),
            },
            // tabBarLabelPosition:'beside-icon',
            // tabBarShowLabel:false,
            // tabBarLabel:({ focused }) => {
            //   return <Text style={{fontSize: hp('1.7%'), fontWeight: 'bold', color:focused? AppColors.black:AppColors.inActiveIconsColor,

            //   marginBottom: hp('1%')}}>{focused ? route.name : route.name}</Text>
            // },
            tabBarBackground: () => (
              <LinearGradient
                //---1
                // colors={["rgba(255, 182, 193,0.1)", "rgba(255, 182, 193,1)"]}  // pink only
                // start={{ x: 1, y: 0.0 }} end={{ x: 1, y: 1 }} // horizontal
                // locations={[0.1, 0.4]}
                //---2
                // colors={["rgba(196,221,254,0.2)", "rgba(196,221,254,0.9)"]} // blue
                // locations={[0.1, 0.4]}
                //---3
                // colors={["rgba(255, 255, 255,0.1)", "rgba(255, 255, 255,1)"]}  // white only
                start={{ x: 1, y: 0.0 }}
                end={{ x: 1, y: 1 }} // horizontal
                //  locations={[0.1, 0.3]}
                //---
                //--------
                // start={{ x: 0.5, y: 0.5 }} end={{ x: 0.2, y: 0.5 }} // for vertical colors
                // colors={["rgba(196,221,254,1)", "rgba(255, 182, 193,1)"]} //pink blue
                colors={[theme.linearPink, theme.linearBlue]} //pink blue
                // colors={[AppColors.linearGradient.blue, AppColors.linearGradient.pink]} //pink blue
                style={{ height: hp('9%') }}
              />
            ),
            tabBarActiveTintColor: theme.focusedTabIconsColor,
            tabBarInactiveTintColor: theme.notFocusedTabIconsColor,
            tabBarHideOnKeyboard: 'true',
            tabBarPressColor: 'rgba(255,255,255,0.6)',

            tabBarIcon: ({ focused }) => {
              if (route.name === 'Chats') {
                return (
                  <TabIcons
                    focused={focused}
                    size={19}
                    type={Icons.Ionicons}
                    name={
                      focused
                        ? 'ios-chatbubbles-sharp'
                        : 'ios-chatbubbles-outline'
                    }
                  />
                );
              } else if (route.name === 'Calls') {
                return (
                  <TabIcons
                    focused={focused}
                    size={19}
                    type={Icons.Ionicons}
                    name={focused ? 'call-sharp' : 'call-outline'}
                  />
                );
              } else if (route.name === 'Contacts') {
                return (
                  <TabIcons
                    focused={focused}
                    size={19}
                    type={Icons.MaterialCommunityIcons}
                    name={focused ? 'contacts' : 'contacts-outline'}
                  />
                );
              } else if (route.name === 'Reels') {
                return focused ? (
                  <TabIcons
                    type={Icons.FontAwesome5}
                    name="stream"
                    size={16}
                    focused={focused}
                  />
                ) : darkThemeActivator ? (
                  <StreamOutlineBlack />
                ) : (
                  <StreamOutlineWhite />
                );
              } else if (route.name === 'Groups') {
                return (
                  <TabIcons
                    focused={focused}
                    size={19}
                    type={Icons.Ionicons}
                    name={focused ? 'people-sharp' : 'people-outline'}
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
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            overlayColor: 'transparent',
            drawerType: 'slide',
            drawerActiveTintColor: AppColors.black,
            drawerInactiveTintColor: AppColors.black,
            drawerStyle: {
              width: wp('50%'),
              backgroundColor: theme.drawerColor,
            },
            drawerLabelStyle: { marginLeft: wp('-6%') },
            drawerActiveBackgroundColor: AppColors.white,
            sceneContainerStyle: {
              backgroundColor: theme.drawerColor,
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
      </View>
    );
  };
  console.log('darkthemeactivator', darkThemeActivator);
  return (
    <AppProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
          <ZegoCallInvitationDialog />
          <Stack.Navigator
            options={{ headerShown: false }}
            initialRouteName="DrawerScreens">
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
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activity"
              component={MyActivity}
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
            <Stack.Screen
              name="ChatBot"
              component={ChatBot}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AfterSignUpProfileScreen"
              component={AfterSignUpProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallWaitingScreen"
              component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallInCallScreen"
              component={ZegoUIKitPrebuiltCallInCallScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
};

export default App;
