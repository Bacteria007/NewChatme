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
const RenderComponent = ({ name, dp, callingScreen, discussions_item, groups_item, navigation, }) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const { baseUrl, currentUser, token, chatWithNewMsg, isNewMsg, setChatWithNewMsg } = useContext(AppContext);
  const [profileModal, setProfileModal] = useState(false);
  const [userLastMsg, setUserLastMsg] = useState(null);
  const [groupLastMsg, setGroupLastMsg] = useState(null);
  const chatid = discussions_item ? discussions_item._id : null;

  const maxLength = 43;
  const nameMaxLength = 23;
  const showProfileModal = () => {
    setProfileModal(true);
  };
  const hideProfileModal = () => {
    setProfileModal(false);
  };
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
  // const blockContact = async item => {
  //   // console.log("discussion ma ", currentUser.userId)
  //   // console.log("discussion ma ", item)

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/blockContact?userId=${currentUser.userId}&friendId=${item.contactData._id}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('blocked contact from db', data);
  //       // item.isFriend = false
  //       ToastAndroid.showWithGravity(
  //         'blocked successfully.',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     } else {
  //       console.log('Error blocking contact:', response.status);
  //       ToastAndroid.showWithGravity(
  //         'Cannot blocked',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error blocking contact: ', error);
  //   }
  // };
  // const deleteContact = async item => {
  //   // console.log("discussion ma ", currentUser.userId)
  //   // console.log("discussion ma ", item)

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/deleteContact?userId=${currentUser.userId}&_id=${item._id}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     if (response.ok) {
  //       const data = await response.json();

  //       const updatedContactList = contact.filter(contact => {
  //         if (contact._id === item._id) {
  //           // Agar msgList k msg ki Id or msgId equal hoo to screen pr na display krwao
  //           return false; // Remove the deleted message
  //         }
  //         return true; // Keep other messages
  //       });
  //       contactsSetList(updatedContactList);

  //       // item.isFriend = false
  //       ToastAndroid.showWithGravity(
  //         'deleted successfully.',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     } else {
  //       console.log('Error in deleting contact:', response.status);
  //       ToastAndroid.showWithGravity(
  //         'Cannot blocked',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error in deleting contact: ', error);
  //   }
  // };
  // const unblockContact = async item => {
  //   // console.log("discussion ma ", currentUser.userId)
  //   // console.log("discussion ma ", item)

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/unblockContact?userId=${currentUser.userId}&friendId=${item.contactData._id}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log("contact unblocked successfully", data);
  //       // item.isFriend = true
  //       ToastAndroid.showWithGravity(
  //         ' unblocked successfully.',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     } else {
  //       console.log('Error un blocking contact:', response.status);
  //       ToastAndroid.showWithGravity(
  //         'cannot unblocked',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error blocking contact: ', error);
  //   }
  // };
  // const handleLongPress = item => {
  //   // console.log("iiiiii", item)

  //   Alert.alert(
  //     `${item.isFriend ? 'Block User' : 'Unblock User'}`,
  //     `${item.contactData.name}`,
  //     [
  //       item.isFriend
  //         ? {
  //             text: 'Block',
  //             onPress: () => {
  //               blockContact(item);
  //             },
  //           }
  //         : {
  //             text: 'UnBlock',
  //             onPress: () => {
  //               unblockContact(item);
  //             },
  //           },
  //     ],
  //     { cancelable: true },
  //   );
  // };
  // const handleLongPressforDelete = item => {
  //   // console.log("iiiiii", item)
  //   Alert.alert(
  //     `${item.isFriend ? 'Delete User' : 'Unblock User'}`,
  //     item.isFriend ? 'Del this user?' : 'Unblock this user?',
  //     [
  //       item.isFriend
  //         ? {
  //             text: 'Delete',
  //             onPress: () => {
  //               deleteContact(item);
  //             },
  //           }
  //         : {
  //             text: 'Unblock',
  //             onPress: () => {
  //               unblockContact(item);
  //             },
  //           },
  //     ],
  //     { cancelable: true },
  //   );
  // };
  const getUserLastMessage = async () => {

    // console.log('req.query', discussions_item);
    if (!discussions_item || !discussions_item._id) {
      console.log('👤returning from getUserLastMessage')
      return; // Exit early if discussions_item is undefined or doesn't have an _id property
    }
    else {
      const res = await fetch(
        `${baseUrl}/userLatestMessage?chatId=${chatid}&userId=${currentUser.userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      console.log("🕊️🕊️🕊️🕊️🕊️🕊️🕊️🕊️")
      console.log(data.latestMsg)
      console.log("🕊️🕊️🕊️🕊️🕊️🕊️🕊️🕊️")
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } else {
        setUserLastMsg(data.latestMsg)
      }
    }
  };
  const getGroupLastMessage = async () => {
    if (!groups_item || !groups_item._id) {
      console.log('👥👥returning from getGroupLastMessage')
      return;
    }
    else {
      const res = await fetch(
        `${baseUrl}/groupLatestMessage?groupId=${groups_item._id}&userId=${currentUser.userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      // console.log('i(((((())))))))))m', data);
      if (data != null) {
        if (data.message == 'Please provide a valid token.') {
          Alert.alert('Provide a valid token.');
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required');
        } else {
          setGroupLastMsg(data);
        }
      } else {
        // console.log('++++++++++++ grp msg is empty');
        setGroupLastMsg(null);
      }
    }
  };
  useEffect(() => {
    getUserLastMessage();
    navigation.addListener('focus', () => {
      getUserLastMessage();
    });
  }, []);
  useEffect(() => {
    getGroupLastMessage();
    navigation.addListener('focus', () => {
      getGroupLastMessage();
    });
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        if (callingScreen === 'Discussions') {
          // if (discussions_item.isFriend) {
          // console.log("Comming form Discussions", discussions_item)
          // } else {
          //   ToastAndroid.showWithGravity(
          //     `${name} is blocked.`,
          //     ToastAndroid.SHORT,
          //     ToastAndroid.CENTER,
          //   );
          // }
          navigation.navigate('InnerScreens', {
            screen: 'UserChat',
            params: { contact: discussions_item },
          });
        } else if (callingScreen === 'Groups') {
          // console.log('Comming form Groups');
          navigation.navigate('InnerScreens', {
            screen: 'GroupChat',
            params: { item: groups_item },
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
                  ? userLastMsg && formatMessageDate(userLastMsg.createdAt)
                  : groupLastMsg && formatMessageDate(groupLastMsg.createdAt)}
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
                    userLastMsg !== null &&
                    (userLastMsg.content == 'ChatMe_Image' ? (
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
                    ) : CreateLastMsgSubString(userLastMsg.content)
                    )
                  ]
                  : [
                    groupLastMsg !== null &&
                    (groupLastMsg.msg_type == 'text' ? (
                      <Text numberOfLines={1} style={HomeNeoCards.lastMsg(theme.lastMsgColor)}>
                        <Text
                          numberOfLines={1}
                          style={HomeNeoCards.senderName}>
                          {groupLastMsg.sender_id == currentUser.userId ?
                            'You:  ' : (groupLastMsg.sender_name + ':  ')}

                        </Text>
                        {CreateLastMsgSubString(groupLastMsg.text)}

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
                            {groupLastMsg.sender_id == currentUser.userId
                              ? 'You:  ' : (groupLastMsg.sender_name + ':  ')}

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
                    color={theme.profileNameColor}
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
