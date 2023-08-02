import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserChatHeader = ({ item, navigation }) => {
  const [callTime, setCallTime] = useState(0);
  const { baseUrl } = useContext(AppContext);

  const ZegoRoomMake = () => {
    return ZegoUIKitPrebuiltCallService.init(
      1432799538, // You can get it from ZEGOCLOUD's console
      'd2d1b8a8f15ad602e020ba7e97236f8cd1030bdd3fa31ab1770c02aecc65bd14', // You can get it from ZEGOCLOUD's console
      item.userId,
      'Ali',
      // item.name,
      [ZIM, ZPNs],
      {
        // ... (Other configurations)
        // onOutgoingCallDeclined:()=>{     // Agar user call ko cut krta hai

        // },
        // onOutgoingCallCancelButtonPressed:()=>{    // yni sender khud call ko cut krta hai

        // },
        // onOutgoingCallAccepted: ( ) => {   // Agar call accept krta receiver or dono mein baat hoti

        //   setSenderOrReceiver(true) ;

        // },

        // onIncomingCallReceived: () => {    // jis  ki trf sy call aa rahi uska naam

        // },

        // ... (Other event callbacks)

        ringtoneConfig: {
          incomingCallFileName: 'ring1.mp3',
          outgoingCallFileName: 'ring1.mp3',
        },
        requireConfig: data => {
          return {
            timingConfig: {
              enableTiming: true,
              onDurationUpdate: duration => {
                setCallTime(duration);
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
    );
  };
  ZegoRoomMake();

  const formatDuration = seconds => {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours} hr ${remainingMinutes} min ${remainingSeconds} sec`;
    } else if (remainingMinutes > 0) {
      return `${remainingMinutes} min ${remainingSeconds} sec`;
    } else {
      return `${remainingSeconds} sec`;
    }
  };
  //        #############################################################################
  const addCallDetailInBackend = async call => {
    const userid = await AsyncStorage.getItem('user');
    const parseId = JSON.parse(userid);

   

    // CAll Date
    const datestamp = new Date().toLocaleDateString([], {
      month: 'short',
      day: '2-digit',
    });

    const formData = new FormData();

    formData.append('userId', parseId);
    formData.append('callName', call);
    formData.append('callDate', datestamp);
    formData.append('recieverId', item.recieverId);
    formData.append('IncomingCall', 'incoming');
    formData.append('OutgoingCall', 'outgoing');
    // formData.append('callDuration', formatDuration(callTime));
    // const callDurationValue = callDuration <= 0 ? 'Not Answered' : formatDuration(callDuration);


    try {
      const response = await fetch(`${baseUrl}/addCalls`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });

      const data = await response.json(); // Parse the response body as JSON
      console.log('Call Data:', data);
    } catch (error) {
      console.error('Error adding callDetails:', error);
    }
  };

  //        #############################################################################
  return (
    <View style={[UserChatHeaderStyle.containerView]}>
      <View style={[UserChatHeaderStyle.headerView]}>
        <View style={[UserChatHeaderStyle.leftview]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icons.FontAwesome5
              name="arrow-left"
              size={wp('5.5%')}
              color={AppColors.black}
              style={{ marginTop: hp('2.7%') }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[UserChatHeaderStyle.leftInnerView]}>
              {/* <View style={[UserChatHeaderStyle.dpContainerView]}>
                <Image
                  source={item.dpImage}
                  style={[UserChatHeaderStyle.dpImageStyle]}
                />
              </View> */}
              <View style={[UserChatHeaderStyle.profileNameContainerStyle]}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle]}>
                  {item.name}
                  {/* {formatDuration(callTime)} */}
                </Text>
                <Text style={[UserChatHeaderStyle.profileStatusStyle]}>
                  Online
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[UserChatHeaderStyle.rightView]}>
          <ZegoSendCallInvitationButton
            onPressed={() => {
              addCallDetailInBackend('video');
            }}
            invitees={[
              {
                userID: item.recieverId,
                userName: item.name,
              },
            ]}
            isVideoCall={true}
            resourceID={'incoming123'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
          />

          <ZegoSendCallInvitationButton
            onPressed={() => {
              addCallDetailInBackend('audio');
            }}
            invitees={[
              {
                userID: item.recieverId,
                userName: item.name,
              },
            ]}
            isVideoCall={false}
            resourceID={'incoming123'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
          />

          <TouchableOpacity
            // onPress={toggleModal}
            style={{ alignSelf: 'center' }}>
            <Icons.Feather
              name="more-vertical"
              size={wp('7%')}
              color={AppColors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      backdropColor="white"
      backdropOpacity={0}
      animationIn="zoomIn"
      animationOut={'zoomOutDown'}>
      <View
        style={{
          height: hp('40%'),
          width: wp('54%'),
          padding: wp('5%'),
          backgroundColor: 'white',
          position: 'absolute',
          top: hp('-1.7%'),
          right: wp('-3%'),
        }}>
        <FlatList
          data={outerModal}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: wp('4%'),
                    lineHeight: hp('4.5%'),
                    color: 'black',
                    fontFamily: FontStyle.lightFont,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <Modal
          isVisible={isInnerModalVisible}
          onBackdropPress={() => {
            setInnerModalVisible(false);
          }}
          backdropColor="white"
          backdropOpacity={0}
          animationIn="zoomIn"
          animationOut={'zoomOutDown'}>
          <View
            style={{
              height: hp('22%'),
              width: wp('47%'),
              backgroundColor: 'white',
              position: 'absolute',
              top: hp('0%'),
              right: wp('-3%'),
            }}>
            <FlatList
              data={innerModal}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <Text>{item.text}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>

        <TouchableOpacity onPress={toggleModal}>
          <FontAwesome name="close" size={wp('4%')} />
        </TouchableOpacity>
      </View>
    </Modal> */}
    </View>
  );
};

export default UserChatHeader;
