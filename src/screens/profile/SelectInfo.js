import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon, { Icons } from '../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import Modal from 'react-native-modal';
import AppContext from '../../context/AppContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';

const SelectInfo = ({ iconName2, props }) => {
  const modalfontsize = wp('4.6%');
  const iconSize = wp('5.5%');
  const selectedTextColor = 'black';
  const titleTextColor = 'grey';

  const { userName, storeUserName, currentUser, baseUrl, updateCurrentUser } =
    useContext(AppContext);

  const [userinput, setUserinput] = useState(userName);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const StoreUpdatedNameInDb = () => {
    const formData = new FormData();
    formData.append('_id', currentUser.userId);
    formData.append('name', userinput);
    fetch(`${baseUrl}/updateProfileName`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Backend sy result aya', data);
        storeUserName(data.result.name);
        const updateNameOfCurrentUser = {
          ...currentUser,
          name: data.result.name,
        };

        updateCurrentUser(updateNameOfCurrentUser);

        AsyncStorage.getItem('name').then(userData => {
          if (userData) {
            AsyncStorage.setItem('name', data.result.name);
          }
        });
      })
      .catch(error => console.log('res error', error));
  };

  useEffect(() => {
    let userNaame = currentUser.name;
    storeUserName(userNaame);
  }, []);
  useEffect(() => {
    setUserinput(userName);
  }, [userName]);
  return (
    <View>
      <View style={{ marginTop: hp('0.8%') }}>
        <TouchableOpacity
          onPress={() => {
            setIsModalOpened(true);
          }}>
          <View style={{ marginLeft: wp('2.5') }}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={iconName2}
              size={iconSize}
              color={AppColors.black}
              // style={{margin: 15}}
            />
          </View>
        </TouchableOpacity>

        <Modal
          onBackButtonPress={() => {
            setIsModalOpened(false);
          }}
          isVisible={isModalOpened}
          onBackdropPress={() => {
            setIsModalOpened(false);
          }}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
            justifyContent: 'flex-end',
          }}>
          <View style={[ProfileScreenStyleSheet.ModalDesign]}>
            <Text
              style={{
                fontSize: modalfontsize,
                color: selectedTextColor,
                margin: wp('3%'),
              }}>
              Edit Your Name
            </Text>
            <View style={[ProfileScreenStyleSheet.ViewStyle]}>
              <TextInput
                value={userinput}
                cursorColor={AppColors.primary}
                onChangeText={text => {
                  setUserinput(text);
                }}
                selectTextOnFocus={true}
                style={[ProfileScreenStyleSheet.TextInputStyle]}
                placeholderTextColor={titleTextColor}
              />
            </View>
            <View style={[ProfileScreenStyleSheet.innerView1]}>
              <View style={[ProfileScreenStyleSheet.InnerView2]}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalOpened(false);
                    setUserinput(userName);
                  }}
                  style={[ProfileScreenStyleSheet.TouchableContent]}>
                  <Text
                    style={{
                      fontSize: modalfontsize,
                      color: selectedTextColor,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalOpened(false);
                    StoreUpdatedNameInDb();
                  }}
                  style={[ProfileScreenStyleSheet.TouchableContent]}>
                  <Text
                    style={{
                      fontSize: modalfontsize,
                      color: selectedTextColor,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default SelectInfo;
