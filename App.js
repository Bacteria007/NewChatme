import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// SCREENS
import Home from './src/screens/Home/Home';
import Reels from './src/screens/Reels/Reels';
import Contacts from './src/screens/Contact/Contacts';
import Calls from './src/screens/Calls/Calls';
import Colors from './src/assets/colors/Appcolors';
// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // add call SimpleLineIcons call-in out
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //more
import Ionicons from 'react-native-vector-icons/Ionicons'; //more
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import Drawer from './src/components/Drawer/Drawer';
import UserChat from './src/screens/chats/UserChat';
import Chats from './src/screens/Home/Chats';
import { AppProvider } from './src/context/AppContext';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const NavScreens=()=>{
//   <Stack.Navigator>
//     <Stack.Screen name='Bot' component={<ChatBot/>}/>
//   </Stack.Navigator>
// }

const App = ({navigation}) => {

  let focusedIconColor = Colors.primary;
  let inActiveIconKAColor = 'rgba(0,0,0,0.4)';
  let activeTextColor = Colors.primary;
  let inActiveTextColor = inActiveIconKAColor;
  let iconSize = 22;

  const TabScreens=()=>{
    return(
      <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIndicatorStyle: { height: hp('1%'), backgroundColor: 'white' },
      tabBarStyle: { backgroundColor: Colors.white, height: hp('7%') },
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
      tabBarItemStyle: { fontWeight: 'bold', fontSize: 12, color: activeTextColor },
      tabBarActiveTintColor: activeTextColor,
      tabBarInactiveTintColor: inActiveTextColor,
      tabBarHideOnKeyboard:'true',
      tabBarPressColor: 'rgba(255,255,255,0.7)',
      tabBarIcon: ({ focused }) => {
        if (route.name === 'Chats') {
          return (
            <FontAwesome
              name={'home'}
              size={iconSize}
              color={focused ? focusedIconColor : inActiveIconKAColor}
            />
          );
        } else if (route.name === 'Calls') {
          return (
            <Ionicons
              name={'call'}
              size={iconSize}
              color={focused ? focusedIconColor : inActiveIconKAColor}
            />
          );
        } else if (route.name === 'Contacts') {
          return (
            // materialicon antdesign contacts
            <MaterialIcons
              // sound antdesign
              // notifi
              name={'contacts'}
              size={iconSize}
              color={focused ? focusedIconColor : inActiveIconKAColor}
            />
          );
        } else if (route.name === 'Reels') {
          return (
            <FontAwesome5
              name={'stream'}
              size={iconSize}
              color={focused ? focusedIconColor : inActiveIconKAColor}
            />
          );
        }
      },
    })}>
    <Tab.Screen name="Chats" component={Chats} />
    <Tab.Screen name="Calls" component={Calls} />
    <Tab.Screen name="Reels" component={Reels} />
    <Tab.Screen name="Contacts" component={Contacts} />
  </Tab.Navigator>

    )
  }
  const Discussion=()=>{
    return (
      <Stack.Navigator 
      screenOptions={{
        headerShown:false
      }} initialRouteName="Chats">
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="UserChat" component={UserChat} />
      </Stack.Navigator>
      
    );
  };
  
  return (<AppProvider>
    {/* <View style={{ flex: 1, backgroundColor: 'white' }}> */}

      {/* <AppHeader title={'ChatMe'} navigation={navigation} /> */}

      <NavigationContainer >
        <Stack.Navigator options={{headerShown:false}}> 
           {/* <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown:false}}/> */}
           <Stack.Screen name='TabScreen' component={TabScreens} options={{headerShown:false}}/>
           <Stack.Screen name='Drawer' component={Drawer} options={{headerShown:false}}/>
           {/* <Stack.Screen name='Discussion' component={Discussion} options={{headerShown:false}}/> */}
           {/* <Stack.Screen name="Chats" component={Chats} />/ */}
          <Stack.Screen name="UserChat" component={UserChat} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    {/* </View> */}
    </AppProvider>
  );
};


export default App;
