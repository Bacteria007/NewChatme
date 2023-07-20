import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState,useContext } from 'react';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';


const UserChatHeader = ({ item, navigation }) => {
//  const { videoCall,storeVideoCall} = useContext(AppContext);
const [videoCall , setVideoCall] = useState(false)
 const connectionData = {
  appId: '83d6cd3997e244c9bb3aa8c280fde5f4',
  channel: 'chatme-room',
};
  const rtcCallbacks = {
    EndCall: () => {setVideoCall(false)
      navigation.navigate('UserChat', { item: item });
    }

  };
  
  // const {item}=props.route.params;
  return (
    <View style={[UserChatHeaderStyle.containerView]}>
      <View style={[UserChatHeaderStyle.headerView]}>
        <View style={[UserChatHeaderStyle.leftview]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icons.FontAwesome5
              name="arrow-left"
              size={wp('5.5%')}
              color={AppColors.black}
              style={{ marginTop: hp('2.7%') }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[UserChatHeaderStyle.leftInnerView]}>
              <View style={[UserChatHeaderStyle.dpContainerView]}>
                <Image
                  source={item.dpImage}
                  style={[UserChatHeaderStyle.dpImageStyle]}
                />
              </View>
              <View style={[UserChatHeaderStyle.profileNameContainerStyle]}>
                <Text style={[UserChatHeaderStyle.profileNameTextStyle]}>
                  {item.profileName}
                </Text>
                <Text style={[UserChatHeaderStyle.profileStatusStyle]}>
                  Online
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[UserChatHeaderStyle.rightView]}>
          {videoCall ?
           (navigation.navigate('videoCal',{rtcCallbacks,connectionData})
          ) : (
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => {
                setVideoCall(true);
              }}>
              <Icons.FontAwesome5
                name="video"
                size={wp('6%')}
                color={AppColors.black}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('rejected', { item: item });
            }}
            style={{ alignSelf: 'center' }}>
            <Icons.FontAwesome
              name="phone"
              size={wp('7%')}
              color={AppColors.black}
              style={{ paddingLeft: wp('4%') }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={toggleModal}
            style={{ alignSelf: 'center' }}>
            <Icons.Feather
              name="more-vertical"
              size={wp('7%')}
              color={AppColors.black}
            />
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
    </View>
  );
};

export default UserChatHeader;
