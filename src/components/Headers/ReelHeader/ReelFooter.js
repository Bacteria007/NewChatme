import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import ReelFooterStyle from '../../../assets/styles/ReelStyleSheet/ReelFooterStyle';
import { Icons } from '../../../assets/Icons';
import Animated from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';

const ReelFooter = ({ onPressShare }) => {
  return (
    <View style={[ReelFooterStyle.containerView]}>
      <Animated.View
        style={{
          width: wp('65%'),
        }}>
        <View style={[ReelFooterStyle.leftContainer]}>
          <View style={[ReelFooterStyle.imageContainer]}>
            <Image
              source={require('../../../assets/imges/landscaper-homepage-work-01-600x351.jpg')}
              style={[ReelFooterStyle.imageStyle]}
            />
          </View>
          <Text style={[ReelFooterStyle.profileName]}>User name</Text>
        </View>
      </Animated.View>
      <View style={[ReelFooterStyle.rightContainer]}>
        <TouchableOpacity
          onPress={() => {
            onPressShare();
          }}>
          <Icons.MaterialCommunityIcons
            name="share"
            size={wp('9%')}
            color={AppColors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReelFooter;
