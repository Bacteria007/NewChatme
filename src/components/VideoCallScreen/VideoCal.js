
// import React, { Component, useContext, useEffect, useState } from 'react';
// import ZegoUIKitPrebuiltCallService, {ZegoUIKitPrebuiltCall , ONE_ON_ONE_VIDEO_CALL_CONFIG, ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import * as ZIM from 'zego-zim-react-native';
// import * as ZPNs from 'zego-zpns-react-native';
// import AppContext from '../../context/AppContext';
// import { View } from 'react-native';



// export default function VoiceCallPage(props) {

//   const {CurrentUserId} = useContext(AppContext)
//   useEffect(()=>{

// a()
//   },[])
//  const a = ()=>{
//   return ZegoUIKitPrebuiltCallService.init(
//     1432799538, // You can get it from ZEGOCLOUD's console
//     "d2d1b8a8f15ad602e020ba7e97236f8cd1030bdd3fa31ab1770c02aecc65bd14", // You can get it from ZEGOCLOUD's console
//     '64be8377bbf03ea2ef5a9d64',
//       'Ali',
//       [ZIM, ZPNs],
//       {
//           ringtoneConfig: {
//               incomingCallFileName: 'my_file_name.mp3',
//               outgoingCallFileName: 'zego_outgoing.mp3',
//           },
//           notifyWhenAppRunningInBackgroundOrQuit: true,
//           isIOSSandboxEnvironment: true,
//           androidNotificationConfig: {
//               channelID: "ZegoUIKit",
//               channelName: "ZegoUIKit",
//           },
//       },
//   )}
//   return (
//       <View style={{flex:1}}>
//           {/* <ZegoUIKitPrebuiltCall
//               appID={1432799538}
//               appSign={"d2d1b8a8f15ad602e020ba7e97236f8cd1030bdd3fa31ab1770c02aecc65bd14"}
//               userID={'64be8377bbf03ea2ef5a9d64'} // userID can be something like a phone number or the user id on your own user system. 
//               userName={'Ali'}
//               callID={'test'} // callID can be any unique string. 

//               config={{
//                   // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
//                   ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//                   onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
//                   onHangUp: () => { props.navigation.goback() },
//               }}
//           /> */}
//           <ZegoSendCallInvitationButton
//     invitees ={ [{userID '64be835bbbf03ea2ef5a9d61', userName: 'user_' + '64be835bbbf03ea2ef5a9d61'} ]}
    
//     isVideoCall={true}
//     resourceID={"incoming123"}// Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
// />
//       </View>
//   );
// }


import React, { useContext, useEffect } from 'react';
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import AppContext from '../../context/AppContext';
import { View } from 'react-native';

export default function VoiceCallPage(props) {
  const {itm} = props.route.params;
 

  useEffect(() => {
    a();
  }, []);

  const a = () => {
    return ZegoUIKitPrebuiltCallService.init(
      1432799538, // You can get it from ZEGOCLOUD's console
      "d2d1b8a8f15ad602e020ba7e97236f8cd1030bdd3fa31ab1770c02aecc65bd14", // You can get it from ZEGOCLOUD's console
      itm.userId,
      'Ali',
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'my_file_name.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        isIOSSandboxEnvironment: true,
        androidNotificationConfig: {
          channelID: "ZegoUIKit",
          channelName: "ZegoUIKit",
        },
      },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ZegoSendCallInvitationButton
        invitees={[
          {
            userID: itm.recieverId,
            userName: 'user_64be835bbbf03ea2ef5a9d61',
          },
        ]}
        isVideoCall={true}
        resourceID={"incoming123"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
      />
    </View>
  );
}
