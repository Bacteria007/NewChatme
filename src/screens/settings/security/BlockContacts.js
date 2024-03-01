import { View, Text, FlatList, Image, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppColors from '../../../assets/colors/Appcolors'
import Modal from 'react-native-modal'
import AppContext from '../../../context/AppContext'
import FontStyle from '../../../assets/styles/FontStyle'
import Containers from '../../../assets/styles/Containers'
import LottieView from 'lottie-react-native'
import { useWorkletCallback } from 'react-native-reanimated'
import { ThemeContext } from '../../../context/ThemeContext'
import TranslationFile from '../../../assets/translation/TranslationFile'

const BlockContacts = ({ navigation }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { baseUrl, currentUser, token ,language} = useContext(AppContext);
  const { theme,darkThemeActivator } = useContext(ThemeContext);
  const [selectedContact, setSelectedContact] = useState(null);
  const [blockedContactList, setBlockedContactList] = useState([]);

  const fetchBlockContactList = async () => {

    console.log("discussion ma ", currentUser.userId)
    try {
      const response = await fetch(`${baseUrl}/viewBlockedContacts?userId=${currentUser.userId}`, {
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
    const formData = new FormData();
    formData.append('senderId', currentUser.userId);
    formData.append('chatId', item.chatId);
    formData.append('receiverId', item.blockedId);
  
    try {
      const response = await fetch(`${baseUrl}/unBlockUser`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.message == 'Please provide a valid token.') {
        Alert.alert('Provide a valid token.');
      } else if (data.message == 'Please provide a token.') {
        Alert.alert('Token required');
      } 
      if (data.msg=='user unBlocked successfuly') {
        console.log("user unblocked")
        ToastAndroid.showWithGravity('unblocked successfully.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        removeBlockedContact(item)
        setIsModalVisible(false)
      } else {
        console.log("user not unblocked")
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
    <View style={BlockedScreenStyle.container(theme.backgroundColor)}>
      <InnerScreensHeader navigation={navigation} screenName={TranslationFile[language].Blocked_contacts} />
      <View style={BlockedScreenStyle.itemListView}>
        {blockedContactList.length != 0 ?
          <FlatList
            data={blockedContactList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  setSelectedContact(item);
                  toggleModal()
                }}
                >
                  <Modal isVisible={isModalVisible&& selectedContact === item}
                    onBackdropPress={() => {
                      setIsModalVisible(false);
                      setSelectedContact(null)
                    }}
                    style={{}}
                    backdropColor={AppColors.black}
                    backdropOpacity={0.1}
                    coverScreen={true}
                    animationIn="zoomIn"
                    animationOut={'zoomOut'}>
                    <View style={BlockedScreenStyle.modalView}>
                      <TouchableOpacity onPress={() => { unblockContact(item) }}>
                        <Text style={BlockedScreenStyle.unBlockBtn}>{TranslationFile[language].Unblock} {item.contactData.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <View style={BlockedScreenStyle.dpAndNameContainer}>
                    <Image source={{ uri: `${baseUrl}${item.contactData.profileImage}` }} style={BlockedScreenStyle.imageStyle} />
                    <Text style={BlockedScreenStyle.nameStyle(darkThemeActivator?AppColors.lightwhite:"black")}>{item.contactData.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          :
          <View>
            <Text style={BlockedScreenStyle.noContactText}>{TranslationFile[language].No_Blocked_Contacts}</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default BlockContacts

const BlockedScreenStyle = StyleSheet.create({
  container: (bgClr)=>({ backgroundColor: bgClr, flex: 1 }),
  noContactText: {
    color: AppColors.gray,
    fontSize: wp('4'),
    textAlign: 'center',
    fontFamily: FontStyle.regularFont,
    letterSpacing: 1,
  },
  itemListView: {
    padding: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  unBlockBtn: { fontSize: wp('5%'), color: AppColors.black },
  modalView: {
    backgroundColor: AppColors.white,
    height: hp('7%'),
    paddingHorizontal: wp('3%'),
    justifyContent: 'center',
  },
  dpAndNameContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    alignItems: 'center',
    padding: wp('2%'),
  },
  imageStyle: { height: hp('6%'), width: wp('12%'), borderRadius: 25 },
  nameStyle: (clr)=>({
    fontSize: wp('6%'),
    color: clr,
    paddingLeft: wp('3%'),
  }),
});