import { View, Text, Alert, StatusBar, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import ReelHeaderStyle from '../../../assets/styles/ReelStyleSheet/ReelHeaderStyle';
import AppColors from '../../../assets/colors/Appcolors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '../../../assets/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableRipple } from 'react-native-paper';

const UserUploadsHeader = ({ navigation }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.headerView]}>
        <TouchableRipple
          onPress={() => { navigation.goBack() }}
          rippleColor={AppColors.lightBlack}
          borderless
          style={DrawerHeaderStyle.backBtn}
        >
          <Icons.Ionicons
            name="arrow-back"
            size={wp('7%')}
            color={AppColors.white}
            style={{ marginHorizontal: wp('2%'),
            // textShadowColor: AppColors.primary,
            // textShadowOffset: {width: wp('0.7%'), height: wp('0.7%')},
            // textShadowRadius: wp('0.5%'),
           }}
          />
        </TouchableRipple>
      <Text style={[ReelHeaderStyle.screenNameStyle]}>Posts</Text>
    </View>
  );
};

export default UserUploadsHeader;
const styles = StyleSheet.create({
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
    backgroundColor:'rgba(0,0,0,0.2)'
  },
})
