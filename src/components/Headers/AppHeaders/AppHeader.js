import 'react-native-gesture-handler'
import React, { useContext, useState } from 'react';
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

import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import { useDrawerStatus} from '@react-navigation/drawer';

// const NavScreens = ({navigation}) => {
//   <Stack.Navigator>
//     <Stack.Screen name="Bot" component={<ChatBot />} />
//   </Stack.Navigator>;
// };

const AppHeader = ({ navigation,headerTitle }) => {
  const isDrawerOen = useDrawerStatus()

  return (
    <View style={[AppHeaderStyle.mainHeader]}>
      {/* <Status_bar darkModeBgColor={"black"} lightModeBgColor={AppColors.white}/> */}
      <View style={[AppHeaderStyle.headerView]}>
        {isDrawerOen==='open' ?
          <TouchableOpacity onPress={() => {
            // setIsOpen(!isOpen)
            navigation.toggleDrawer()
          }}>
            <Icons.AntDesign
              name="menu-unfold"
              color={AppColors.primary}
              size={wp('6.5%')}
            />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => {
            navigation.toggleDrawer()
            // navigation.closeDrawer()
          }}>

            <Icons.AntDesign
              name="menu-fold"
              color={AppColors.primary}
              size={wp('6.5%')}
            />

          </TouchableOpacity>
        }
        {/* <View style={[AppHeaderStyle.iconContainerStyle]}> */}
          <Text style={[AppHeaderStyle.appNameStyle]}>{headerTitle}</Text>

          <TouchableOpacity
          onPress={()=>{navigation.navigate('ChatBot')}}
          >
            <Icons.Entypo
              name="user"
              color={AppColors.primary}
              size={wp('6%')}
            />
          </TouchableOpacity>

        {/* </View> */}
      </View>
    </View>

  );
};
export default AppHeader;
