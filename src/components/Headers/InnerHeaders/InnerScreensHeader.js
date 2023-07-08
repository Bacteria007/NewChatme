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
import AppContext from '../../../context/AppContext';


const InnerScreensHeader = ({navigation,screenName}) => {
  const { darkThemeActivator } = useContext(AppContext);

  return (
    <View style={[DrawerHeaderStyle.containerView]}>
      {/* <Status_bar darkModeBgColor={AppColors.darkTheme} lightModeBgColor={AppColors.primary} lightModeContent={'light-content'} darkModeContent={'dark-content'} /> */}
      <StatusBar
        barStyle={darkThemeActivator ? 'light-content' : 'light-content'}
        backgroundColor={darkThemeActivator?AppColors.darkTheme:AppColors.primary}
      />
      <View style={[DrawerHeaderStyle.headerView,{backgroundColor:darkThemeActivator?AppColors.darkTheme:AppColors.primary}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chats')
          }}>
          <Icons.Ionicons
            name="arrow-back"
            size={wp('7%')}
            color={darkThemeActivator ? AppColors.lightwhite : AppColors.white}
            style={{marginLeft:wp('2%')}}
          />
        </TouchableOpacity>
        <Text style={[DrawerHeaderStyle.screenNameStyle,{color:darkThemeActivator ? AppColors.lightwhite : AppColors.white}]}>{screenName}</Text>
      </View>
    </View>

  );
};
export default InnerScreensHeader;
