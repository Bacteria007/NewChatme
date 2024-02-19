import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import AppContext from '../../../context/AppContext';
import { Menu, Divider, IconButton, TouchableRipple } from 'react-native-paper';
import ReactNativeModal from 'react-native-modal';
import { ThemeContext } from '../../../context/ThemeContext';
import GroupHeaderStyle from '../../../assets/styles/GroupScreenStyle/GroupHeaderStyle';
import HomeNeoCards from '../../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ChatHeaderNameSubString, CreateNameSubString, CreateSubString } from '../../../helpers/UiHelpers/CreateSubString';
import AutoScrollingName from '../../../helpers/UiHelpers/AutoScrollingName';

const GroupChatHeader = ({ item, navigation, callClearGroupChat }) => {

  const { baseUrl, currentUser } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const groupMembers = item.members
  const adminId = item.group_admin
  const [visible, setVisible] = React.useState(false);
  const showModal = () => { closeMenu(); setVisible(true); }
  const hideModal = () => setVisible(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [clearChatModal, setClearChatModal] = React.useState(false);
  const showClearChatModal = () => {
    setClearChatModal(true);
  };
  const hideClearChatModal = () => setClearChatModal(false);
  const clearChat = async () => {
    callClearGroupChat();
  };
  // sort
  const sortedGroupMembers = groupMembers.slice(); // Create a copy of the original array
  const adminIndex = sortedGroupMembers.findIndex(item => item._id === adminId);
  if (adminIndex !== -1) {
    // If the admin is found in the array, move their data to the beginning
    const adminData = sortedGroupMembers.splice(adminIndex, 1)[0];
    sortedGroupMembers.unshift(adminData);
  }
  return (
    <View style={[UserChatHeaderStyle.containerView(theme.backgroundColor)]}>
      <View style={[UserChatHeaderStyle.headerView]}>
        <View style={[UserChatHeaderStyle.leftview]}>
          <TouchableRipple
            onPress={() => {
              navigation.goBack();
            }} borderless
            style={UserChatHeaderStyle.headerTouchableBtn}
            rippleColor={theme.rippleColor}
          >
            <Icons.Ionicons
              name="arrow-back"
              size={wp('6.5%')}
              color={theme.profileNameColor}
            />

          </TouchableRipple>
            <TouchableOpacity onPress={()=>navigation.navigate("InnerScreens", { screen: "GroupProfile", params: { data: {_id:item._id,members:groupMembers,admin:adminId,group_dp:item.group_dp,group_name:item.group_name} } })}>
          <View style={[UserChatHeaderStyle.leftInnerView]}>
            {item.group_dp ?
              <Image source={{ uri: `${baseUrl}/${item.group_dp}` }} style={UserChatHeaderStyle.dpImageStyle} />
              :
                <View style={GroupHeaderStyle.dpCircle(theme.dpCircleColor)}>
                  <Icons.Ionicons name={'people'} size={wp('6')} color={theme.groupDpIconColor} />
                </View>
            }
            {item.group_name ? 

              <View style={[UserChatHeaderStyle.profileNameContainerStyle]}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle(theme.profileNameColor)]}>
                 {ChatHeaderNameSubString(item.group_name)}
                </Text>
              </View>
              :null
            }
          </View>
          </TouchableOpacity>

        </View>
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
            <Menu.Item titleStyle={UserChatHeaderStyle.menuTitleStyle}
              // leadingIcon={'delete'}
              onPress={() => { showClearChatModal() }} title="Clear Chat" />
            <Divider />
            <Menu.Item titleStyle={UserChatHeaderStyle.menuTitleStyle}

              // leadingIcon={'account-group'} 
              onPress={() => { showModal(); }} title="Show members" />
          </Menu>
        </View>
      </View>
      <ReactNativeModal
        isVisible={visible}
        backdropOpacity={0.1}
        onDismiss={hideModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        style={GroupHeaderStyle.modalStyle}>
        <View style={GroupHeaderStyle.modalMainView(AppColors.white)}>
          <View style={GroupHeaderStyle.modalItem}>
            {/* <Text style={[UserChatHeaderStyle.memberText]}>Memebers</Text> */}
            <FlatList
              showsVerticalScrollIndicator={true}
              // https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
              data={sortedGroupMembers}
              renderItem={({ item }) => {
                return <View style={{ padding: 4 }}>
                  <View style={GroupHeaderStyle.modalItemsContainer}>
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
                          style={GroupHeaderStyle.nameStyle}>
                          {currentUser.name === item.name ? "You" : item.name}
                        </Text>
                        {item._id == adminId && (
                          <View style={GroupHeaderStyle.adminBtn}>
                            <Text style={GroupHeaderStyle.adminText}>Admin</Text>
                          </View>
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
              onPress={() => { hideClearChatModal(); closeMenu() }}
            >
              <Text
                style={UserChatHeaderStyle.modalBtnText}>
                Cancel
              </Text>
            </TouchableRipple>
            <TouchableRipple borderless onPress={() => { clearChat().then(() => { hideClearChatModal(); closeMenu() }) }}
              style={UserChatHeaderStyle.modalBtn(AppColors.Lilac)}>
              <Text style={UserChatHeaderStyle.modalBtnText}>
                Ok
              </Text>
            </TouchableRipple>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default GroupChatHeader;
