import React from 'react'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontStyle from '../../assets/styles/FontStyle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Waves from '../../assets/imges/svgBackgroungs/wwwhirl.svg'
const Calls = ({ navigation }) => {
  return (

    <View style={styles.wholeContainer}>
      <ImageBackground source={require('../../assets/imges/svgBackgroungs/ss.png')} resizeMethod='resize' resizeMode='cover' style={{ height: hp('100%'), width: wp('100%') }}>
        <AppHeader navigation={navigation} headerTitle={"Calls"} />

      </ImageBackground>

    </View>
  )
}

export default Calls
const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1
  },
  textstyle: {
    fontSize: 20, fontFamily: FontStyle.boldItalicFont, color: 'white'
  }
})