import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

export const initializeZego = async (userID, userName) => {
  try {
    await ZegoUIKitPrebuiltCallService.init(
      1617716185, // You can get it from ZEGOCLOUD's console
      'ee65fec3b30e731f5f1c2e07b133ee4bc7fc7fbe6ab2a8297ecdbc9918632533',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        // Your Zego configuration options here
        ringtoneConfig: {
          incomingCallFileName: 'ring1.mp3',
          outgoingCallFileName: 'ring1.mp3',
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
