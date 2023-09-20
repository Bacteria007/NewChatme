import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
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
import FontStyle from '../../../assets/styles/FontStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import GroupHeaderStyle from '../../../assets/styles/GroupScreenStyle/GroupHeaderStyle';

const GroupChatHeader = ({ item, navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const groupMembers = item.members
  const adminId = item.group_admin
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // sort
  const sortedGroupMembers = groupMembers.slice(); // Create a copy of the original array
  const adminIndex = sortedGroupMembers.findIndex(item => item._id === adminId);
  if (adminIndex !== -1) {
    // If the admin is found in the array, move their data to the beginning
    const adminData = sortedGroupMembers.splice(adminIndex, 1)[0];
    sortedGroupMembers.unshift(adminData);
  }
  // console.log("io", item)

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
              {/* <View style={[UserChatHeaderStyle.dpContainerView]}>
                {item.profileImage ?
                  <Image
                    source={{ uri: `${baseUrl}${item.profileImage}` }}
                    style={[UserChatHeaderStyle.dpImageStyle]}
                  /> :
                  <Image
                    source={require('../../../assets/imges/default/group.png')}
                    style={[UserChatHeaderStyle.dpImageStyle]}
                  />
                }
              </View> */}
              <View style={[UserChatHeaderStyle.profileNameContainerStyle]}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle]}>
                  {item.group_name}
                </Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[UserChatHeaderStyle.rightView]}>
          <TouchableOpacity onPress={showModal}>
            {/* <Text style={GroupHeaderStyle.adminText}>Members</Text> */}
            <Icons.MaterialIcons
              name="people"
              size={wp('7%')}
              color={AppColors.black}
            />
          </TouchableOpacity>
          <ReactNativeModal
            visible={visible}
            onDismiss={hideModal}
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            style={GroupHeaderStyle.modalStyle}>
            <View style={GroupHeaderStyle.modalMainView(theme.backgroundColor)}>
              <View style={GroupHeaderStyle.modalItem}>

                <FlatList
                  indicatorStyle="black"
                  data={sortedGroupMembers}
                  renderItem={({ item }) => {
                    return <View style={{ padding: 4 }}>
                      <View style={GroupHeaderStyle.modalItemsContainer}>
                        {/* <View style={[UserChatHeaderStyle.dpContainerView]}>         */}
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
                        {/* name and phoneNo view */}
                        <View style={GroupHeaderStyle.nameAndPhone}>
                          <View style={GroupHeaderStyle.nameView}>
                            <Text
                              style={GroupHeaderStyle.nameStyle(currentUser.name === item.name || item._id == adminId, item._id == adminId)}>
                              {currentUser.name === item.name ? "You" : item.name}
                            </Text>
                            {item._id == adminId && (
                              <View style={GroupHeaderStyle.adminBtn}>
                                <Text style={GroupHeaderStyle.adminText}>Admin</Text>
                              </View>
                              // <Icons.MaterialCommunityIcons name='shield-crown' color={AppColors.primary} size={17} />
                            )}
                          </View>
                          <Text style={GroupHeaderStyle.phoneText}>
                            {item.phoneNo}
                          </Text>
                        </View>
                      </View>
                      <Divider style={{ margin: 8 }} />
                    </View>
                  }}
                />
              </View>
            </View>
          </ReactNativeModal>
        </View>

      </View>
    </View>
  );
};

export default GroupChatHeader;
