import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  TextInput,
} from 'react-native';
import Icon, {Icons} from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ChatBot from '../../../screens/ChatBot';
// import Icons from '../../assets/Icons';
import AppContext from '../../../context/AppContext';
import Status_bar from '../Status_bar';
import AppColors from '../../../assets/colors/Appcolors';
import AppHeaderStyle from '../../../assets/styles/AppHeaderStyle';
import { useNavigation } from '@react-navigation/native';


// const NavScreens = ({navigation}) => {
//   <Stack.Navigator>
//     <Stack.Screen name="Bot" component={<ChatBot />} />
//   </Stack.Navigator>;
// };

const AppHeader = () => {
  const {appName} = useContext(AppContext);
  const navigation=useNavigation()
  
  return (
    <View style={[AppHeaderStyle.mainHeader]}>
      <Status_bar />
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
          <TouchableOpacity onPress={()=>{
            navigation.navigate('DrawerScreens')
          }}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="reorder-horizontal"
              color={AppColors.primary}
              size={wp('7.5%')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <>
    //   {/* '''''''''''''STATUS BAR''''''''''' */}

    //   <View
    //     style={{
    //       // height: hp('3%'),
    //       // width: wp('100%'),
    //       backgroundColor: 'white',
    //     }}>
    //     <StatusBar
    //       barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
    //       backgroundColor={bgColor}
    //       // translucent={true}
    //       // backgroundColor={'transparent'}
    //     />
    //   </View>

    //   {/* '''''''''''''HEADER''''''''''' */}

    //   <View
    //     style={{
    //       height: hp('7.5%'),
    //       backgroundColor: AppColors.black,
    //       flexDirection: 'row',
    //     }}>
    //     <View
    //       style={{
    //         height: hp('7.5%'),
    //         flexDirection: 'row',
    //         backgroundColor: AppColors.white,
    //         width: wp('40%'),
    //         alignItems: 'center',
    //       }}>
    //       <Text
    //         style={{
    //           fontSize: wp('7%'),
    //           fontFamily: FontStyle.mediumFont,
    //           color: AppColors.primary,
    //           // marginLeft: 14,
    //         }}>
    //         {title}
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         height: hp('7.5%'),
    //         flexDirection: 'row',
    //         backgroundColor: AppColors.black,
    //         width: wp('60%'),
    //         alignItems: 'center',
    //         justifyContent: 'flex-end',
    //       }}>
    //       <TouchableOpacity>
    //         <Icon
    //           type={Icons.FontAwesome}
    //           name="search"
    //           color={AppColors.primary}
    //           size={20}
    //           style={{padding: 15}}
    //         />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //       // onPress={()=>{
    //       //  navigation.navigate('Bot')
    //       // }}
    //       >
    //         <Icon
    //           type={Icons.MaterialCommunityIcons}
    //           name="robot"
    //           color={AppColors.primary}
    //           size={20}
    //           style={{padding: 15}}
    //         />
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={()=>{
    //         navigation.navigate('Drawer')
    //       }}>
    //         <Icon
    //           type={Icons.Ionicons}
    //           name="reorder-three"
    //           color={AppColors.primary}
    //           size={26}
    //           style={{padding: 15}}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </>
  );
};
export default AppHeader;
