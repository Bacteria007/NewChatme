import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {Primary_StatusBar} from '../../components/statusbars/Primary_StatusBar'
import AppColors from '../../assets/colors/Appcolors'
import Icon, { Icons } from '../../assets/Icons.js';
import SelectInfo from './SelectInfo';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useDrawerProgress } from '@react-navigation/drawer'
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';


const UserProfile = (props) => {
  const progress = useDrawerProgress()
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp') },
      // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
      { translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp') }
    ],
    overflow: 'hidden',
    // borderRadius:10

  }));
  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <View style={{ backgroundColor: "white", flex: 1, height: hp('100%'), width: wp('100%') }}>
        <Primary_StatusBar />
        <InnerScreensHeader screenName={"Profile"} navigation={props.navigation} />
        {/* main view for profile img */}
        <View
          style={{
            height: hp('30%'),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'red'
          }}>
          <TouchableOpacity
            activeOpacity={0.7}  //😁
            onPress={() => {
              console.log('hello touch');
            }}
            style={{
              // backgroundColor: 'yellow',
              height: hp('22%'),
              width: hp('22%'),
              borderRadius: 100,
            }}>
            <ImageBackground
              source={require('../../assets/imges/img2.png')}
              style={{
                height: hp('20%'),
                width: hp('20%'),
              }}
              imageStyle={{ borderRadius: 100 }}>
              {/* img k oper same size ka view ta k camera icon k view ko rotate kr k bottom right corner pr ly jaye*/}

              <View
                style={{
                  height: hp('20%'),
                  width: hp('20%'),
                  borderRadius: 75,
                  transform: [{ rotate: '180deg' }],
                  // backgroundColor:'green'
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                >
                  {/* Icon ka view */}
                  <View
                    style={{
                      height: hp('6%'),
                      width: hp('6%'),
                      borderRadius: 100,
                      backgroundColor: AppColors.black,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{ rotate: '180deg' }],
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="camera-alt"
                      size={23}
                      color="white"
                    />

                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Name  */}
        <SelectInfo
          iconType1={Icons.FontAwesome5}
          iconName1={'user-alt'}
          title="Name"
          subtitle={
            'This is not your user name or pin. This name will be visible to your WhatsApp contacts.'
          }
          iconName2="pencil"
        />


      </View>
    </Animated.View>
  )
}

export default UserProfile