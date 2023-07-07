import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader'
import FontStyle from '../../../assets/styles/FontStyle'
import AppColors from '../../../assets/colors/Appcolors'
import AppSubHeader from '../../../components/Headers/AppHeaders/AppSubHeader'
import Status_bar from '../../../components/Headers/Status_bar'
import DrawerScreenswrapper from '../../drawer/DrawerScreenswrapper'
// import AppHeader from './AppHeader'


const Discussions = ({ navigation }) => {


  const allChats = [
    { dpImage: require('../../../assets/imges/w11.jpg'), profileName: 'Aqsa', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/w11.jpg'), profileName: 'Aqsa', lastMsg: 'Hello Afshan', },

    { dpImage: require('../../../assets/imges/girlGuitar.jpg'), profileName: 'Afshan', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/mic.jpg'), profileName: 'Hina', lastMsg: 'Hello Afshan', },

    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
    { dpImage: require('../../../assets/imges/bacteria.jpeg'), profileName: 'Rabia', lastMsg: 'Hello Afshan', },
  ]

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('rejected', { item: item })
      }}>
        <View style={{ height: hp('11%'), width: wp('100%'), }} >
          <View style={{ height: hp('11%'), width: wp('100%'), flexDirection: "row", alignItems: 'center' }}>
            <View style={{ marginLeft: 10 }}><TouchableOpacity><Image source={item.dpImage} style={{ height: hp('6%'), width: wp('12%'), borderRadius: 25 }} /></TouchableOpacity></View>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontFamily: FontStyle.regularFont, color: AppColors.black, fontSize: 17, }}>{item.profileName}</Text>
              <Text style={{ fontFamily: FontStyle.regularFont, color: 'grey', fontSize: 11, }}>{item.lastMsg}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (

      <View style={{ height: hp('100%'), backgroundColor:AppColors.white }}>
        <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.white} darkModeContent={'light-content'} lightModeContent={'dark-content'}/>
        <AppHeader navigation={navigation} />
        <AppSubHeader />
        <FlatList
          data={allChats}
          renderItem={renderItem}
        />
      </View>
  )
}

export default Discussions