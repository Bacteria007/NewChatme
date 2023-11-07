import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  requestCameraAndGalleryPermissions,
  requestGalleryPermission,
} from '../../components/Permission/Permission';
import AppContext from '../../context/AppContext';
import AfterSignUpStyleSheet from '../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import CustomDivider from '../../components/CustomDivider';
import ReactNativeModal from 'react-native-modal';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import MyActivityStyleSheet from '../../assets/styles/ReelStyleSheet/MyActivityStyleSheet';
import { FlatList } from 'react-native';
import GenerateVideoHtml from '../reels/ReelsHtmlVideo';
import WebView from 'react-native-webview';
import { Icons } from '../../assets/Icons';
import SelectInfo from './SelectInfo';

const UserProfile = props => {
  const {    token,    baseUrl,    storeUserName,    currentUser,    updateCurrentUser,    userName,    selectedImageUri,    storeImageUri,  } = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const arrow_icon = 'pencil';
  const iconSize = wp('9%');
  const arrowColor = theme.profileNameColor;
  const arrowSize = 17;
  const textColor = theme.profileNameColor;
  const infoColor = theme.lastMsgColor;
  const rippleColor = 'rgba(0,0,0,0.25)';
  const [allUploads, setAllUploads] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const showProfileModal = () => {
    setProfileModal(true);
  };
  const hideProfileModal = () => {
    setProfileModal(false);
  };
  const fetchUploadedVideos = async () => {
    await fetch(`${baseUrl}/userReels?userId=${currentUser.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        //console.log("##### all reels response ####", data.UploadedVideos)
        if (data.message == 'Please provide a valid token.') {
          Alert.alert('Provide a valid token.');
        } else if (data.message == 'Please provide a token.') {
          Alert.alert('Token required');
        } else {
          const videosWithSources = data.UploadedVideos.map(video => ({
            _id: video._id,
            uri: { uri: video.video },
            desc: video.name,
            user: video.userId,
          }));
          const myuploads = videosWithSources.filter(
            user => user.user._id === currentUser.userId,
          );
          console.log('Myuploads --------^^^^^^^^^^^^^^^^^^^^  ', myuploads);
          setAllUploads(myuploads);
        }
      })
      .catch(error => {
        console.log(error);
        Alert(`Error while fetching data${error}`);
      });
  };
  const fetchProfile = async () => {
    let userid = currentUser.userId;
    let userName = currentUser.name;
    storeUserName(userName);
    fetch(`${baseUrl}/getProfileImage?logegedId=${userid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('res aya profile ka', data);
        storeImageUri(data);
      })
      .catch(error => console.log('res error', error));
  };
  const chooseFromGallery = async () => {
    launchImageLibrary({
      maxWidth: 1080,
      maxHeight: 1080,
    }).then(async Response => {
      if (Response.didCancel) {
        console.log('User cancelled image picker');
      } else if (Response.error) {
        console.log('ImagePicker Error: ', Response.error);
      } else {
        const imageMessage = { uri: Response.assets[0].uri, name: Response.assets[0].fileName, type: Response.assets[0].type };
        updateProfileImage(imageMessage)
      }
    })
  };
  const updateProfileImage = async (img) => {
    const formdata = new FormData();
    formdata.append('_id', currentUser.userId);
    formdata.append('name', 'profileImage');
    formdata.append('profileImage', img);
    fetch(`${baseUrl}/uploadProfile`, {
      method: 'POST',
      body: formdata,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        storeImageUri(data.newImage.profileImage);
        const updateimgOfCurrentUser = {
          ...currentUser,
          profileImage: data.newImage.profileImage,
        };
        updateCurrentUser(updateimgOfCurrentUser);
        AsyncStorage.getItem('profileImage').then(userData => {
          if (userData) {
            // const existingData = JSON.parse(userData);
            // const updatedData = {
            //   // ...existingData,
            //   profileImage: data.newImage.profileImage,
            // };
            // console.log('async updatedion chli', updatedData);
            AsyncStorage.setItem('profileImage', data.newImage.profileImage);
          }
        });
      })
      .catch(error => console.log('res error', error));
  };
  useEffect(() => {
    fetchProfile();
    props.navigation.addListener('focus', () => {
      fetchProfile();
    });
  }, []);
  useEffect(() => {
    console.log('al>>', allUploads);
    fetchUploadedVideos();
    props.navigation.addListener('focus', () => {
      fetchUploadedVideos();
    });
  }, []);
  return (
    <DrawerScreenswrapper>
      <View style={[ProfileScreenStyleSheet.container(theme.backgroundColor)]}>
        <InnerScreensHeader
          screenName={'Profile'}
          navigation={props.navigation}
        />
        {/* main view for profile img */}
        <ScrollView>
          <View
            style={[
              ProfileScreenStyleSheet.innerContainer(theme.backgroundColor),
            ]}>
            <ImageBackground
              source={{ uri:`${baseUrl}${currentUser.profileImage}` }}
              imageStyle={[ProfileScreenStyleSheet.bgImageStyle]}
            />
          </View>
          <View
            style={[
              AfterSignUpStyleSheet.ImageContainer,
              { height: hp('35%'), marginTop: hp('-17') },
            ]}>
            <View>
              <View style={{ position: 'relative' }}>
                {currentUser.profileImage == null ? (
                  <Neomorph
                    inner
                    style={[ProfileScreenStyleSheet.outerNeomorph]}>
                    <Neomorph style={[ProfileScreenStyleSheet.innerNeomorph]}>
                      <Icons.MaterialIcons
                        name="person"
                        size={60}
                        color={AppColors.black} 
                      />
                    </Neomorph>
                  </Neomorph>
                ) : (
                  <TouchableRipple
                    rippleColor={'rgba(0,0,0,1)'}
                    borderless
                    style={[ProfileScreenStyleSheet.img]}
                    onPress={() => {
                      showProfileModal();
                      console.log(`${baseUrl}${currentUser.profileImage}`);
                    }}>
                    <Image
                      source={{ uri: `${baseUrl}${currentUser.profileImage}` }}
                      style={[ProfileScreenStyleSheet.img]}
                    />
                  </TouchableRipple>
                )}
              </View>
              {/* Icon ka view */}
              <View
                style={[
                  AfterSignUpStyleSheet.CameraIconView(darkThemeActivator),
                  { position: 'absolute', right: 0, bottom: 0 },
                ]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    const granted = requestGalleryPermission();
                    if (granted == true) {
                      chooseFromGallery().then(() => {
                        console.log('in if opengallery in userprofile');
                      });
                    } else {
                      requestGalleryPermission().then(async res => {
                        if (res == true) {
                          await chooseFromGallery().then(() => {
                            console.log('in else opengallery in userprofile');
                          });
                        }
                      });
                    }
                  }}>
                  <Icons.MaterialCommunityIcons
                    name={arrow_icon}
                    size={darkThemeActivator ? 17 : 15}
                    color={
                      darkThemeActivator ? AppColors.primary : AppColors.white
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[ProfileScreenStyleSheet.TextView]}>
              <Text
                style={[ProfileScreenStyleSheet.text(theme.profileNameColor)]}>
                {currentUser.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity disabled={true}>
            <View
              style={[
                ProfileScreenStyleSheet.itemStyle,
                { alignItems: 'center' },
              ]}>
              <Avatar.Icon
                size={iconSize}
                icon="text-account"
                style={{ backgroundColor: 'transparent' }}
                color="steelblue"
              />
              <View style={{ flex: 1 }}>
                <Text style={ProfileScreenStyleSheet.itemName(textColor)}>
                  Change Name
                </Text>
                <Text style={[ProfileScreenStyleSheet.itemName(infoColor)]}>
                  {' '}
                  {currentUser.name}{' '}
                </Text>
              </View>
              <SelectInfo iconName2="pencil" />
            </View>
            <CustomDivider />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SettingStack', {
                screen: 'changeNumberInfo',
              });
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
                <Text style={ProfileScreenStyleSheet.itemName(infoColor)}>
                  +92 {currentUser.phoneNumber}
                </Text>
              </View>
              <Icons.MaterialCommunityIcons
                name={arrow_icon}
                size={arrowSize}
                color={arrowColor}
              />
            </View>
            <CustomDivider />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SettingStack', {
                screen: 'deleteAccount',
              });
            }}>
            <View
              style={[
                ProfileScreenStyleSheet.itemStyle,
                { alignItems: 'center' },
              ]}>
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
              <Icons.MaterialCommunityIcons
                name={arrow_icon}
                size={arrowSize}
                color={arrowColor}
              />
            </View>
          </TouchableOpacity>
          <CustomDivider />
          <View
            style={[
              ProfileScreenStyleSheet.itemStyle,
              { alignItems: 'center' },
            ]}>
            <View style={{ flex: 1, marginLeft: wp('3') }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={ProfileScreenStyleSheet.uploadsText(
                    theme.profileNameColor,
                  )}>
                  Uploads
                </Text>
                {allUploads.length > 2 && (
                  <TouchableOpacity
                    rippleColor={rippleColor}
                    borderless
                    style={{ borderRadius: 10 }}
                    onPress={() => {
                      props.navigation.navigate('SettingStack', {
                        screen: 'activity',
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={ProfileScreenStyleSheet.itemName(arrowColor)}>
                        View All
                      </Text>
                      <Text>
                        <Icons.Entypo
                          name={'chevron-right'}
                          size={15}
                          color={arrowColor}
                          style={{ alignSelf: 'center', marginBottom: 2 }}
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal>
                  <View>
                    {allUploads.length != 0 ? (
                      <FlatList
                        horizontal
                        data={allUploads.slice(0, 3)}
                        key={1}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                          const HtmlVideo = GenerateVideoHtml(
                            baseUrl,
                            item,
                            false,
                            true,
                          );
                          return (
                            <View style={{ borderRadius: 10 }} >
                              <View
                                style={[
                                  MyActivityStyleSheet.reelsView,
                                  { borderRadius: 10 },
                                ]}>
                                <WebView
                                  originWhitelist={['*']}
                                  source={{ html: `${HtmlVideo}` }}
                                  scrollEnabled={false}
                                  showsVerticalScrollIndicator={false}
                                  showsHorizontalScrollIndicator={false}
                                  setDisplayZoomControls={false}
                                  setBuiltInZoomControls={false}
                                  style={[
                                    MyActivityStyleSheet.reelStyle,
                                    { borderRadius: 10 },
                                  ]}
                                  containerStyle={{
                                    borderRadius: 10,
                                    marginHorizontal: wp('1'),
                                    elevation: 4,
                                  }}
                                />
                              </View>
                            </View>
                          );
                        }}
                      />
                    ) : (
                      <Text
                        style={ProfileScreenStyleSheet.noFriendsText(
                          theme.lastMsgColor,
                        )}>
                        {' '}
                        no uploads.
                      </Text>
                    )}
                  </View>
                  {allUploads.length > 2 && (
                    <TouchableRipple
                      rippleColor={rippleColor}
                      borderless
                      style={{ borderRadius: 10 }}
                      onPress={() => {
                        props.navigation.navigate('SettingStack', {
                          screen: 'activity',
                        });
                      }}>
                      <View
                        style={{
                          backgroundColor: darkThemeActivator
                            ? AppColors.gray
                            : AppColors.lightBlack,
                          width: wp('32.5'),
                          height: wp('32'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}>
                        <Icons.Entypo
                          name={'chevron-right'}
                          size={30}
                          color={arrowColor}
                        />
                      </View>
                    </TouchableRipple>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={{ height: hp('10') }}></View>
        </ScrollView>
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
          {selectedImageUri == null ? (
            <View style={HomeNeoCards.dpVew}>
              <Image
                source={require('../../assets/imges/default/userProfileDark.jpg')}
                style={{
                  height: hp('45%'),
                  width: hp('45%'),
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : (
            <Image
              source={{ uri: `${baseUrl}${selectedImageUri}` }}
              style={{
                height: hp('40%'),
                width: hp('40%'),
                resizeMode: 'cover',
              }}
            />
          )}
        </View>
      </ReactNativeModal>
    </DrawerScreenswrapper>
  );
};
export default UserProfile;
