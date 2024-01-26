import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

export const initializeZego = async (userID, userName) => {
  try {
    await ZegoUIKitPrebuiltCallService.init(
      1657455243, // You can get it from ZEGOCLOUD's console
      '9b10813a0aa13fe9876c71c54fe1aa03242ee9f0ed15bc483310aab7f3b267c0',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        // Your Zego configuration options here
        ringtoneConfig: {
          incomingCallFileName: 'ring1.mp3',
          outgoingCallFileName: 'outgoing.mp3',
        },
        requireConfig: data => {
          return {
            timingConfig: {
              enableTiming: true,
              onDurationUpdate: duration => {
                // setCallTime(duration);
              },
            },
          };
        },

        notifyWhenAppRunningInBackgroundOrQuit: true,
        isIOSSandboxEnvironment: true,
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    )
      .then(() => {
        console.log('Zego initialized successfully');
      })
      .catch(error => {
        console.error('Zego initialization error:', error);
      });
  } catch (error) {
    console.error('Zego initialization error:', error);
  }
};
export const uninitZegoFunc= async () => {
  return ZegoUIKitPrebuiltCallService.uninit()
}