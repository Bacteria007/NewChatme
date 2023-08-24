import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import React, { useState, useContext } from 'react';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';
import AppColors from '../../assets/colors/Appcolors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppContext from '../../context/AppContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Avatar, Card, Divider } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import FontStyle from '../../assets/styles/FontStyle';
import ReactNativeModal from 'react-native-modal';
import Containers from '../../assets/styles/Containers';

const Settings2 = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const toggleModal = () => setVisible(!visible);
    const { language } = useContext(AppContext);
    const arrow_icon = 'chevron-right';
    const iconSize = wp('9%');
    const iconSizeSmall = wp('5%');
    const arrowColor = AppColors.black;
    const arrowSize = 17;
    const textColor = theme.profileNameColor;


    return (
        <DrawerScreenswrapper>
            <InnerScreensHeader screenName={'Settings'} navigation={navigation} />
            <View style={styles.container}>
                {/* <Text style={styles.sectionHeadText}>Security</Text> */}
                {/* Security */}
                <Card style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('changePassword');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="key"
                                style={{ backgroundColor: 'transparent' }}
                                color="steelblue"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Change Password</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
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
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
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
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                    </TouchableOpacity>
                </Card>
                {/*  Account preferences */}
                <Card style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleModal();
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="palette"
                                style={{ backgroundColor: 'transparent' }}
                                color="fuchsia"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Theme</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                            <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('activity');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="play-circle"
                                style={{ backgroundColor: 'transparent' }}
                                color="lightseagreen"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>My Uploads</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
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
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                    </TouchableOpacity>
                </Card>
                {/*  App language */}
                <Card style={styles.sectionsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('appLanguage');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon={() => <Icons.SimpleLineIcons name="globe" size={iconSizeSmall} color="grey" />}
                                style={{ backgroundColor: "transparent" }}
                                color="grey"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>
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
                        <View style={styles.dividerContainer}>
                            <Divider />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('notification');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon="bell"
                                style={{ backgroundColor: 'transparent' }}
                                color="tomato"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Notifications</Text>
                            </View>
                            <Icons.Entypo
                                name={arrow_icon}
                                size={arrowSize}
                                color={arrowColor}
                            />
                        </View>
                        <View style={styles.dividerContainer}>
                            <Divider />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Requests');
                        }}>
                        <View style={styles.itemStyle}>
                            <Avatar.Icon
                                size={iconSize}
                                icon={() => <Icons.MaterialCommunityIcons name="star" size={20} color="gold" />}
                                style={{ backgroundColor: 'transparent' }}
                                color="gold"
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName(textColor)}>Requests</Text>
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
             style={{
               backgroundColor: "rgba(0,0,0,0.4)",
               margin: 0,
               justifyContent: 'center',
               height: hp('30'),alignSelf:'center'
             }}
            >
                <View style={styles.modalView}>
                <TouchableOpacity>
                    <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont,fontSize:17 }}>Dark Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color: AppColors.primary, fontFamily: FontStyle.regularFont,fontSize:17 }}>Light Theme</Text>
                </TouchableOpacity>
                </View>
            </ReactNativeModal>
            </View>
        </DrawerScreenswrapper>
    );
};

export default Settings2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: hp('100'),
        width: wp('100'),
        // justifyContent: 'center', 
        alignItems: 'center'

    },
    sectionsStyle: {
        width: wp('100'),
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // elevation: 2,
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
        // fontFamily: FontStyle.regularFont,
        fontSize: 15,
        color: color,
        marginLeft: 10,
    }),
    sectionHeadText: {
        fontSize: wp('4%'),
        // fontFamily: FontStyle.regularFont,
        color: AppColors.black,
    },
    dividerContainer: {
        paddingHorizontal: 15, // Add horizontal padding here
    },
    modalView: {
        backgroundColor: "#fff",
        height: hp('25'),
        width: wp('100'),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
      },
});

