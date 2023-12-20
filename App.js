import 'react-native-gesture-handler';
import React from 'react';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import UserChat from './src/screens/chats/singlePersonChat/UserChat';
import AfterSignUpProfileScreen from './src/screens/Auth/AfterSignUpProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeNumber from './src/screens/settings/security/ChangeNumber';
import ChangeNumberInfo from './src/screens/settings/security/ChangeNumberInfo';
import ChangePassword from './src/screens/settings/security/ChangePassword';
import BlockContacts from './src/screens/settings/security/BlockContacts';
import DeleteAccount from './src/screens/settings/AccountPreferences/DeleteAccount';
import MyActivity from './src/screens/settings/AccountPreferences/MyActivity';
import LogInScreen from './src/screens/Auth/LogInScreen';
import Notification from './src/screens/settings/Notification/Notification';
import ChatBot from './src/screens/chats/chatBot/ChatBot';
import LanguageChangeScreen from './src/components/LanguageChange/LanguageChangeScreen';
import { AppProvider } from './src/context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ForgetPasswordScreen from './src/screens/Auth/ForgetPasswordScreen';
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import CreateGroup from './src/screens/chats/groups/CreateGroup';
import GroupChat from './src/screens/chats/groups/GroupChat';
import AllRequest from './src/screens/requests/AllRequests';
import FakeSplash from './src/screens/fakeSplash/FakeSplash';
import { LogBox } from 'react-native';
import DrawerScreens from './src/screens/drawer/Drawer';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { enableScreens } from "react-native-screens";
import { Primary_StatusBar } from './src/components/statusbars/Primary_StatusBar';
enableScreens()


const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName='Splash' options={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={FakeSplash} options={{ headerShown: false }} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AfterSignUpProfileScreen" component={AfterSignUpProfileScreen}
      options={{ headerShown: false }} />
  </Stack.Navigator>
)
const SettingsStack = () => (
  <Stack.Navigator options={{ headerShown: false }}>
    <Stack.Screen name="activity" component={MyActivity} options={{ headerShown: false }} />
    <Stack.Screen name="appLanguage" component={LanguageChangeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="blocked" component={BlockContacts} options={{ headerShown: false }} />
    <Stack.Screen name="changeNumber" component={ChangeNumber} options={{ headerShown: false }} />
    <Stack.Screen name="changeNumberInfo" component={ChangeNumberInfo} options={{ headerShown: false }} />
    <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: false }} />
    <Stack.Screen name="deleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
    <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="notification" component={Notification} options={{ headerShown: false }} />
    <Stack.Screen name="Requests" component={AllRequest} options={{ headerShown: false }} />
  </Stack.Navigator>
)
const InnerScreens = () => (
  <Stack.Navigator options={{ headerShown: false }}>
    <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
    <Stack.Screen name="UserChat" component={UserChat} options={{ headerShown: false }} />
    <Stack.Screen name="GroupChat" component={GroupChat} options={{ headerShown: false }} />
    <Stack.Screen name="CreateGroup" component={CreateGroup} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const App = () => {

  return (
    <AppProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <Primary_StatusBar/>
        <NavigationContainer>
          <ZegoCallInvitationDialog />
          <Stack.Navigator options={{ headerShown: false }} initialRouteName='AuthStack'>
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerStack" component={DrawerScreens} options={{ headerShown: false }} />
            <Stack.Screen name="SettingStack" component={SettingsStack} options={{ headerShown: false }} />
            <Stack.Screen name="InnerScreens" component={InnerScreens} options={{ headerShown: false }} />
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

{/* <AppProvider>
<SafeAreaProvider style={{ flex: 1 }}>
  <NavigationContainer>
    <ZegoCallInvitationDialog />
    <Stack.Navigator options={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={FakeSplash} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerScreens" component={DrawerScreens} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserChat" component={UserChat} options={{ headerShown: false }} />
      <Stack.Screen name="activity" component={MyActivity} options={{ headerShown: false }} />
      <Stack.Screen name="GroupChat" component={GroupChat} options={{ headerShown: false }} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} options={{ headerShown: false }} />
      <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
      <Stack.Screen name="AfterSignUpProfileScreen" component={AfterSignUpProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="changeNumber" component={ChangeNumber} options={{ headerShown: false }} />
      <Stack.Screen name="changeNumberInfo" component={ChangeNumberInfo} options={{ headerShown: false }} />
      <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="blocked" component={BlockContacts} options={{ headerShown: false }} />
      <Stack.Screen name="deleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
      <Stack.Screen name="Requests" component={AllRequest} options={{ headerShown: false }} />
      <Stack.Screen name="appLanguage" component={LanguageChangeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="notification" component={Notification} options={{ headerShown: false }} />
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
</AppProvider> */}