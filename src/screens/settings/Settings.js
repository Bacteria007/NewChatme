import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import Modal from 'react-native-modal';
import AppColors from '../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/Icons';
import SettingScreenStyle from '../../assets/styles/SettingScreenStyle';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';

const Settings = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const iconName = 'arrow-right';
  const iconSize = wp('5.5%');
  const iconColor = AppColors.black;
  return (
    <DrawerScreenswrapper>
      <View style={[SettingScreenStyle.containerView]}>
        <InnerScreensHeader navigation={navigation} screenName="Settings" />
        <View style={[SettingScreenStyle.containerView2]}>
          <View style={[SettingScreenStyle.sectionView]}>
            <Text style={[SettingScreenStyle.sectionHeadText]}>Security</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('blocked');
              }}>
              <View style={[SettingScreenStyle.touchableView]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  Block Contact
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('changePassword');
              }}>
              <View style={[SettingScreenStyle.touchableView]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  Change Password
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('changeNumberInfo');
              }}>
              <View
                style={[
                  SettingScreenStyle.touchableView,
                  {
                    borderBottomWidth: wp('0%'),
                  },
                ]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  Change Number
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[SettingScreenStyle.sectionView]}>
            <Text style={[SettingScreenStyle.sectionHeadText]}>
              Account preferences
            </Text>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}>
              <View style={[SettingScreenStyle.touchableView]}>
                <Text style={[SettingScreenStyle.touchableText]}>Theme</Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                  setIsModalVisible(false);
                }}
                style={{}}
                backdropColor={AppColors.black}
                backdropOpacity={0.6}
                coverScreen={true}
                animationIn="zoomIn"
                animationOut={'zoomOutDown'}>
                <View style={[SettingScreenStyle.modalView]}>
                  <Text style={[SettingScreenStyle.modalHeadText]}>
                    Choose Theme
                  </Text>
                  <Text style={[SettingScreenStyle.modalText]}>
                    Default (Light)
                  </Text>
                  <Text style={[SettingScreenStyle.modalText]}>Light</Text>
                  <Text style={[SettingScreenStyle.modalText]}>Dark</Text>
                </View>
              </Modal>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('activity');
              }}>
              <View style={[SettingScreenStyle.touchableView]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  My Activity
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('deleteAccount');
              }}>
              <View
                style={[
                  SettingScreenStyle.touchableView,
                  {
                    borderBottomWidth: wp('0%'),
                  },
                ]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  Delete Account
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[SettingScreenStyle.sectionView]}>
            <Text style={[SettingScreenStyle.sectionHeadText]}>
              App Language
            </Text>
            <TouchableOpacity>
              <View
                style={[
                  SettingScreenStyle.touchableView,
                  {
                    borderBottomWidth: wp('0%'),
                  },
                ]}>
                <Text style={[SettingScreenStyle.touchableText]}>English</Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[SettingScreenStyle.sectionView]}>
            <Text style={[SettingScreenStyle.sectionHeadText]}>
              Notifications
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('notification');
              }}>
              <View
                style={[
                  SettingScreenStyle.touchableView,
                  {
                    borderBottomWidth: wp('0%'),
                  },
                ]}>
                <Text style={[SettingScreenStyle.touchableText]}>
                  Notifications
                </Text>
                <Icons.FontAwesome5
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerScreenswrapper>
  );
};

export default Settings;
