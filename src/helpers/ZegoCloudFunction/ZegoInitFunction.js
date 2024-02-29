import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

export const initializeZego = async (userID, userName) => {
  try {
  return  await ZegoUIKitPrebuiltCallService.init(
      1528834225, // You can get it from ZEGOCLOUD's console
      '1445bd3d3b42e9c47556a7033501dde57aeb4de1aa2a272424511f78c72b85bb',
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
  console.log('inside unint zego');
  return ZegoUIKitPrebuiltCallService.uninit()
}