import React, { useContext } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View,StatusBar,useColorScheme } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader'
import FontStyle from '../../../assets/styles/FontStyle'
import AppColors from '../../../assets/colors/Appcolors'
import AppSubHeader from '../../../components/Headers/AppHeaders/AppSubHeader'
import Status_bar from '../../../components/Headers/Status_bar'
import AppContext from '../../../context/AppContext'

const Discussions = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const{darkThemeActivator,changeTheme}=useContext(AppContext);

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
        navigation.navigate('UserChat', { item: item })
      }}>
        <View style={{ height: hp('11%'), width: wp('100%'), }} >
          <View style={{ height: hp('11%'), width: wp('100%'), flexDirection: "row", alignItems: 'center' }}>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity>
                <Image source={item.dpImage} style={{ height: hp('6%'), width: hp('6%'), borderRadius: 100 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontFamily: FontStyle.regularFont, color: darkThemeActivator?AppColors.white: AppColors.black, fontSize: 17, }}>{item.profileName}</Text>
              <Text style={{ fontFamily: FontStyle.regularFont, color: darkThemeActivator?AppColors.lightwhite:AppColors.gray, fontSize: 11, }}>{item.lastMsg}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (

    <View style={{ height: hp('100%'), backgroundColor: darkThemeActivator?AppColors.darkTheme: AppColors.white }}>
      {/* <Status_bar darkModeBgColor={AppColors.black} lightModeBgColor={AppColors.white} darkModeContent={'light-content'} lightModeContent={'dark-content'} /> */}
      <StatusBar
        barStyle={darkThemeActivator ? 'light-content' : 'dark-content'}
        backgroundColor={darkThemeActivator?AppColors.darkTheme:AppColors.white}
      />
      <AppHeader navigation={navigation} headerTitle={"ChatMe"} />
      <AppSubHeader />
      <FlatList
        data={allChats}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Discussions