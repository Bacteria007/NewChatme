import { useContext, useEffect, useState } from 'react';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../context/ThemeContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert, ToastAndroid, } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';
import ReactNativeModal from 'react-native-modal';
import AppContext from '../../context/AppContext';
import moment from 'moment';
import { CreateLastMsgSubString, CreateNameSubString } from '../../helpers/UiHelpers/CreateSubString';
import FontStyle from '../../assets/styles/FontStyle';

const RenderComponent = ({ name, dp, callingScreen, discussions_item, groups_item, navigation, messageList, setMessageList }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const { baseUrl, currentUser, token, } = useContext(AppContext);
  const [profileModal, setProfileModal] = useState(false);

  const showProfileModal = () => setProfileModal(true)
  const hideProfileModal = () => setProfileModal(false)

  // Time format
  const formatMessageDate = createdAt => {
    const messageDate = moment(createdAt);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    if (messageDate.isSame(today, 'd')) {
      return messageDate.format('h:mm A'); // Format time as hour:minutes AM/PM
    } else if (messageDate.isSame(yesterday, 'd')) {
      return 'Yesterday';
    } else {
      return messageDate.format('DD/MM/YYYY');
    }
  };
  const updateUserMessagesIsRead = async (chatId) => {
    try {
      const response = await fetch(`${baseUrl}/updateUserMessagesIsRead?chatId=${chatId}&userId=${currentUser.userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        console.log('Messages updated in the backend.');
      } else {
        console.error('Failed to update messages in the backend.');
      }
    } catch (error) {
      console.error('Error updating messages in the backend:', error);
    }
  };
  const updateGroupMessagesIsRead = async (groupId) => {
    try {
      const response = await fetch(`${baseUrl}/updateGroupMessagesIsRead?groupId=${groupId}&userId=${currentUser.userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        console.log('Messages updated in the backend.');
      } else {
        console.error('Failed to update messages in the backend.');
      }
    } catch (error) {
      console.error('Error updating messages in the backend:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (callingScreen === 'Discussions') {
          updateUserMessagesIsRead(discussions_item._id)
          console.log('gdgd', messageList)
          navigation.navigate('InnerScreens', {
            screen: 'UserChat',
            params: { contact: discussions_item, allMsgs: discussions_item.allMessages ? discussions_item.allMessages : null },
          });
        } else if (callingScreen === 'Groups') {
          updateGroupMessagesIsRead(groups_item._id)
          navigation.navigate('InnerScreens', {
            screen: 'GroupChat',
            params: { item: groups_item, allGroupMsgs: groups_item.allMessages ? groups_item.allMessages : null, },
          });
        }
      }}
    // onLongPress={() => {
    //   if (callingScreen === 'Discussions') {
    //     // handleLongPress(discussions_item)
    //     handleLongPressforDelete(discussions_item);
    //   }
    // }}
    >
      <View style={HomeNeoCards.flatlistItemContainer}>
        <Neomorph
          darkShadowColor={AppColors.primary} // <- set this
          lightShadowColor={AppColors.white} // <- this
          swapShadows
          style={HomeNeoCards.neomorphStyle(theme.homeCardColor)}>
          <TouchableOpacity
            onPress={() => {
              showProfileModal();
              // console.log("dp", dp)
            }}>
            {dp == null ? (
              <View style={HomeNeoCards.dpVew}>
                <View style={HomeNeoCards.iconView(theme.dpCircleColor)}>
                  {callingScreen === 'Discussions' ? (
                    <Icons.MaterialIcons
                      name={'person'}
                      size={29}
                      color={theme.groupDpIconColor}
                    />
                  ) : (
                    <Icons.Ionicons
                      name={'people'}
                      size={23}
                      color={theme.groupDpIconColor}
                    />
                  )}
                </View>
              </View>
            ) : (
              <Image
                source={{ uri: `${baseUrl}/${dp}` }}
                style={HomeNeoCards.dpImage}
              />
            )}
          </TouchableOpacity>

          {/* profile name view */}
          <View style={HomeNeoCards.nameAndMsgContainer}>
            <View style={HomeNeoCards.nameAndTimeContainer}>
              <Text style={HomeNeoCards.profileName(theme.profileNameColor)}>
                {name && CreateNameSubString(name)}
              </Text>
              <Text style={HomeNeoCards.lastMsgTime(darkThemeActivator)}>
                {callingScreen !== 'Groups'
                  ? discussions_item.latestMessage && formatMessageDate(discussions_item.latestMessage.createdAt)
                  : groups_item.latestMessage && formatMessageDate(groups_item.latestMessage.createdAt)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                {callingScreen !== 'Groups'
                  ? [
                    discussions_item.latestMessage &&
                    (discussions_item.latestMessage.content == 'ChatMe_Image' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icons.FontAwesome
                          name="image"
                          size={wp('3.7')}
                          color={AppColors.gray}
                        />

                        <Text
                          style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                          {' '}
                          image
                        </Text>
                      </View>
                    ) : CreateLastMsgSubString(discussions_item.latestMessage.content)
                    )
                  ]
                  : [
                    groups_item.latestMessage !== null &&
                    (groups_item.latestMessage.msg_type == 'text' ? (
                      <Text numberOfLines={1} style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                        <Text
                          numberOfLines={1}
                          style={HomeNeoCards.senderName}>
                          {groups_item.latestMessage.sender_id == currentUser.userId ?
                            'You:  ' : (groups_item.latestMessage.sender_name + ':  ')}

                        </Text>
                        {CreateLastMsgSubString(groups_item.latestMessage.text)}

                      </Text>
                    ) :
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                          <Text
                            numberOfLines={1}
                            style={HomeNeoCards.senderName}>
                            {groups_item.latestMessage.sender_id == currentUser.userId
                              ? 'You:  ' : (groups_item.latestMessage.sender_name + ':  ')}

                          </Text>
                          <Icons.FontAwesome
                            name="image"
                            size={wp('3.7')}
                            color={AppColors.gray}
                          />

                          <Text
                            style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                            {' '}
                            image
                          </Text>
                        </Text>
                      </View>
                    ),
                  ]}
              </Text>
              {(callingScreen == "Discussions" && (discussions_item.unReadMeassagesCount !== 0) &&
                (<View style={{ height: hp(2.5), width: hp(2.5), backgroundColor: AppColors.Mauve, borderRadius: hp(2.5), justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: hp('1.2'), fontFamily: FontStyle.regularFont, textAlign: 'center' }}>
                    {discussions_item.unReadMeassagesCount}
                  </Text>
                </View>
                )
              )}
              {(callingScreen == "Groups" && (groups_item.unReadMeassagesCount !== 0) &&
                <View style={{ height: hp(2.5), width: hp(2.5), backgroundColor: AppColors.Mauve, borderRadius: hp(2.5), justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: hp('1.2'), fontFamily: FontStyle.regularFont, textAlign: 'center' }}>
                    {groups_item.unReadMeassagesCount}
                  </Text>
                </View>

              )}
            </View>
          </View>
        </Neomorph>
      </View>
      <ReactNativeModal
        visible={profileModal}
        coverScreen={true}
        style={HomeNeoCards.modalContainer}
        animationIn="slideInUp"
        animationOut="slideInDown"
        onDismiss={hideProfileModal}
        onBackdropPress={hideProfileModal}
        onBackButtonPress={hideProfileModal}>
        <View style={HomeNeoCards.modalView}>
          <View style={HomeNeoCards.dpHeader}>
            <Text style={HomeNeoCards.profileName(AppColors.black)}>
              {name
                ? CreateNameSubString(name)
                : null}
            </Text>
          </View>
          {dp == null ? (
            <View>
              {callingScreen === 'Discussions' ? (
                <Image
                  source={require('../../assets/imges/default/userProfileDark.jpg')}
                  style={HomeNeoCards.dpInModal}
                />
              ) : (
                <View
                  style={[
                    HomeNeoCards.modalView,
                    { height: hp('30'), width: wp('70') },
                  ]}>
                  <Icons.Ionicons
                    name={'people'}
                    size={150}
                    color={AppColors.black}
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: `${baseUrl}/${dp}` }}
                style={HomeNeoCards.dpInModal}
              />
            </View>
          )}
        </View>
      </ReactNativeModal>
    </TouchableOpacity>
  );
};

export default RenderComponent;
