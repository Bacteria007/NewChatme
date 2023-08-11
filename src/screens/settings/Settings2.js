import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';

import React, { useState, useContext } from 'react';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import Modal from 'react-native-modal';

import DrawerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';

import AppColors from '../../assets/colors/Appcolors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppContext from '../../context/AppContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import GlobalFunction from '../../utils/GlobalFunc';
import { Avatar, Card, Divider, IconButton } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { Icons } from '../../assets/Icons';
import FontStyle from '../../assets/styles/FontStyle';
import SettingScreenStyle from '../../assets/styles/SettingScreenStyle';

const Settings2 = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const { language } = useContext(AppContext);
    const gloabalFunctions = GlobalFunction();
    const iconName = 'arrow-right';
    const iconSize = wp('9%');
    const iconSizeSmall = wp('5%');
    const iconColor = AppColors.black;
    const arrowSize = 17;
    const textColor = theme.profileNameColor;


    return (
        <DrawerScreenswrapper>
            <InnerScreensHeader screenName={'Settings'} navigation={navigation} />
            <View style={styles.container}>
                {/* <Text style={styles.sectionHeadText}>Security</Text> */}
                {/* Security */}
                <View style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('changePassword');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="key"
                                style={{ backgroundColor: 'transparent' }}
                                color="blue"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Change Password</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                        <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('changeNumberInfo');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="account-convert"
                                style={{ backgroundColor: 'transparent' }}
                                color="green"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Change Number</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                            <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('blocked');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="block-helper"
                                style={{ backgroundColor: 'transparent' }}
                                color="red"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Blocked Contacts</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {/*  Account preferences */}
                <View style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleModal();
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="palette"
                                style={{ backgroundColor: 'transparent' }}
                                color="orchid"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Theme</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                        <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('activit');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="activity"
                                style={{ backgroundColor: 'transparent' }}
                                color="green"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>My Activity</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                            <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('deleteAccount');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="delete"
                                style={{ backgroundColor: 'transparent' }}
                                color="red"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Delete Account</Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {/*  App language */}
                <View style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('appLanguage');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={6}
                                icon={()=><Icons.SimpleLineIcons name="globe" size={iconSizeSmall} color="blue" />}
                                style={{ backgroundColor: 'red' }}
                                color="blue"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>
                                    {language}{' '}
                                    {/*  TEXT DISPLAY ACCORDING TO SELECTED LANGUAGE */}
                                </Text>
                            </View>
                            <Icons.Entypo
                                name="chevron-right"
                                size={arrowSize}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerScreenswrapper>
    );
};

export default Settings2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.bgprimary,
        height: hp('100'),
        width: wp('100'),
    },
    sectionsStyle: {
        width: wp('100'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('97'),
        // backgroundColor:"orange",
        padding: 15,
    },
    itemName: color => ({
        fontFamily: FontStyle.regularFont,
        fontSize: 15,
        color: color,
        marginLeft: 10,
    }),
    sectionHeadText: {
        fontSize: wp('4%'),
        fontFamily: FontStyle.regularFont,
        color: AppColors.black,
    },
    dividerContainer: {
        paddingHorizontal: 15, // Add horizontal padding here
    },
});

