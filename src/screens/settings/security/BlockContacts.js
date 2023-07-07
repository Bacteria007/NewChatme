import { View, Text,FlatList,Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppColors from '../../../assets/colors/Appcolors'
import Modal from 'react-native-modal'

const BlockContacts = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const toggleModal=()=>{
    setIsModalVisible(!isModalVisible)
  }
  const [blockedContacts, setBlockedContacts] = useState(  [  { dpImage: require('../../../assets/imges/w11.jpg'), profileName: 'Aqsa' },
  { dpImage: require('../../../assets/imges/w11.jpg'), profileName: 'Aqsa' },

  { dpImage: require('../../../assets/imges/girlGuitar.jpg'), profileName: 'Afshan' },
  { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina' },
  { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina' },

  { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', },
  { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia',},
  { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', },
  { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia',  },
]
)
  return (
    <View style={{backgroundColor:AppColors.white,flex:1}}>
      <InnerScreensHeader navigation={navigation} screenName='Blocked contacts'/>
      <View style={{padding:wp('3%')}}>
      <Text style={{fontSize:wp('5%'),color:AppColors.black}}>Contacts</Text>
      <FlatList 
      data={blockedContacts}
      renderItem={({item})=>{
        return(
          <TouchableOpacity onPress={()=>{
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
            <View style={{backgroundColor:AppColors.white,height:hp('7%'),paddingHorizontal:wp('3%'),justifyContent:'center'}}>
            <Text style={{fontSize:wp('5%'),color:AppColors.black}}>Unblock {item.profileName}</Text>
            </View>
          </Modal>
            <View style={{flexDirection:'row',width:wp('100%'),alignItems:'center',padding:wp('2%')}}>
              <Image source={item.dpImage} style={{height:hp('6%'), width: wp('12%'), borderRadius: 25}}/>
              <Text style={{fontSize:wp('6%'),color:AppColors.black,paddingLeft:wp('3%')}}>{item.profileName}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
      />
      </View>
    </View>
  )
}

export default BlockContacts