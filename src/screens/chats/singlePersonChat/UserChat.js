import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import UserChatHeader from '../../../components/Headers/ChatHeader/UserChatHeader';
import AppColors from '../../../assets/colors/Appcolors';
import UserChatInput from '../../../components/ChatInput/UserChatInput';

const UserChat = props => {
    const { item } = props.route.params;
   return (
        <View style={{ backgroundColor: AppColors.white, flex: 1, }}>
            <UserChatHeader item={item} navigation={props.navigation} />
            {/* main content of screen below header including messages flatlist and y=textinput */}
            {/* <ImageBackground source={require('../../../assets/imges/userChatImages/img6.jpg')} style={{ height: hp('92%'), flex: 1, width: wp('100%'), justifyContent: 'flex-end' }} resizeMode='cover'> */}
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <UserChatInput />
                </View>
            {/* </ImageBackground> */}
        </View>
    );
};

export default UserChat;