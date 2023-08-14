/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ThemeProvider } from './src/context/ThemeContext';
import PushNotification from "react-native-push-notification";


// Add these lines \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);
PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === 'ios'
})
const Root = () => (
    <ThemeProvider>
      <App />
      </ThemeProvider>
  );
  
  AppRegistry.registerComponent(appName, () => Root);
