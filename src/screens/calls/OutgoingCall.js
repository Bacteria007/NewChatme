import {View, Text, Image, ImageBackground} from 'react-native';
import React, { useState } from 'react';
import CallStyles from '../../assets/styles/CallStyles';
import {Icons} from '../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';

const OutgoingCall = props => {
  const {item} = props.route.params;
  const [callState, setCallState] = useState('Calling');

  return (
    <View>
      <ImageBackground
        source={require('../../assets/imges/3D-Black-Phone-Wallpaper-127.jpg')}
        style={[CallStyles.imageContainer]}>
        <View style={[CallStyles.topView]}>
          <Image source={item.dpImage} style={[CallStyles.dpImageStyle]} />
          <Text style={[CallStyles.recieverName]}>{item.profileName}</Text>
          <Text style={[CallStyles.callStatus]}>{callState}</Text>
        </View>
        <View style={[CallStyles.bottomContainerView]}>
          <Icons.AntDesign
            name="sound"
            size={wp('8%')}
            color={AppColors.white}
          />
          <Icons.Foundation
            name="video"
            size={wp('8%')}
            color={AppColors.white}
          />
          {/* <View style={[CallStyles.outerView]}> */}
          {/* <View style={[CallStyles.iconContainerView]}> */}
          <Icons.FontAwesome
            name="microphone"
            size={wp('8%')}
            color={AppColors.white}
          />
          {/* </View> */}
          {/* <Text style={[CallStyles.bottomText]}>Cancel</Text> */}
          {/* </View> */}
          {/* <View style={[CallStyles.outerView]}> */}
          <View
            style={[
              CallStyles.iconContainerView,
              {backgroundColor: AppColors.red},
            ]}>
            <Icons.MaterialCommunityIcons
              name="phone-hangup"
              size={wp('10%')}
              color={AppColors.white}
            />
          </View>
          {/* <Text style={[CallStyles.bottomText]}>Call again</Text> */}
          {/* </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default OutgoingCall;
