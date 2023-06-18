import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Icon, {Icons} from '../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../assets/colors/Appcolors';
import ChatBot from '../../screens/ChatBot';


const NavScreens=()=>{
  <Stack.Navigator>
    <Stack.Screen name='Bot' component={<ChatBot/>}/>
  </Stack.Navigator>
}

const AppHeader = ({title, navigation}) => {
  const headerColorInLightMode = '#f5f6f7';
  const headerColorInDarkMode = 'white';
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = isDarkMode ? headerColorInDarkMode : headerColorInLightMode;
  return (
    <>
      {/* '''''''''''''STATUS BAR''''''''''' */}

      <View
        style={{
          // height: hp('3%'),
          // width: wp('100%'),
          backgroundColor: 'white',
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
          backgroundColor={bgColor}
          // translucent={true}
          // backgroundColor={'transparent'}
        />
      </View>

      {/* '''''''''''''HEADER''''''''''' */}

      <View
        style={{
          height: hp('7.5%'),
          backgroundColor: 'white',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: hp('7.5%'),
            flexDirection: 'row',
            backgroundColor: 'white',
            width: wp('40%'),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: wp('5%'),
              fontFamily: 'Poppins-Regular',
              color: Colors.primary,
              marginLeft: 14,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            height: hp('7.5%'),
            flexDirection: 'row',
            backgroundColor: 'white',
            width: wp('60%'),
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity>
            <Icon
              type={Icons.FontAwesome}
              name="search"
              color={Colors.primary}
              size={20}
              style={{padding: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={()=>{
          //  navigation.navigate('Bot')
          // }}
          >
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="robot"
              color={Colors.primary}
              size={20}
              style={{padding: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              type={Icons.Ionicons}
              name="reorder-three"
              color={Colors.primary}
              size={26}
              style={{padding: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default AppHeader;
