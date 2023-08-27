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
import { UserChatStatusBar } from '../../statusbars/Primary_StatusBar';
import { Button, Divider, Menu, PaperProvider, shadow } from 'react-native-paper';
import ReactNativeModal from 'react-native-modal';
import { ThemeContext } from '../../../context/ThemeContext';

const UserChatHeader = ({ item, navigation }) => {
  const [callTime, setCallTime] = useState(0);
  const { baseUrl } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  console.log("io", item)
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
            <Icons.Ionicons
              name="arrow-back"
              size={wp('6.5%')}
              color={AppColors.black}
              style={{ marginTop: hp('2.7%') }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[UserChatHeaderStyle.leftInnerView]}>
              <View style={[UserChatHeaderStyle.dpContainerView]}>
                {item.profileImage ?
                  <Image
                    source={{ uri: `${baseUrl}${item.profileImage}` }}
                    style={[UserChatHeaderStyle.dpImageStyle]}
                  /> :
                  <Image
                    source={require('../../../assets/imges/default/userProfileDark.jpg')}
                    style={[UserChatHeaderStyle.dpImageStyle]}
                  />
                }
              </View>
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
          <TouchableOpacity onPress={showModal}>
            <Icons.Feather
              name="more-vertical"
              size={wp('7%')}
              color={AppColors.black}
            />
          </TouchableOpacity>
          <ReactNativeModal
            visible={visible}
            onDismiss={hideModal}
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            coverScreen={true}
            style={{ margin: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: theme.backgroundColor, padding: hp('3'), borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 4 }}>
              <View style={{ paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle, { marginHorizontal: 10 }]}>Audio call</Text>
                <ZegoSendCallInvitationButton
                  onPressed={() => {
                    hideModal();
                    addCallDetailInBackend('audio');
                  }}
                  invitees={[
                    {
                      userID: item._id,
                      userName: item.name,
                    },
                  ]}
                  isVideoCall={false}
                  resourceID={'incoming123'}
                />
              </View>
              <View style={{ paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle, { marginHorizontal: 10 }]}>Video call</Text>
                <ZegoSendCallInvitationButton
                  onPressed={() => {
                    hideModal();
                    addCallDetailInBackend('video');
                  }}
                  invitees={[
                    {
                      userID: item._id,
                      userName: item.name,
                    },
                  ]}
                  isVideoCall={true}
                  resourceID={'incoming123'}
                />
              </View>
            </View>
          </ReactNativeModal>
        </View>

      </View>
    </View>
  );
};

export default UserChatHeader;