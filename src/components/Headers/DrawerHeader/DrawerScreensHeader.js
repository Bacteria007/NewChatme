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


const DrawerScreensHeader = ({navigation,screenName}) => {

  return (
    <View style={[DrawerHeaderStyle.containerView]}>
      <View style={[DrawerHeaderStyle.headerView]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <Icons.FontAwesome5
            name="arrow-left"
            size={wp('5.5%')}
            color={AppColors.black}
          />
        </TouchableOpacity>
        <Text style={[DrawerHeaderStyle.screenNameStyle]}>{screenName}</Text>
      </View>
    </View>

  );
};
export default DrawerScreensHeader;