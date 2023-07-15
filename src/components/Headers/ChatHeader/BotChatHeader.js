import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native'
import React from 'react'
import BotChatHeaderStyle from '../../../assets/styles/BotStyleSheet/BotChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';


const BotChatHeader = ({navigation}) => {
  return (

    <View style={[BotChatHeaderStyle.headerView]}>
     
        <View 
        >
         <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <Icons.FontAwesome5
            name="arrow-left"
            size={wp('5.5%')}
            color={AppColors.black}
            style={{marginTop: hp('2.8%')}}
          />
        </TouchableOpacity>
        </View>
      <View style={[BotChatHeaderStyle.leftview]}>
       
       
         
            <View style={[BotChatHeaderStyle.dpContainerView]}>
              <Image
                source={require('../../../assets/imges/BotScreenImg/botPic.png')}
                style={[BotChatHeaderStyle.dpImageStyle]}
              />
            </View>
            <View style={[BotChatHeaderStyle.profileNameContainerStyle]}>
              <Text style={[BotChatHeaderStyle.BotNameTextStyle]}>AI ChatBot</Text>
            </View>
          </View>
      
        
    </View>
    
    

  )
}

export default BotChatHeader