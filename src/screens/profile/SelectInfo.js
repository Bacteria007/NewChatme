import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon, {Icons} from '../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/Appcolors';
import Modal from 'react-native-modal';
import AppContext from '../../context/AppContext';
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper';

const SelectInfo = ({
  iconName1,
  iconType1,
  title,
  subtitle,
  iconName2,
  props,
}) => {
  //'''''''''''''''

  // const deviceWidth = Dimensions.get("window").width;
  // const deviceHeight = Platform.OS === "ios"
  //   ? Dimensions.get("window").height
  //   : require("react-native-extra-dimensions-android").get(
  //       "REAL_WINDOW_HEIGHT"
  //     );

  // sizes
  const titlefontsize = wp('3.5%');
  const selectedinfofontsize = wp('4%');
  const modalfontsize = wp('4.6%');
  const subtitlefontsize = wp('3%');
  const iconSize = wp('5.5%');
  //colors
  const selectedTextColor = 'black';
  const titleTextColor = 'grey';
  //
  const {
    aboutOfUserProfile,
    storeUserAbout,
    userName,
    userPhoneNumber,
    storeUserName,
    storeUserPhone,
  } = useContext(AppContext);
  const [userinput, setUserinput] = useState('');
  const [isModalOpened, setIsModalOpened] = useState(false);
  return (
    // for other data and line
    <View>
      {/* for icons and other data */}
      <View style={{marginTop: wp('2.5%')}}>
        <TouchableOpacity
          //   activeOpacity={1}
          onPress={() => {
            if (title == 'About') {
              props.navigation.navigate('About');
            } else if (title == 'Phone') {
              props.navigation.navigate('Phone');
            } else if (title == 'Name') {
              setIsModalOpened(true);
            }
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Icon
              type={iconType1}
              name={iconName1}
              size={iconSize}
              color={titleTextColor}
              style={{marginLeft: wp('0.3%')}}
            />
            <View style={{flexDirection: 'column', width: wp('65%')}}>
              <Text style={{fontSize: titlefontsize, color: titleTextColor}}>
                {title}
              </Text>

              <>
                <Text
                  style={{
                    fontSize: selectedinfofontsize,
                    color: selectedTextColor,
                  }}>
                  {userName}
                </Text>
                <Text
                  style={{fontSize: subtitlefontsize, color: titleTextColor}}>
                  {subtitle}
                </Text>
              </>
            </View>

            <Icon
              type={Icons.MaterialCommunityIcons}
              name={iconName2}
              size={iconSize}
              color={titleTextColor}
              // style={{margin: 15}}
            />
          </View>
        </TouchableOpacity>

        <Modal
          onBackButtonPress={() => {
            setIsModalOpened(false);
          }}
          isVisible={isModalOpened}
          onBackdropPress={() => {
            setIsModalOpened(false);
          }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{
            backgroundColor: 'transparent',
            margin: 0,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: hp('25%'),
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontSize: modalfontsize,
                color: selectedTextColor,
                margin: wp('3%'),
              }}>
              Enter Your Name
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // padding: 10,
                // backgroundColor: 'orange',
                // width: wp('100%'),
                margin: wp('3%'),
              }}>
              <TextInput
                autoFocus={true}
                value={userinput}
                cursorColor={AppColors.primary}
                onChangeText={text => {
                  setUserinput(text);
                }}
                selectTextOnFocus={true}
                style={{
                  borderBottomWidth: wp('0.1%'),
                  borderBottomColor: AppColors.primary,
                  width: wp('86%'),
                  // padding: 5,
                }}
                placeholderTextColor={titleTextColor}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // backgroundColor:"blue",
                height: hp('6%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  // backgroundColor:"green",
                  width: wp('40%'),
                  // marginRight: wp('2%'),       //---------------YE
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalOpened(false);
                    storeUserName(userName);
                  }}
                  style={{
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: modalfontsize,
                      color: selectedTextColor,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalOpened(false);
                    storeUserName(userinput);
                  }}
                  style={{
                    // backgroundColor: 'yellow',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: modalfontsize,
                      color: selectedTextColor,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default SelectInfo;
