import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import DrawerScreenswrapper from '../drawer/DrawerScreenswrapper'
import DrawerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader'
import AppColors from '../../assets/colors/Appcolors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle'
import { Icons } from '../../assets/Icons'

const Settings = ({navigation}) => {
  return (
    <DrawerScreenswrapper>
    <View style={{height:hp('100'),backgroundColor:AppColors.white}}>
      <DrawerScreensHeader navigation={navigation} screenName='Settings'/>
      <View style={{height:hp('80%'),justifyContent:'space-evenly'}}>
      <View style={{backgroundColor:AppColors.white}}>
          <Text style={{fontSize:wp('6%'),fontFamily:FontStyle.mediumFont,paddingHorizontal:wp('4%'),color:AppColors.black}}>Security</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('blocked')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Block Contact</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('changePassword')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Change Password</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('changeNumberInfo')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Change Number</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
      </View>
      <View style={{backgroundColor:AppColors.white}}>
          <Text style={{fontSize:wp('6%'),fontFamily:FontStyle.mediumFont,paddingHorizontal:wp('4%'),color:AppColors.black}}>Account preferences</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('theme')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Theme</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('activity')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>My Activity</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('deleteAccount')
          }}>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Delete Account</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
      </View>
      <View style={{backgroundColor:AppColors.white}}>
          <Text style={{fontSize:wp('6%'),fontFamily:FontStyle.mediumFont,paddingHorizontal:wp('4%'),color:AppColors.black}}>App Language</Text>
          <TouchableOpacity>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>English</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
      </View>
      <View style={{backgroundColor:AppColors.white}}>
          <Text style={{fontSize:wp('6%'),fontFamily:FontStyle.mediumFont,paddingHorizontal:wp('4%'),color:AppColors.black}}>Notifications</Text>
          <TouchableOpacity>
          <View style={{flexDirection:'row',height:hp('6%'),justifyContent:'space-between',paddingHorizontal:wp('4%'),alignItems:'center',borderBottomWidth:wp('0.1%')}}>
          <Text style={{fontSize:wp('4.5%'),fontFamily:FontStyle.regularFont,color:AppColors.black}}>Notifications</Text>
          <Icons.FontAwesome5
            name="arrow-right"
            size={wp('5.5%')}
            color={AppColors.black}
          />
          </View>
          </TouchableOpacity>
      </View>
    </View>
    </View>
    </DrawerScreenswrapper>
  )
}

export default Settings