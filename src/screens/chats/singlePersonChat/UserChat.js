import React, {useState} from 'react';
import {
  View,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,ImageBackground} from 'react-native';
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
// import AppColors from '../../asset/colors/AppColors';
// import Modal from 'react-native-modal';
import Colors from '../../../assets/colors/Appcolors';
import Status_bar from '../../../components/Headers/Status_bar';
import UserChatStyle from '../../../assets/styles/UserChatStyle';
import AppColors from '../../../assets/colors/Appcolors';
import UserChatHeader from '../../../components/Headers/ChatHeader/UserChatHeader';
import UserChatInput from '../../../components/ChatInput/UserChatInput';

const UserChat = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInnerModalVisible, setInnerModalVisible] = useState(false);
  const [outerModal, setOuterModal] = useState([
    {
      text: 'View contact',
    },
    {
      text: 'Media,links,and docs',
    },
    {
      text: 'search',
    },
    {
      text: 'Mute notifications',
    },
    {
      text: 'Disappearing messages',
    },
    {
      text: 'Wallpaper',
    },
    {
      text: 'More',
    },
  ]);
  const [innerModal, setInnerrModal] = useState([
    {
      text: 'Report',
    },
    {
      text: 'Block',
    },
    {
      text: 'Clear chat',
    },
    {
      text: 'Export chat',
    },
    {
      text: 'Add shortcut',
    },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleInnerModal = () => {
    setInnerModalVisible(!isInnerModalVisible);
  };

  const {item} = props.route.params;
  return (
<View styles={styles.contianer}>
      <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.linearGradient.blue} content={'light-content'}/>
      <ImageBackground source={require('../../../assets/imges/svgBackgroungs/chatswavy.png')} style={{height:hp('100%'),width:wp('100%')}} resizeMode='cover' blurRadius={10}>
      <UserChatHeader item={item} navigation={props.navigation}/>
      <UserChatInput/>
      {/* <View style={[UserChatStyle.containerView]}>
        <View style={[UserChatStyle.headerView]}>
          <View style={[UserChatStyle.leftview]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
              }}>
              <FontAwesome5
                name="arrow-left"
                size={wp('5.5%')}
                color="white"
                style={{marginTop: hp('2.7%')}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[UserChatStyle.leftInnerView]}>
                <View style={[UserChatStyle.dpContainerView]}>
                  <Image
                    source={item.dpImage}
                    style={[UserChatStyle.dpImageStyle]}
                  />
                </View>
                <View style={[UserChatStyle.profileNameContainerStyle]}>
                  <Text style={[UserChatStyle.profileNameTextStyle]}>{item.profileName}</Text>
                  <Text style={[UserChatStyle.profileStatusStyle ]}>Online</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[UserChatStyle.rightView]}>
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <FontAwesome5 name="video" size={wp('6%')} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <FontAwesome
                name="phone"
                size={wp('7%')}
                color="white"
                style={{paddingLeft: wp('4%')}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModal}
              style={{alignSelf: 'center'}}>
              <Feather name="more-vertical" size={wp('7%')} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          backdropColor="white"
          backdropOpacity={0}
          animationIn="zoomIn"
          animationOut={'zoomOutDown'}>
          <View
            style={{
              height: hp('40%'),
              width: wp('54%'),
              padding: wp('5%'),
              backgroundColor: 'white',
              position: 'absolute',
              top: hp('-1.7%'),
              right: wp('-3%'),
            }}>
            <FlatList
              data={outerModal}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: wp('4%'),
                        lineHeight: hp('4.5%'),
                        color: 'black',
                        fontFamily: FontStyle.lightFont,
                      }}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <Modal
              isVisible={isInnerModalVisible}
              onBackdropPress={() => {
                setInnerModalVisible(false);
              }}
              backdropColor="white"
              backdropOpacity={0}
              animationIn="zoomIn"
              animationOut={'zoomOutDown'}>
              <View
                style={{
                  height: hp('22%'),
                  width: wp('47%'),
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: hp('0%'),
                  right: wp('-3%'),
                }}>
                <FlatList
                  data={innerModal}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity>
                        <Text>{item.text}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </Modal>

            <TouchableOpacity onPress={toggleModal}>
              <FontAwesome name="close" size={wp('4%')} />
            </TouchableOpacity>
          </View>
        </Modal> */}
      {/* </View> */} 
      {/* <View
        style={[UserChatStyle.bottomActionContainerView]}>
        <View
          style={[UserChatStyle.bottomLeftContainer]}>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Entypo name="emoji-happy" size={wp('6.4%')} />
          </TouchableOpacity>
          <TextInput
            placeholder="Write a message"
            style={[UserChatStyle.textInputStyle]}
          />
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <FontAwesome name="paperclip" size={wp('6.5%')} />
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <FontAwesome name="camera" size={wp('5.5%')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View
            style={[UserChatStyle.microphoneContainerView]}>
            <FontAwesome name="microphone" size={wp('5.7%')} color={AppColors.white} />
          </View>
        </TouchableOpacity>
      </View> */}
      </ImageBackground>
      </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  contianer:{flex:1,justifyContent:'center',alignItems:'center' },
  header: {
    backgroundColor: Colors.primary,
    height: hp('8%'),
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: wp('5.5%'),
    color: 'white',
  },
});