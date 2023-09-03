import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar'
import AppColors from '../../assets/colors/Appcolors';
import Icon, { Icons } from '../../assets/Icons.js';
import SelectInfo from './SelectInfo';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Avatar, Divider } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestCameraAndAudioPermission } from '../../components/Permission/Permission';
import AppContext from '../../context/AppContext';
import AfterSignUpStyleSheet from '../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';

const UserProfile = props => {
  const { language, baseUrl, storedUser, storeUserName, getStoredUserDetails, userName, selectedImageUri, storeImageUri } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const arrow_icon = 'chevron-right';
  const iconSize = wp('9%');
  const arrowColor = AppColors.black;
  const arrowSize = 17;
  const textColor = theme.profileNameColor;
  useEffect(() => {
    let userid = storedUser.userId;
    let userName = storedUser.name;
    storeUserName(userName);
    fetch(`${baseUrl}/getProfileImage?logegedId=${userid}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('res aya', data);
        storeImageUri(data);
      })
      .catch(error => console.log('res error', error));
  }, []);

  return (
    <DrawerScreenswrapper>
      <View style={[ProfileScreenStyleSheet.container]}>
        <Primary_StatusBar />
        <InnerScreensHeader
          screenName={'Profile'}
          navigation={props.navigation}
        />
        {/* main view for profile img */}
        <View style={[ProfileScreenStyleSheet.innerContainer]}>
          <ImageBackground
            source={{ uri: `${baseUrl}${selectedImageUri}` }}
            //  source={require('../../assets/imges/default/6.jpg')}

            imageStyle={[ProfileScreenStyleSheet.bgImageStyle]}
          />
        </View>
        <View
          style={[
            AfterSignUpStyleSheet.ImageContainer,
            { height: hp('40%'), marginTop: hp('-17') },
          ]}>
          <View>
            <View style={{ position: 'relative' }}>
              {selectedImageUri == '' ? (
                <Neomorph inner style={[ProfileScreenStyleSheet.NeoMorphStyle]}>
                  <Neomorph style={[ProfileScreenStyleSheet.NeoMorphStyle2]}>
                    <Icons.MaterialIcons
                      name="person"
                      size={60}
                      color={AppColors.black} // Change this color to match your design
                    />
                  </Neomorph>
                </Neomorph>
              ) : (
                <Image
                  source={{ uri: `${baseUrl}${selectedImageUri}` }}
                  style={[ProfileScreenStyleSheet.img]}
                />
              )}
            </View>
            {/* Icon ka view */}
            <View
              style={[
                AfterSignUpStyleSheet.CameraIconView,
                { position: 'absolute', right: 0, bottom: 0 },
              ]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  requestCameraAndAudioPermission();
                  launchImageLibrary({
                    maxWidth: 800,
                    maxHeight: 800,
                  }).then(async Response => {
                    const formdata = new FormData();
                    formdata.append('_id', storedUser.userId);
                    formdata.append('name', 'profileImage');
                    formdata.append('profileImage', {
                      uri: Response.assets[0].uri,
                      type: Response.assets[0].type,
                      name: Response.assets[0].fileName,
                    });
                    fetch(`${baseUrl}/uploadProfile`, {
                      method: 'POST',
                      body: formdata,
                    })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error(
                            `HTTP error! Status: ${response.status}`,
                          );
                        }
                        return response.json();
                      })
                      .then(data => {
                        console.log('res aya');
                        storeImageUri(data.newImage.profileImage);
                        AsyncStorage.getItem('user').then(userData => {
                          if (userData) {
                            const existingData = JSON.parse(userData);
                            const updatedData = {
                              ...existingData,
                              profileImage: data.newImage.profileImage,
                            };
                            console.log('async updatedion chli', updatedData);
                            AsyncStorage.setItem(
                              'user',
                              JSON.stringify(updatedData),
                            );
                          }
                        });
                      })
                      .catch(error => console.log('res error', error));
                  });
                }}>
                <Icons.MaterialIcons
                  name="photo-camera"
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[ProfileScreenStyleSheet.TextView]}>
            <Text style={[ProfileScreenStyleSheet.text]}>{userName}</Text>
            <SelectInfo iconName2="pencil" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('changePassword');
          }}>
          <View style={ProfileScreenStyleSheet.itemStyle}>
            <Avatar.Icon
              size={iconSize}
              icon="key"
              style={{ backgroundColor: 'transparent' }}
              color="steelblue"
            />
            <View style={{ flex: 1 }}>
              <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                Change Password
              </Text>
            </View>
            <Icons.Entypo
              name={arrow_icon}
              size={arrowSize}
              color={arrowColor}
            />
          </View>
          <View style={ProfileScreenStyleSheet.dividerContainer}>
            <Divider />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('changeNumberInfo');
          }}>
          <View style={ProfileScreenStyleSheet.itemStyle}>
            <Avatar.Icon
              size={iconSize}
              icon="account-convert"
              style={{ backgroundColor: 'transparent' }}
              color="green"
            />
            <View style={{ flex: 1 }}>
              <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                Change Number
              </Text>
            </View>
            <Icons.Entypo
              name={arrow_icon}
              size={arrowSize}
              color={arrowColor}
            />
          </View>
          <View style={ProfileScreenStyleSheet.dividerContainer}>
            <Divider />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('blocked');
          }}>
          <View style={ProfileScreenStyleSheet.itemStyle}>
            <Avatar.Icon
              size={iconSize}
              icon="block-helper"
              style={{ backgroundColor: 'transparent' }}
              color="red"
            />
            <View style={{ flex: 1 }}>
              <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                Blocked Contacts
              </Text>
            </View>
            <Icons.Entypo
              name={arrow_icon}
              size={arrowSize}
              color={arrowColor}
            />
          </View>
          <View style={ProfileScreenStyleSheet.dividerContainer}>
            <Divider />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('activity');
          }}>
          <View style={ProfileScreenStyleSheet.itemStyle}>
            <Avatar.Icon
              size={iconSize}
              icon="play-circle"
              style={{ backgroundColor: 'transparent' }}
              color="lightseagreen"
            />
            <View style={{ flex: 1 }}>
              <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                My Uploads
              </Text>
            </View>
            <Icons.Entypo
              name={arrow_icon}
              size={arrowSize}
              color={arrowColor}
            />
          </View>
          <View style={ProfileScreenStyleSheet.dividerContainer}>
            <Divider />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('deleteAccount');
          }}>
          <View style={ProfileScreenStyleSheet.itemStyle}>
            <Avatar.Icon
              size={iconSize}
              icon="delete"
              style={{ backgroundColor: 'transparent' }}
              color="red"
            />
            <View style={{ flex: 1 }}>
              <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                Delete Account
              </Text>
            </View>
            <Icons.Entypo
              name={arrow_icon}
              size={arrowSize}
              color={arrowColor}
            />
          </View>
        </TouchableOpacity>
      </View>
    </DrawerScreenswrapper>
  );
};

export default UserProfile;
