import 'react-native-gesture-handler'
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import { Icons } from '../../../assets/Icons';
import AppColors from '../../../assets/colors/Appcolors';
import Status_bar from '../Status_bar';


const InnerScreensHeader = ({navigation,screenName}) => {

  return (
    <View style={[DrawerHeaderStyle.containerView]}>
      <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.primary} content={'light-content'} />
      <View style={[DrawerHeaderStyle.headerView]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <Icons.Ionicons
            name="arrow-back"
            size={wp('7%')}
            color={AppColors.white}
          />
        </TouchableOpacity>
        <Text style={[DrawerHeaderStyle.screenNameStyle]}>{screenName}</Text>
      </View>
    </View>

  );
};
export default InnerScreensHeader;