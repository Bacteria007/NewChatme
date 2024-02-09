import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppContext from '../../context/AppContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Avatar, Card, Divider, RadioButton } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import ReactNativeModal from 'react-native-modal';
import Containers from '../../assets/styles/Containers';
import SettingScreenStyle from '../../assets/styles/SettingScreenStyle';
import CustomDivider from '../../components/CustomDivider';

const Settings = ({ navigation }) => {
    const { theme, darkThemeActivator, setDarkTheme, setLightTheme, toggleTheme } = useContext(ThemeContext);
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const { language } = useContext(AppContext);
    const arrow_icon = 'chevron-right';
    const iconSize = wp('9%');
    const iconSizeSmall = wp('5%');
    const arrowColor = theme.profileNameColor;
    const arrowSize = 17;
    const textColor = theme.profileNameColor;
    const [value, setValue] = React.useState('first');


    return (
        <DrawerScreenswrapper>
            <InnerScreensHeader screenName={'Settings'} navigation={navigation} />
            <View style={SettingScreenStyle.container(theme.backgroundColor)}>
                {/* <Text style={SettingScreenStyle.sectionHeadText}>Security</Text> */}
                {/* Security */}
                <Card style={SettingScreenStyle.sectionsStyle(theme.backgroundColor)}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SettingStack', { screen: 'changePassword' });
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
                            navigation.navigate("SettingStack",{screen:'changeNumberInfo'});
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
                            navigation.navigate("SettingStack",{screen:'blocked'});
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
                            showModal()
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
                            navigation.navigate("SettingStack",{screen:'activity'});
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
                            navigation.navigate("SettingStack",{screen:'deleteAccount'});
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
                            navigation.navigate("SettingStack",{screen:'appLanguage'});
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
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SettingStack",{screen:'Requests'});
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
                        {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        }

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("SettingStack",{screen:'Friends'}) }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon={() => (
                                    <Icons.FontAwesome5 name="user-friends" size={iconSize/3} color={"blue"} />
                                  )}
                                style={{ backgroundColor: 'transparent' }}
                                color="tomato"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Friends</Text>
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
                    <TouchableOpacity onPress={() => { navigation.navigate("SettingStack",{screen:'help'}) }}>
                        <View style={SettingScreenStyle.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="help-with-circle"
                                style={{ backgroundColor: 'transparent' }}
                                color="tomato"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={SettingScreenStyle.itemName(textColor)}>Help</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        {/* {darkThemeActivator ? <CustomDivider /> :
                            <View style={SettingScreenStyle.dividerContainer}>
                                <Divider />
                            </View>
                        } */}
                    </TouchableOpacity>
                </Card>
                {/* notifications */}


            </View>
            <View style={Containers.centercontent}>
                <ReactNativeModal
                    isVisible={visible}
                    onBackButtonPress={hideModal}
                    onDismiss={hideModal}
                    animationIn="fadeInDown"
                    onBackdropPress={hideModal}
                    style={SettingScreenStyle.themeModal}
                >
                    <View style={SettingScreenStyle.modalView}>
                        <View style={SettingScreenStyle.modalTitleView}>
                            <Text style={SettingScreenStyle.modalTitle}>Choose Theme</Text>
                        </View>
                        <View style={SettingScreenStyle.radioBtnsView}>
                            {/* <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}> */}
                            <TouchableOpacity onPress={() => {
                                setLightTheme();
                                hideModal();
                            }}>
                                <View style={SettingScreenStyle.btnAndTextView}>
                                    <RadioButton value="first" status={darkThemeActivator ? 'unchecked' : 'checked'} onPress={() => {
                                        setLightTheme();
                                        hideModal();
                                    }} />
                                    <Text style={SettingScreenStyle.themeModalText}>Light Theme</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setDarkTheme();
                                hideModal();
                            }}>
                                <View style={SettingScreenStyle.btnAndTextView}>
                                    <RadioButton value="second" status={!darkThemeActivator ? 'unchecked' : 'checked'} onPress={() => {
                                        setDarkTheme();
                                        hideModal();
                                    }} />
                                    <Text style={SettingScreenStyle.themeModalText}>Dark Theme</Text>
                                </View>
                            </TouchableOpacity>
                            {/* </RadioButton.Group> */}
                        </View>
                    </View>
                </ReactNativeModal>
            </View>
        </DrawerScreenswrapper>
    );
};

export default Settings;

{/* <TouchableOpacity onPress={() => {
                            setDarkTheme();
                            hideModal();
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                <Text style={SettingScreenStyle.itemName(theme.profileNameColor)}>Dark Theme</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setLightTheme();
                            hideModal();
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            </View>
                        </TouchableOpacity> */}
{/* <Image source={require('../../assets/imges/theme/darkTheme.jpg')} style={{ height: hp('45'), width: wp('45') }} resizeMode='cover'/> */ }
{/* <Image source={require('../../assets/imges/theme/lightTheme.jpg')} style={{ height: hp('45'), width: wp('45') }} resizeMode='cover'/> */ }
