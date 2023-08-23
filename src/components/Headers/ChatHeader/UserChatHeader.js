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
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserChatHeader = ({ item, navigation }) => {
  const [callTime, setCallTime] = useState(0);
  const { baseUrl } = useContext(AppContext);


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
    const userData = await AsyncStorage.getItem('user');

    const userParseData = JSON.parse(userData);
    const parseId = userParseData.userId;



    // CAll Date
    const datestamp = new Date().toLocaleDateString([], {
      month: 'short',
      day: '2-digit',
    });

    const formData = new FormData();

    formData.append('userId', parseId);
    formData.append('callName', call);
    formData.append('callDate', datestamp);
    formData.append('recieverId', item._id);
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
                </Text>
                {/* <Text style={[UserChatHeaderStyle.profileStatusStyle]}>
                  Online
                </Text> */}
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
                userID: item._id,
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
                userID: item._id,
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
    </View>
  );
};

export default UserChatHeader;
