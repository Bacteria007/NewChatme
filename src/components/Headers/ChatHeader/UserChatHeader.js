import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
  

const UserChatHeader = ({item}) => {
  const navigation=useNavigation()
    // const {item}=props.route.params;
  return (
    <View style={[UserChatHeaderStyle.containerView]}>
    <View style={[UserChatHeaderStyle.headerView]}>
      <View style={[UserChatHeaderStyle.leftview]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chats')
            // props.navigation.navigate('Home');
          }}>
          <Icons.FontAwesome5
            name="arrow-left"
            size={wp('5.5%')}
            color="white"
            style={{marginTop: hp('2.7%')}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={[UserChatHeaderStyle.leftInnerView]}>
            <View style={[UserChatHeaderStyle.dpContainerView]}>
              <Image
                source={item.dpImage}
                style={[UserChatHeaderStyle.dpImageStyle]}
              />
            </View>
            <View style={[UserChatHeaderStyle.profileNameContainerStyle]}>
              <Text style={[UserChatHeaderStyle.profileNameTextStyle]}>{item.profileName}</Text>
              <Text style={[UserChatHeaderStyle.profileStatusStyle ]}>Online</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={[UserChatHeaderStyle.rightView]}>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Icons.FontAwesome5 name="video" size={wp('6%')} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Icons.FontAwesome
            name="phone"
            size={wp('7%')}
            color="white"
            style={{paddingLeft: wp('4%')}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={toggleModal}
          style={{alignSelf: 'center'}}>
          <Icons.Feather name="more-vertical" size={wp('7%')} color="white" />
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

  )
}

export default UserChatHeader