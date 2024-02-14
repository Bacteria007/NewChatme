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
import { Button, Menu, Divider, IconButton, TouchableRipple } from 'react-native-paper';
import ReactNativeModal from 'react-native-modal';
import { ThemeContext } from '../../../context/ThemeContext';
import FontStyle from '../../../assets/styles/FontStyle';
import { ChatHeaderNameSubString, CreateNameSubString, CreateSubString } from '../../../helpers/UiHelpers/CreateSubString';

const UserChatHeader = ({ item, navigation, clearFunc, blockFunc, unBlockFunc, isBlocked, iInitBlock }) => {
  const [callTime, setCallTime] = useState(0);
  const { baseUrl, currentUser } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const [blockModal, setBlockModal] = useState(false)
  const [unBlockModal, setUnBlockModal] = useState(false)
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
// console.log("header item-------------",item)
  const [clearChatModal, setClearChatModal] = useState(false);
  const showClearChatModal = () => {
    setClearChatModal(true);
  };
  const hideClearChatModal = () => setClearChatModal(false);
  const clearChat = async () => {
    clearFunc();
  };
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
  const showBlockModal = () => {
    setBlockModal(true)
  }
  const hideBlockModal = () => setBlockModal(false);
  const userBlocked = async () => {
    blockFunc()
  };
  const showUnBlockModal = () => {
    setUnBlockModal(true)
  }
  const hideUnBlockModal = () => setUnBlockModal(false);
  const userUnBlocked = async () => {
    unBlockFunc()
  };
  // #############################################################################
  const addCallDetailInBackend = async call => {


    // CAll Date
    const datestamp = new Date().toLocaleDateString([], {
      month: 'short',
      day: '2-digit',
    });

    const formData = new FormData();

    formData.append('userId', currentUser.userId);
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
  // #############################################################################
  return (
    <View style={[UserChatHeaderStyle.containerView(theme.chatScreenColor)]}>
      <View style={[UserChatHeaderStyle.headerView]}>
        <View style={[UserChatHeaderStyle.leftview]}>
          <TouchableRipple
            borderless
            onPress={() => {
              navigation.goBack();
            }}
            style={UserChatHeaderStyle.headerTouchableBtn}
          >
            <Icons.Ionicons
              name="arrow-back"
              size={wp('6.5%')}
              color={theme.profileNameColor}
            />
          </TouchableRipple>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate('InnerScreens', {
              screen: 'publicProfile',
              params: {data:item},
            });
          
          }}>
          <View style={[UserChatHeaderStyle.leftInnerView]}>
            <View style={[UserChatHeaderStyle.dpContainerView]}>
              {item?.profileImage ?
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
              <Text style={[UserChatHeaderStyle.profileNameTextStyle(theme.profileNameColor)]}>
                {item?.name ? ChatHeaderNameSubString(item?.name) : null}
              </Text>
              {/* <Text style={[UserChatHeaderStyle.profileStatusStyle]}>
                  Online
                </Text> */}
            </View>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableRipple borderless onPress={showModal}
            style={UserChatHeaderStyle.headerTouchableBtn}
          >
            <Icons.Ionicons
              name="call"
              size={wp('5%')}
              color={theme.profileNameColor}
            />
          </TouchableRipple>
          <View style={[UserChatHeaderStyle.rightView]}>
            <Menu
              visible={menuVisible}
              contentStyle={UserChatHeaderStyle.menuStyle}
              onDismiss={closeMenu}
              onBackButtonPress={closeMenu}
              anchorPosition='bottom'
              anchor={
                <IconButton
                  icon={'dots-vertical'}
                  size={wp('7%')}
                  iconColor={theme.profileNameColor}
                  onPress={openMenu}
                />}
            >
              <Menu.Item
                titleStyle={UserChatHeaderStyle.menuTitleStyle}
                onPress={() => { showClearChatModal(); closeMenu() }} title="Clear Chat" />
              <Divider />
              {console.log("is blocked", isBlocked)}
              {console.log("i init blocking", iInitBlock)}

              {isBlocked == true && iInitBlock == true ? <Menu.Item
                titleStyle={UserChatHeaderStyle.menuTitleStyle}
                onPress={() => { showUnBlockModal(); closeMenu() }} title="Unblock" /> : <Menu.Item
                titleStyle={UserChatHeaderStyle.menuTitleStyle}
                onPress={() => { showBlockModal(); closeMenu() }} title="Block" />}

            </Menu>
          </View>
        </View>

        <ReactNativeModal
          isVisible={visible}
          backdropOpacity={0.2}
          onDismiss={hideModal}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          coverScreen={true}
          style={{ margin: 0, justifyContent: 'flex-end', }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: AppColors.white, padding: hp('3'), borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 4 }}>
            <View style={{ paddingHorizontal: 30, flexDirection: 'row', backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Text style={[UserChatHeaderStyle.profileNameTextStyle(AppColors.black), { marginHorizontal: 10 }]}>Audio call</Text>
              <ZegoSendCallInvitationButton
                onPressed={() => {
                  hideModal();
                  addCallDetailInBackend('audio');
                }}
                invitees={[
                  {
                    userID: item?._id,
                    userName: item?.name,
                  },
                ]}
                isVideoCall={false}
                resourceID={'chatme_outcall'}
                
              />
            </View>
            <View style={{ paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[UserChatHeaderStyle.profileNameTextStyle(AppColors.black), { marginHorizontal: 10 }]}>Video call</Text>
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
                resourceID={'chatme_outcall'}
              />
            </View>
          </View>
        </ReactNativeModal>

        {/* clear chatModal */}
        <ReactNativeModal
          backdropOpacity={0.2}
          isVisible={clearChatModal}
          onDismiss={hideClearChatModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={UserChatHeaderStyle.modalMainContainer}>

            <Text style={UserChatHeaderStyle.modalTitleText}>
              Do you want to delete all messages ?
            </Text>
            <View style={UserChatHeaderStyle.modalBtnView}>
              <TouchableRipple borderless
                style={UserChatHeaderStyle.modalBtn(AppColors.lightGrey)}
                onPress={() => { hideClearChatModal() }}
              >
                <Text
                  style={UserChatHeaderStyle.modalBtnText}>
                  Cancel
                </Text>
              </TouchableRipple>
              <TouchableRipple borderless onPress={() => { clearChat().then(() => { hideClearChatModal(); setMenuVisible(false) }) }}
                style={UserChatHeaderStyle.modalBtn(AppColors.Lilac)}>
                <Text style={UserChatHeaderStyle.modalBtnText}>
                  Ok
                </Text>
              </TouchableRipple>
            </View>
          </View>
        </ReactNativeModal>
        {/* block contact */}
        <ReactNativeModal
          backdropOpacity={0.2}
          isVisible={blockModal}
          onDismiss={hideBlockModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={UserChatHeaderStyle.modalMainContainer}>

            <Text style={UserChatHeaderStyle.modalTitleText}>
              Do you want to block this contact?
            </Text>
            <View style={UserChatHeaderStyle.modalBtnView}>
              <TouchableRipple borderless
                style={UserChatHeaderStyle.modalBtn(AppColors.lightGrey)}
                onPress={() => { hideBlockModal() }}
              >
                <Text
                  style={UserChatHeaderStyle.modalBtnText}>
                  Cancel
                </Text>
              </TouchableRipple>
              <TouchableRipple borderless onPress={() => { userBlocked().then(() => { hideBlockModal(); setMenuVisible(false) }) }}
                style={UserChatHeaderStyle.modalBtn(AppColors.Lilac)}>
                <Text style={UserChatHeaderStyle.modalBtnText}>
                  Ok
                </Text>
              </TouchableRipple>
            </View>
          </View>
        </ReactNativeModal>
        {/* unBlock contact */}
        <ReactNativeModal
          backdropOpacity={0.2}
          isVisible={unBlockModal}
          onDismiss={hideUnBlockModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={UserChatHeaderStyle.modalMainContainer}>

            <Text style={UserChatHeaderStyle.modalTitleText}>
              Do you want to UnBlock this contact?
            </Text>
            <View style={UserChatHeaderStyle.modalBtnView}>
              <TouchableRipple borderless
                style={UserChatHeaderStyle.modalBtn(AppColors.lightGrey)}
                onPress={() => { hideUnBlockModal() }}
              >
                <Text
                  style={UserChatHeaderStyle.modalBtnText}>
                  Cancel
                </Text>
              </TouchableRipple>
              <TouchableRipple borderless onPress={() => { userUnBlocked().then(() => { hideUnBlockModal(); setMenuVisible(false) }) }}
                style={UserChatHeaderStyle.modalBtn(AppColors.Lilac)}>
                <Text style={UserChatHeaderStyle.modalBtnText}>
                  Ok
                </Text>
              </TouchableRipple>
            </View>
          </View>
        </ReactNativeModal>
      </View>
    </View>
  );
};

export default UserChatHeader;