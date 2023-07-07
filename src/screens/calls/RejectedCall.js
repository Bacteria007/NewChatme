import {View, Text, Image, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import AppColors from '../../assets/colors/Appcolors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Icons} from '../../assets/Icons';
import FontStyle from '../../assets/styles/FontStyle';
import CallStyles from '../../assets/styles/CallStyles';

const RejectedCall = props => {
  const {item} = props.route.params;
  const [callState, setCallState] = useState('Calling');
  return (
    <View style={[CallStyles.containerView]}>
      <ImageBackground
        source={require('../../assets/imges/3D-Black-Phone-Wallpaper-127.jpg')}
        style={[CallStyles.imageContainer]}>
        <View style={[CallStyles.topView]}>
          <Image source={item.dpImage} style={[CallStyles.dpImageStyle]} />
          <Text style={[CallStyles.recieverName]}>{item.profileName}</Text>
          <Text style={[CallStyles.callStatus]}>{callState}</Text>
        </View>
        <View style={[CallStyles.bottomContainerView]}>
          <View style={[CallStyles.outerView]}>
            <View style={[CallStyles.iconContainerView]}>
              <Icons.Entypo
                name="cross"
                size={wp('10%')}
                color={AppColors.black}
              />
            </View>
            <Text style={[CallStyles.bottomText]}>Cancel</Text>
          </View>
          <View style={[CallStyles.outerView]}>
            <View
              style={[
                CallStyles.iconContainerView,
                {backgroundColor: AppColors.primary},
              ]}>
              <Icons.FontAwesome
                name="phone"
                size={wp('10%')}
                color={AppColors.white}
              />
            </View>
            <Text style={[CallStyles.bottomText]}>Call again</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
//MaterialCommunityIcons------------phone-hangup,phone,microphone,theme-light-dark,account-remove,account-switch
//FontAwesome------------------------microphone,microphone-slash,american-sign-language-interpreting,language
//Foundation-------------------------sound
//AntDesign-------------------------sound
//FontAwesome5----------------------video-slash,video,user-slash
//Entypo----------------------------cross,language
//MaterialIcons----------------------notifications-on
//Ionicons-------------------------notifications
//Feather----------------------------activity
export default RejectedCall;
