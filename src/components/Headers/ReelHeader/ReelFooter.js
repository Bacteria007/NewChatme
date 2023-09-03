import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import ReelFooterStyle from '../../../assets/styles/ReelStyleSheet/ReelFooterStyle';
import { Icons } from '../../../assets/Icons';
import Animated from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import AppContext from '../../../context/AppContext';

const ReelFooter = ({ onPressShare,item }) => {
  console.log("reel foter++++++++++",item)
  const { baseUrl ,currentUser} = useContext(AppContext);

  return (
    <View style={[ReelFooterStyle.containerView]}>
      <Animated.View
        style={{
          width: wp('65%'),
        }}>
        <View style={[ReelFooterStyle.leftContainer]}>
          <View style={[ReelFooterStyle.imageContainer]}>
            {item.profileImage?
            <Image
              source={{uri:`${baseUrl}${item.profileImage}`}}
              style={[ReelFooterStyle.imageStyle]}
            />
            :
            <Image
              source={require('../../../assets/imges/default/userProfileDark.jpg')}
              style={[ReelFooterStyle.imageStyle]}
            />
            
            }
          </View>
          <Text style={[ReelFooterStyle.profileName]}>{item.name==currentUser.name ? "You" : item.name}</Text>
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
