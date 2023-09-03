import { View, Text, FlatList, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppColors from '../../../assets/colors/Appcolors'
import Modal from 'react-native-modal'
import AppContext from '../../../context/AppContext'
import FontStyle from '../../../assets/styles/FontStyle'
import Containers from '../../../assets/styles/Containers'
import LottieView from 'lottie-react-native'

const BlockContacts = ({ navigation }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { baseUrl, currentUser, token } = useContext(AppContext);

  const [blockedContactList, setBlockedContactList] = useState([]);

  const fetchBlockContactList = async () => {

    console.log("discussion ma ", currentUser.userId)
    try {
      const response = await fetch(`${baseUrl}/blockedContactList?userId=${currentUser.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      console.log('item.contactData.name from server', data)
      setBlockedContactList(data);
    } catch (error) {
      console.error('Error fetching contact list:', error);
    }
  }
  const unblockContact = async (item) => {
    console.log("unblock item ==>>", item)
    try {
      const response = await fetch(`${baseUrl}/unblockContact?userId=${currentUser.userId}&friendId=${item.contactData._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json();
        console.log("contact unblocked successfully", data);
        item.isFriend = true
        item.isBlocked = false
        ToastAndroid.showWithGravity('unblocked successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        removeBlockedContact(item)
        // navigation.replace('DrawerScreens')
      } else {
        console.log('Error un blocking contact:', response.status);
        ToastAndroid.showWithGravity('cannot unblocked', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    } catch (error) {
      console.error('Error blocking contact: ', error);
    }

  }
  const removeBlockedContact = (contactToRemove) => {
    setBlockedContactList((prevList) =>
      prevList.filter((contact) => contact.contactData._id !== contactToRemove.contactData._id)
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  // HOOKS
  useEffect(() => { fetchBlockContactList() }, [])
  return (
    <View style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <InnerScreensHeader navigation={navigation} screenName='Blocked contacts' />
      <View style={{ padding: wp('3%'), justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {blockedContactList.length != 0 ?
          <FlatList
            data={blockedContactList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  toggleModal()
                }}
                >
                  <Modal isVisible={isModalVisible}
                    onBackdropPress={() => {
                      setIsModalVisible(false);
                    }}
                    style={{}}
                    backdropColor={AppColors.black}
                    backdropOpacity={0.1}
                    coverScreen={true}
                    animationIn="zoomIn"
                    animationOut={'zoomOut'}>
                    <View style={{ backgroundColor: AppColors.white, height: hp('7%'), paddingHorizontal: wp('3%'), justifyContent: 'center' }}>
                      <TouchableOpacity onPress={() => { unblockContact(item) }}>
                        <Text style={{ fontSize: wp('5%'), color: AppColors.black }}>Unblock {item.contactData.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <View style={{ flexDirection: 'row', width: wp('100%'), alignItems: 'center', padding: wp('2%') }}>
                    <Image source={{ uri: `${baseUrl}${item.contactData.profileImage}` }} style={{ height: hp('6%'), width: wp('12%'), borderRadius: 25 }} />
                    <Text style={{ fontSize: wp('6%'), color: AppColors.black, paddingLeft: wp('3%') }}>{item.contactData.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          :
          <View>
            {/* <LottieView source={require('../../../assets/animations/Lottieanimations/l12.json')} autoPlay style={{
              height: hp('20'),
              width: wp('60'),
              // justifyContent: 'center',
              // alignItems: 'center',
            }} /> */}
            <Text style={{ color: AppColors.primary, fontSize: 20, textAlign: 'center', fontFamily: FontStyle.mediumFont,letterSpacing:1 }}>No Blocked Contacts.</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default BlockContacts