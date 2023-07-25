import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState,useContext ,useEffect} from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';


const UserChatHeader = ({ item, navigation }) => {
  useEffect(() => {
    a();
  }, []);
  const a = () => {
    return ZegoUIKitPrebuiltCallService.init(
      1432799538, // You can get it from ZEGOCLOUD's console
      "d2d1b8a8f15ad602e020ba7e97236f8cd1030bdd3fa31ab1770c02aecc65bd14", // You can get it from ZEGOCLOUD's console
      item.userId,
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

  // const {item}=props.route.params;
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
                <Text style={[UserChatHeaderStyle.profileStatusStyle]}>
                  Online
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[UserChatHeaderStyle.rightView]}>
          {/* {videoCall ?
           (navigation.navigate('videoCal',{rtcCallbacks,connectionData})
          ) : ( */}
            {/* <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => {
                setVideoCall(true);
              }}>
              <Icons.FontAwesome5
                name="video"
                size={wp('6%')}
                color={AppColors.black}
              />
            </TouchableOpacity> */}
            <ZegoSendCallInvitationButton
        invitees={[
          {
            userID: item.recieverId,
            userName: 'user_64be835bbbf03ea2ef5a9d61',
          },
        ]}
        isVideoCall={true}
        resourceID={"incoming123"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
      />
          {/* )} */}
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('rejected', { item: item });
            }}
            style={{ alignSelf: 'center' }}>
            <Icons.FontAwesome
              name="phone"
              size={wp('7%')}
              color={AppColors.black}
              style={{ paddingLeft: wp('4%') }}
            />
          </TouchableOpacity> */}
           <ZegoSendCallInvitationButton
        invitees={[
          {
            userID: item.recieverId,
            userName: 'user_64be835bbbf03ea2ef5a9d61',
          },
        ]}
        isVideoCall={false}
        resourceID={"incoming123"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
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
