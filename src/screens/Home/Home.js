import React from 'react';
import { View } from 'react-native';
import Chats from './Chats';
import Colors from '../../assets/colors/Appcolors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //
import Ionicons from 'react-native-vector-icons/Ionicons'; //more
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Contacts
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Groups from './Groups';
import ChatBot from '../ChatBot';
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';


const Home = ({navigation}) => {

    const focusedIconColor = Colors.primary
    const inActiveIconKAColor = "grey"
    let iconSize = 24
    let inActiveTextColor = "purple"
    let activeTextColor = "grey"

    const Tab = createMaterialTopTabNavigator()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
              <AppHeader title={'ChatMe'} navigation={navigation} />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIndicatorStyle: { height: 2, backgroundColor: Colors.primary },
                    tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
                    tabBarActiveTintColor: activeTextColor,
                    tabBarInactiveTintColor: inActiveTextColor,        
                    tabBarStyle: { backgroundColor: "white", height: hp('6%') },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'rgba(255,255,255,0.8)',
                    tabBarPressColor: 'rgba(255,255,255,0.7)',

                    tabBarIcon: ({ focused }) => {

                        if (route.name === 'Chats') {
                            return (
                                <Ionicons
                                    name={'chatbubbles'}
                                    // name={'chatbubble-ellipses'}
                                    size={iconSize}
                                    color={focused ? focusedIconColor : inActiveIconKAColor}
                                />
                            );
                        } else if (route.name === 'Groups') {
                            return (
                                <MaterialIcons
                                    name={'groups'}
                                    size={iconSize}
                                    color={focused ? focusedIconColor : inActiveIconKAColor}
                                />
                            );
                        } else if (route.name === 'Bot') {
                            return (
                                <MaterialCommunityIcons
                                    // sound antdesign 
                                    // notifi
                                    name={'robot'}
                                    // name={'satellite-uplink'}
                                    size={iconSize}
                                    color={focused ? focusedIconColor : inActiveIconKAColor}
                                />
                            );
                        }
                        else if (route.name === 'Friends') {
                            return (
                                <MaterialCommunityIcons
                                    name={'account-heart'}
                                    size={iconSize}
                                    color={focused ? focusedIconColor : inActiveIconKAColor}
                                />
                            );
                        }
                    },

                })}
            >
                <Tab.Screen name="Chats" component={Chats} />
                <Tab.Screen name="Groups" component={Groups} />
                <Tab.Screen name="Bot" component={ChatBot} />
                
            </Tab.Navigator>

        </View>
    );
};

export default Home;