import 'react-native-gesture-handler'
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity, StyleSheet

} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DrawerHeaderStyle from '../../../assets/styles/DrawerHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {Primary_StatusBar} from '../../statusbars/Primary_StatusBar';
import { ThemeContext } from '../../../context/ThemeContext';
import { Appbar, Surface, TouchableRipple } from 'react-native-paper';


const InnerScreensHeader = ({ navigation, screenName }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[DrawerHeaderStyle.containerView]}>
      <Primary_StatusBar />
      <View style={DrawerHeaderStyle.headerView(theme.backgroundColor)}>
        <TouchableRipple
          onPress={() => {
            navigation.goBack();
          }}
          rippleColor="rgba(0, 0, 0, 0.3)"
          borderless
          style={DrawerHeaderStyle.backBtn}
          >
          <Icons.Ionicons
            name="arrow-back"
            size={wp('7%')}
            color={theme.headerIconsColor}
            style={{ marginLeft: wp('2%') }}
          />
        </TouchableRipple>
        <Text style={[DrawerHeaderStyle.screenNameStyle, { color: theme.headerIconsColor }]}>{screenName}</Text>
      </View>
    </View>

  );
};
export default InnerScreensHeader;
