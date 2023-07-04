import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import { TextInput } from 'react-native-gesture-handler'
import AppColors from '../../../assets/colors/Appcolors'
import DrawerScreenswrapper from '../../drawer/DrawerScreenswrapper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle'

const ChangeNumber = ({navigation}) => {
  return (

    <View>
      <InnerScreensHeader navigation={navigation} screenName='Change number'/>
      <View style={{paddingHorizontal:wp('6%'),marginTop:hp('3%')}}>
      <Text style={{fontSize:wp('4.7%'),color:AppColors.black,fontFamily:FontStyle.mediumFont}}>Enter your old phone number with country code:</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput placeholder='+' underlineColorAndroid={AppColors.gray}
      style={{  }} />
        <TextInput placeholder='phone number'/>
      </View>
      <Text style={{fontSize:wp('4.7%'),color:AppColors.black,fontFamily:FontStyle.mediumFont}}>Enter your new phone number with country code:</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput placeholder='+'/>
        <TextInput placeholder='phone number'/>
      </View>
      </View>
      <View>
      <TouchableOpacity>
        <View style={{height:hp('6.5%'),width:wp('87%'),alignItems:'center',justifyContent:'center',borderRadius:wp('2%'),marginTop:wp('50%'),marginHorizontal:wp('6%'),backgroundColor:AppColors.primary}}>
          <Text style={{color:AppColors.white,fontSize:wp('7%'),fontFamily:FontStyle.regularFont}}>Next</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangeNumber