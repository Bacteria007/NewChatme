import React, { useState } from 'react';
import { View ,Text,SafeAreaView,Image,ImageBackground,TouchableOpacity} from "react-native";
import AfterSignUpStyleSheet from "../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet";
import Primary_StatusBar from "../../components/statusbars/Primary_StatusBar";
import Appcolors from "../../assets/colors/Appcolors";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Icons } from "../../assets/Icons";

const AfterSignUpProfileScreen = () =>{
  const [phone, setPhone] = useState('');
    return(
        <SafeAreaView style={AfterSignUpStyleSheet.container}>
        <Primary_StatusBar
          darkModeBgColor={'black'}
          lightModeBgColor={Appcolors.primary}
        />
  
        {/* *****************           HEADER OF  SCREEN   ************** */}
        <View style={AfterSignUpStyleSheet.TopView}>
          <View style={AfterSignUpStyleSheet.TopInnerView1}>
            <Image
              source={require('../../assets/imges/logo/logo.png')}
              style={AfterSignUpStyleSheet.LogoImageStyle}
            />
            <Text style={AfterSignUpStyleSheet.HeadingText1}> ChatMe</Text>
          </View>
          </View>
          <View style={AfterSignUpStyleSheet.BelowHeadercontainer}>
          <Text style={AfterSignUpStyleSheet.Text1}>Complete your profile</Text>
          <View
          style={AfterSignUpStyleSheet.ImageContainer}>
          <TouchableOpacity
            activeOpacity={0.9}  
            onPress={() => {
              console.log('Image Show');
            }}
            style={AfterSignUpStyleSheet.ImageBackTouchable}>
            <ImageBackground
              source={require('../../assets/imges/img2.png')}
              style={{
                height: hp('20%'),
                width: hp('20%'),
              }}
              imageStyle={{ borderRadius: 100 }}
              >
              {/* img k oper same size ka view ta k camera icon k view ko rotate kr k bottom right corner pr ly jaye*/}

             
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    console.log('Select from gallery');
                  }}
                >
                  {/* Icon ka view */}
                  <View
                    style={AfterSignUpStyleSheet.CameraIconView}>
                    <Icons.MaterialIcons
                      name="camera-alt"
                      size={23}
                      color="white"
                    />

                  </View>
                </TouchableOpacity>
                         </ImageBackground>
          </TouchableOpacity>
        </View>
      
        <Text style={AfterSignUpStyleSheet.displyNameText}>Enter your display name</Text>
        {/* *********************************************************************************************** */}

        <View style={{ padding: 50, flex: 1, backgroundColor: '#fff' }}>
      <FloatingLabelInput
        label="Phone"
        value={phone}
        staticLabel
        hintTextColor={'#aaa'}
        mask="99 (99) 99999-9999"
        hint="55 (22) 98765-4321"
        containerStyles={{
          borderWidth: 2,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderColor: 'blue',
          borderRadius: 8,
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          color: 'blue',
          paddingHorizontal: 10,
        }}
        onChangeText={value => {
          setPhone(value);
        }}
      />
    </View>

        {/* ************************************************************************************************ */}

        </View>
        
          </SafeAreaView>
    )
}
export default AfterSignUpProfileScreen;