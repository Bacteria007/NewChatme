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
import Icon, { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ChatBot from '../../../screens/ChatBot';
import AppContext from '../../../context/AppContext';
import Status_bar from '../Status_bar';
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';

import { DrawerActions } from '@react-navigation/native';


// const NavScreens = ({navigation}) => {
//   <Stack.Navigator>
//     <Stack.Screen name="Bot" component={<ChatBot />} />
//   </Stack.Navigator>;
// };

const AppHeader = ({navigation}) => {
  const { appName } = useContext(AppContext);

  return (
    <View style={[AppHeaderStyle.mainHeader]}>
      {/* <Status_bar darkModeBgColor={"black"} lightModeBgColor={AppColors.white}/> */}
      <View style={[AppHeaderStyle.headerView]}>
        <Text style={[AppHeaderStyle.appNameStyle]}>{appName}</Text>
        <View style={[AppHeaderStyle.iconContainerStyle]}>
          <TouchableOpacity>
            <Icons.MaterialCommunityIcons
              name="robot"
              color={AppColors.primary}
              size={wp('7.5%')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
            <Icon
              type={Icons.Ionicons}
              name="reorder-three"
              color={AppColors.primary}
              size={wp('9%')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};
export default AppHeader;
