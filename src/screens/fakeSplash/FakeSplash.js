import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AppColors from '../../assets/colors/Appcolors'
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import axios from 'axios';
import {Primary_StatusBar} from '../../components/statusbars/Primary_StatusBar';


const FakeSplash = ({navigation}) => {
      const {updateCurrentUser,updateToken,baseUrl} = useContext(AppContext);

      const checkUserStatus=async()=>{
        const currentUserStatus= await AsyncStorage.getItem('isUserLoggedIn')
        const storedToken = await AsyncStorage.getItem('token');
        const profileImage=await AsyncStorage.getItem('profileImage')
       const name=await AsyncStorage.getItem('name')
       const Id=await AsyncStorage.getItem('Id')
       const phoneNo=await AsyncStorage.getItem('phoneNo')
       const isSignupProccessComplete=await AsyncStorage.getItem('isSignupProccessComplete')
        console.log("splash",currentUserStatus)
        console.log("splash isSignupProccessComplete",isSignupProccessComplete)
        
        if(currentUserStatus==='true'){
          console.log("async sy user true check kia", `Bearer ${storedToken}` )
          if (storedToken) {
            // Verify token with server
            console.log("token",storedToken)
            try {
              await axios.post(`${baseUrl}/verify`, {},{
                headers: { Authorization: `Bearer ${storedToken}` }
              }).then(function(response){
                if(response.data.matched==true && isSignupProccessComplete=='true'){
                  console.log("if cond both true")
                  updateCurrentUser({userId: Id, phoneNumber: phoneNo, profileImage: profileImage, name:name})
                  updateToken(storedToken)
                  navigation.replace('DrawerStack');

                }else if(isSignupProccessComplete=='false'){
                  console.log("elseif cond isSignupProccessComplete false")
                  updateCurrentUser({userId: Id, phoneNumber: phoneNo, profileImage: profileImage, name:name})
                  updateToken(storedToken)
                  navigation.replace('AfterSignUpProfileScreen');
                }
                else{
                  console.log('signup process not performed');
              navigation.replace('LogInScreen');
                }
              })
            } catch (error) {
              console.log('Auto-login failed:', error);
              navigation.replace('LogInScreen');
            }
          }
          else{
            console.log("async sy user true check kia lkn token nai")
            navigation.replace('LogInScreen');
          }
      }
      else {
          console.log("async sy user false check kia")
          navigation.replace('LogInScreen');
      }
      }
      useEffect(()=>{
        checkUserStatus()        
    },[]);
  return (
    <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:AppColors.white}}>
      <Primary_StatusBar />
      <Lottie source={require('../../assets/animations/Lottieanimations/Splash.json')} autoPlay loop style={{ height: wp('50%'), width: wp("50%") }} />
      <Text style={{fontSize:wp('6%'),fontFamily:FontStyle.mediumFont,color:AppColors.purple,marginTop:hp('-5%')}}>ChatMe</Text>
    </View>
  )
}

export default FakeSplash;