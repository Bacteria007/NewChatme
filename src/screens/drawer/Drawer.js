import { useContext } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator, useDrawerProgress, useDrawerStatus, useIsDrawerOpen, } from '@react-navigation/drawer';

import TermsAndConditions from '../TermsAndConditions';
// import TabScreens from './TabScreens';
import UserProfile from '../profile/UserProfile';
import AboutUs from '../About/AboutUs';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import AppContext from '../../context/AppContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';
import Animated from 'react-native-reanimated';
import Containers from '../../assets/styles/Containers';
import FontStyle from '../../assets/styles/FontStyle';
import Settings from '../settings/Settings';
import TabScreens from './TabScreens';
import axios from 'axios';
import RNExitApp from 'react-native-exit-app';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';


const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  const { theme } = useContext(ThemeContext);
  const { baseUrl, currentUser } = useContext(AppContext);
  console.log('baseurl', baseUrl);
  console.log('appcontext appjs', currentUser);

  let iconSize = 18;
  const ff = FontStyle.regularFont;
  const fs = hp('1.4')
  const drawerBackgroungColor = theme.drawerColor;
  const activeTintColor = AppColors.black;
  const inActiveTintColor = AppColors.black;
  const activeBgColor = 'rgba(255,255,255,1)';

  const logoutUser = async ({ navigation }) => {
    // YE NOTIFICATION K TOKEN KO LOGOUT PR NULL KRNY K LIYE API HAI
    const CurrentUserId = await AsyncStorage.getItem('Id');
    const CurrentUserFcmToken = await AsyncStorage.getItem('fcmToken');
    try {
      const formdata = new FormData();
      formdata.append('fcmToken', CurrentUserFcmToken);

      axios({
        method: 'post',
        url: `${baseUrl}/logOut?userId=${CurrentUserId}`,
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          if (response.match == true) {
            console.log('put null in fcm token');
          }
        })
        .catch(function (response) {
          console.log(response);
        });

      // await AsyncStorage.setItem('fcmToken','');
      await AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(false))
      await AsyncStorage.setItem('isSignupProccessComplete', JSON.stringify(false))
      await AsyncStorage.setItem('token', '')
      await AsyncStorage.setItem('profileImage', '')
      await AsyncStorage.setItem('name', '')
      await AsyncStorage.setItem('Id', '')
      await AsyncStorage.setItem('phoneNo', '')
      console.log(currentUser.name, 'logout');
      RNExitApp.exitApp();

      navigation.replace('Splash');
      // navigation.replace('LogInScreen');

    } catch (error) {
      console.log('Error while logging out:', error);
      Alert.alert('You are unable to logout, try again later!');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          overlayColor: 'transparent',
          drawerType: 'slide',
          drawerActiveTintColor: activeTintColor,
          drawerInactiveTintColor: inActiveTintColor,
          drawerStyle: {
            width: wp('50%'),
            backgroundColor: drawerBackgroungColor,
          },
          drawerLabelStyle: {
            fontFamily: ff,
            fontSize: fs,
            marginLeft: -20,
          },
          drawerActiveBackgroundColor: activeBgColor,
          drawerItemStyle: { width: wp('38'), justifyContent: 'center' },
          sceneContainerStyle: {
            backgroundColor: drawerBackgroungColor,
          },
        }}
        drawerContent={props => {
          return (
            <View style={{ flex: 1 }}>
              <DrawerContentScrollView
                {...props}
                showsVerticalScrollIndicator={false}>
                <Animated.View
                  style={[Containers.centerContainer, { height: hp('25%') }]}>
                  <View style={styles.imageView}>
                  {currentUser.profileImage!=null ? <Image source={{ uri: `${baseUrl}${currentUser?.profileImage} ` }} style={styles.imageStyle} />
                   :
                    <View style={[ProfileScreenStyleSheet.innerNeomorph]}>
                      <Icons.MaterialIcons
                        name="person"
                        size={60}
                        color={AppColors.black} 
                      />
                  </View>
                   }
                  </View>
                  <Text style={styles.userNameText}>
                    {currentUser?.name}
                  </Text>
                </Animated.View>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
              <TouchableOpacity
                onPress={() => {
                  logoutUser(props);
                }}>
                <View style={styles.logoutView}>
                  <Icons.AntDesign name="logout" color={AppColors.black} size={iconSize}
                  />
                  <Text style={styles.logoutText}>  Logout </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}>
        <Drawer.Screen
          name="Home"
          component={TabScreens}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.MaterialCommunityIcons color={focused ? activeTintColor : inActiveTintColor} name={'home'} size={iconSize}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.MaterialIcons name={'person'} color={focused ? activeTintColor : inActiveTintColor} size={iconSize}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.Ionicons name={'ios-information-circle-sharp'} color={focused ? activeTintColor : inActiveTintColor} size={iconSize}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.Ionicons name={'ios-settings-sharp'} color={focused ? activeTintColor : inActiveTintColor} size={iconSize}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={{
            drawerIcon: ({ focused }) => (
              <Icons.FontAwesome5 name="file-signature" color={focused ? activeTintColor : inActiveTintColor} size={iconSize}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerScreens;
const styles = StyleSheet.create({
  logoutText: {
    fontSize: wp('4%'),
    fontFamily: FontStyle.regularFont,
    color: AppColors.black,
    marginLeft: wp('3.5%'),
  },
  logoutView: {
    paddingLeft: wp('5%'),
    paddingBottom: hp('4%'),
    flexDirection: 'row',
  },
  userNameText: { fontSize: hp('2.5%'), color: AppColors.black, fontFamily: FontStyle.regularFont, marginVertical: 6, textAlign: 'center' },
  imageView: {
    height: wp('26.5%'),
    width: wp('26.5%'),
    borderRadius: wp('100%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5'),
  },
  imageStyle: {
    height: wp('25%'),
    width: wp('25%'),
    borderRadius: wp('100%'),
    alignSelf: 'center',
  },
})