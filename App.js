import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import {
  Image,
  View,
  Text,
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
import Calls from './src/screens/calls/Calls';
import AppColors from './src/assets/colors/Appcolors';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import UserProfile from './src/screens/profile/UserProfile';
import AboutUs from './src/screens/about/AboutUs';
import Groups from './src/screens/chats/groups/AllGroups';
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import Discussions from './src/screens/chats/discussions/Discussions';
import UserChat from './src/screens/chats/singlePersonChat/UserChat';
import AfterSignUpProfileScreen from './src/screens/auth/AfterSignUpProfileScreen';

import { Icons } from './src/assets/Icons'; // Navigation
import {
  NavigationContainer,
 
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
import StreamOutlineWhite from './src/assets/imges/footerIcons/streamOutlineBlack.svg';
import StreamOutlineBlack from './src/assets/imges/footerIcons/streamOutlineWhite.svg';
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
import CreateGroup from './src/screens/chats/groups/CreateGroup';
import Apis from './src/utils/Apis';
import GroupChat from './src/screens/chats/groups/group_chat/GroupChat';
import Settings2 from './src/screens/settings/Settings2';
import { UserProvider, useUserContext } from './src/context/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = props => {
  const { darkThemeActivator, theme, isUserLoggedin } =
    useContext(ThemeContext);
  let iconSize = 18;
  //Tab Variables Start
  const reelsIconSize = 19;
  const focusedColor = theme.focusedTabIconsColor;
  const notfocusedColor = theme.notFocusedTabIconsColor;
  const tabColor = theme.tabColor;
  const tabFontBold = FontStyle.boldFont;
  const tabFontSemiBold = FontStyle.semiBoldFont;
  //Tab Variables End
  //Drawer Variables Start
  const myFontFamily = FontStyle.regularFont;
  const drawerBackgroungColor = theme.drawerColor;
  const activeTintColor = AppColors.white;
  const inActiveTintColor = AppColors.black;
  const activeBgColor = 'rgba(0,0,0,0.2)';
  const inActiveBgColor = AppColors.transparent;
  //Drawer Variables End

  // const {  curentUser } = useContext(AppContext);
  // const userid=async (()=>{

  // })
  const loggedInUserId = AsyncStorage.getItem('user');
  // const {updateCurrentUserId}=useContext(AppContext);
  const blank = '';
  // const loggedInUser=AsyncStorage.getItem('user')
  const logoutUser = async ({ navigation }) => {
    try {
      // console.log('isUserLoggedin ', isUserLoggedin);
      await AsyncStorage.removeItem('user');
      console.log('logout')
      // storeLoggedinStatus(false)
      // console.log('User removed from storage');
      // updateCurrentUserId(''); // Clear the storedUser in the context
      navigation.replace('LogInScreen');
    } catch (error) {
      // console.log('Error while removing user from storage:', error);
      Alert.alert('You are unable to logout, try again later!');
      // updateCurrentUserId(blank); // Clear the storedUser in the context
      // navigation.navigate('LogInScreen'); // Navigate even if there's an error (you may handle it differently as per your app's logic)
    }
  };

  const TabScreens = () => {
    // Animated
    let progress = useDrawerProgress();
    // console.log('progress', progress);
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

  const DrawerScreens = () => {
    return (
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            overlayColor: 'transparent',
            drawerType: 'slide',
            drawerActiveTintColor: activeTintColor,
            drawerInactiveTintColor: inActiveTintColor,
            drawerStyle: {
              width: wp('50%'),
              backgroundColor: drawerBackgroungColor,
            },
            drawerLabelStyle: { marginLeft: wp('-6%') },
            drawerActiveBackgroundColor: activeBgColor,
            sceneContainerStyle: {
              backgroundColor: drawerBackgroungColor,
            },
            // drawerHideStatusBarOnOpen: true,
            // swipeEnabled:false,  //--->> for drawerHideStatusBarOnOpen
          }}
          // backBehavior='history'
          initialRouteName="Home"
          drawerContent={props => {
            // const { userData } = useUserContext();
            // const parsedUser = JSON.parse(userData._j);
            const { baseUrl ,storedUser} = useContext(AppContext);
            console.log('baseurl', baseUrl);
            console.log('appcontext appjs',storedUser );
            return (
              <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                  <Animated.View
                    style={[Containers.centerContainer, { height: hp('25%') }]}>
                    <Image
                      source={{
                        uri: `${baseUrl}${storedUser?.profileImage} `,
                      }}
                      style={{
                        height: wp('25%'),
                        width: wp('25%'),
                        borderRadius: wp('100%'),
                      }}
                    />
                    <Text
                      style={{ fontSize: hp('3%'), color: AppColors.black }}>
                      {storedUser?.name}
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
                  color={focused?activeTintColor:inActiveTintColor}
                  name={focused ? 'home' : 'ios-home-outline'}
                  size={iconSize}
                />
              
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
                  color={focused?activeTintColor:inActiveTintColor}
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
                  color={focused?activeTintColor:inActiveTintColor}
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
                  color={focused?activeTintColor:inActiveTintColor}
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
                <Icons.FontAwesome5
                  name="file-signature"
                  color={focused?activeTintColor:inActiveTintColor}
                  size={iconSize}
                />
    )}}
          />
        </Drawer.Navigator>
      </View>
    );
  };
  // console.log('user id App.js-----------------', loggedInUserId);
  return (
    <AppProvider>
      {/* <UserProvider> */}
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
          <ZegoCallInvitationDialog />
          <Stack.Navigator
            options={{ headerShown: false }}
            // initialRouteName={
            //   loggedInUserId ? 'DrawerScreens' : 'DrawerScreens'
            // }
            initialRouteName='WelcomeScreen'
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
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserChat"
              component={UserChat}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activity"
              component={MyActivity}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GroupChat"
              component={GroupChat}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateGroup"
              component={CreateGroup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Utils"
              component={Apis}
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
              name="mainScreen"
              component={Settings2}
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
            {/* <Stack.Screen
              name="activity"
              component={MyActivity}
              options={{ headerShown: false }}
            /> */}
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
      {/* </UserProvider> */}
    </AppProvider>
  );
};

export default App;
