import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import AppColors from '../../assets/colors/Appcolors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppContext from '../../context/AppContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Avatar, Card, Divider } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import ReactNativeModal from 'react-native-modal';
import Containers from '../../assets/styles/Containers';
import SettingScreenStyle from '../../assets/styles/SettingScreenStyle';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import CustomDivider from '../../components/CustomDivider';

const Settings = ({ navigation }) => {
    const { theme, darkThemeActivator } = useContext(ThemeContext);
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const toggleModal = () => setVisible(!visible);
    const { language } = useContext(AppContext);
    const arrow_icon = 'chevron-right';
    const iconSize = wp('9%');
    const iconSizeSmall = wp('5%');
    const arrowColor = theme.profileNameColor;
    const arrowSize = 17;
    const textColor = theme.profileNameColor;


    return (
        <DrawerScreenswrapper>
            <InnerScreensHeader screenName={'Settings'} navigation={navigation} />
            <View style={SettingScreenStyle.container(theme.backgroundColor)}>
                {/* <Text style={SettingScreenStyle.sectionHeadText}>Security</Text> */}
                {/* Security */}
                <Card style={SettingScreenStyle.sectionsStyle(theme.backgroundColor)}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('changePassword');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="key"
                                style={{ backgroundColor: 'transparent' }}
                                color="steelblue"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Change Password</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('changeNumberInfo');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="account-convert"
                                style={{ backgroundColor: 'transparent' }}
                                color="green"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Change Number</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('blocked');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="block-helper"
                                style={{ backgroundColor: 'transparent' }}
                                color="red"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Blocked Contacts</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                    </TouchableOpacity>
                </Card>
                {/*  Account preferences */}
                <Card style={SettingScreenStyle.sectionsStyle(theme.backgroundColor)}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleModal();
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="palette"
                                style={{ backgroundColor: 'transparent' }}
                                color="fuchsia"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Theme</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('activity');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="play-circle"
                                style={{ backgroundColor: 'transparent' }}
                                color="lightseagreen"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>My Uploads</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('deleteAccount');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="delete"
                                style={{ backgroundColor: 'transparent' }}
                                color="red"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Delete Account</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                    </TouchableOpacity>
                </Card>
                {/*  App language */}
                <Card style={SettingScreenStyle.sectionsStyle(theme.backgroundColor)}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('appLanguage');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon={() => <Icons.SimpleLineIcons name="globe" size={iconSizeSmall} color="grey" />}
                                style={{ backgroundColor: "transparent" }}
                                color="grey"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>
                                    {language}{' '}
                                    {/*  TEXT DISPLAY ACCORDING TO SELECTED LANGUAGE */}
                                </Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('notification') }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="bell"
                                style={{ backgroundColor: 'transparent' }}
                                color="tomato"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Notifications</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Requests');
                        }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon={() => <Icons.MaterialCommunityIcons name="star" size={20} color="gold" />}
                                style={{ backgroundColor: 'transparent' }}
                                color="gold"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Requests</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>

                    </TouchableOpacity>
                </Card>
                {/* notifications */}
            </View>
            <View style={Containers.centercontent}>
                <ReactNativeModal
                    visible={visible}
                    onBackButtonPress={hideModal}
                    onDismiss={hideModal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={SettingScreenStyle.themeModal}
                >
                    <View style={SettingScreenStyle.modalView}>
                        <TouchableOpacity>
                            <Text style={SettingScreenStyle.themeModalText}>Dark Theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={SettingScreenStyle.themeModalText}>Light Theme</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>
            </View>
        </DrawerScreenswrapper>
    );
};

export default Settings;