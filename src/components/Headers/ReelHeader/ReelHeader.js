import { View, Text, Alert, StatusBar } from 'react-native';
import React, { useState, useContext } from 'react';
import ReelHeaderStyle from '../../../assets/styles/ReelStyleSheet/ReelHeaderStyle';
import AppColors from '../../../assets/colors/Appcolors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '../../../assets/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import AppContext from '../../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReelHeader = ({navigation}) => {
  
  const { baseUrl,token,currentUser } = useContext(AppContext);
  let options = {
    mediaType: 'video',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  const iconcolor = AppColors.white;

  const uploadVideo = async Response => {
    // const userData = await AsyncStorage.getItem('user');

    // const  userParseData = JSON.parse(userData);
    // const parseId = userParseData.userId;
    const formData = new FormData();
    formData.append('userId', currentUser.userId);
    formData.append('name', 'Video');
    formData.append('video', {
      uri: Response.uri,
      type: Response.type,
      name: Response.fileName,
    });
    fetch(`${baseUrl}/allReels`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  return (
    <View style={[ReelHeaderStyle.headerView]}>
      <Text style={[ReelHeaderStyle.screenNameStyle]}>Reels</Text>
      <View style={[ReelHeaderStyle.iconContainer]}>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary(options, res => {
              if (!res.didCancel && !res.error) {
                if (
                  res.assets[0].type === 'video/mp4' ||
                  res.assets[0].type === 'video/avi' ||
                  res.assets[0].type === 'video/mkv' ||
                  res.assets[0].type === 'video/mov' ||
                  res.assets[0].type === 'video/wmv' ||
                  res.assets[0].type === 'video/flv' ||
                  res.assets[0].type === 'video/webm' ||
                  res.assets[0].type === 'video/3gp' ||
                  res.assets[0].type === 'video/gif' ||
                  res.assets[0].type === 'video/mk3d' ||
                  res.assets[0].type === 'video/mts' ||
                  res.assets[0].type === 'video/vob' ||
                  res.assets[0].type === 'video/rm' ||
                  res.assets[0].type === 'video/swf' ||
                  res.assets[0].type === 'video/ogv' ||
                  res.assets[0].type === 'video/mpeg' ||
                  res.assets[0].type === 'video/m2ts' 
                ) {
                  uploadVideo(res.assets[0]);
                } else {
                  Alert.alert('you can just upload videos');
                }
              }
            });
          }}>
          <Icons.AntDesign
            name="pluscircleo"
            size={wp('7.5%')}
            color={iconcolor}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('activity');
          }}>
          <Icons.Feather name="activity" size={wp('8.2%')} color={iconcolor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReelHeader;
