import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import BotChatHeaderStyle from '../../../assets/styles/BotStyleSheet/BotChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import { ThemeContext } from '../../../context/ThemeContext';
import TranslationFile from '../../../assets/translation/TranslationFile';
import AppContext from '../../../context/AppContext';


const BotChatHeader = ({navigation}) => {
  const { theme } = useContext(ThemeContext);
  const {language} = useContext(AppContext);
  return (

    <View style={[BotChatHeaderStyle.headerView(theme.chatScreenColor)]}>
     
        <View 
        >
         <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <Icons.FontAwesome5
            name="arrow-left"
            size={wp('5.5%')}
            color={theme.profileNameColor}
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
              <Text style={[BotChatHeaderStyle.BotNameTextStyle(theme.profileNameColor)]}>{TranslationFile[language].AI_ChatBot}</Text>
            </View>
          </View>
      
        
    </View>
    
    

  )
}

export default BotChatHeader