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
import { GetDuration } from '../../../helpers/UiHelpers/DurationCounter';

const ReelFooter = ({ onPressShare, item, onPressLike, createdAt, onPressDislike, isVideoLiked, likeCount, navigation, callingScreen }) => {
  console.log("reel foter++++++++++", item)
  const { baseUrl, currentUser } = useContext(AppContext);

  return (
    <View style={[ReelFooterStyle.containerView, { paddingBottom: callingScreen == "uploads" ? hp('4') : hp('11%') }]}>
      <Animated.View
        style={{
          width: wp('65%'),
        }}>
        <View style={[ReelFooterStyle.leftContainer]}>
          <View style={[ReelFooterStyle.imageContainer]}>
            {item?.profileImage ?
              <Image
                source={{ uri: `${baseUrl}${item?.profileImage}` }}
                style={[ReelFooterStyle.imageStyle]}
              />
              :
              <Image
                source={require('../../../assets/imges/default/userProfileDark.jpg')}
                style={[ReelFooterStyle.imageStyle]}
              />

            }
          </View>
          <View>

            <Text style={[ReelFooterStyle.profileName]}>{item?.name}</Text>
            <Text style={[ReelFooterStyle.duration]}>{GetDuration(createdAt)}</Text>
          </View>
        </View>
      </Animated.View>
      <View style={[ReelFooterStyle.rightContainer]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InnerScreens', {
              screen: 'publicProfile',
              params: { data: item },
            });
          }}>
          <Image
            source={{ uri: `${baseUrl}${item?.profileImage}` }}
            style={[ReelFooterStyle.imageStyle2]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={ReelFooterStyle.likeShareBtns}
          onPress={() => {
            onPressShare();
          }}>
          <Icons.MaterialCommunityIcons
            name="share"
            size={wp('8%')}
            color={AppColors.white}
            style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>
        <View style={{ backgroundColor: AppColors.transparent, justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            style={ReelFooterStyle.likeShareBtns}
            onPress={() => {
              if (isVideoLiked) {
                onPressDislike()
              } else {
                onPressLike()
              }
            }
            }>
            <Icons.FontAwesome
              name="heart"
              size={wp('6%')}
              color={isVideoLiked ? 'red' : AppColors.white}
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
          <Text style={[ReelFooterStyle.likeCount]}>{likeCount} {likeCount > 1 ? "like" : "likes"}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReelFooter;
