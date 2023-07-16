import React, { useState } from 'react';
import { View ,Text,SafeAreaView,Image,ImageBackground,TouchableOpacity,TextInput} from "react-native";
import AfterSignUpStyleSheet from "../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet";
import Primary_StatusBar from "../../components/statusbars/Primary_StatusBar";
import Appcolors from "../../assets/colors/Appcolors";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icons } from "../../assets/Icons";
import { FloatingLabelInput } from 'react-native-floating-label-input';

const AfterSignUpProfileScreen = () =>{
  const [name, setName] = useState('');
  const [ques1 , setQues1] = useState('');
  const [ques2 , setQues2] = useState('');
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
       {/* ************************************************************************************************ */}

    
       {name=='' ? 
   <View style={AfterSignUpStyleSheet.floatingInputView}>
<FloatingLabelInput
  value={name}
  hintTextColor={Appcolors.gray}
  hint="Enter Your Name"
  containerStyles={AfterSignUpStyleSheet.floatingInputContainer}
  customLabelStyles={AfterSignUpStyleSheet.floatingCustomerLabel}
 
  inputStyles={AfterSignUpStyleSheet.floatingInputStyle}
  onChangeText={value => {
    setName(value);
  }}
/>
</View>

:

<View style={AfterSignUpStyleSheet.floatingInputView}>
<FloatingLabelInput
 staticLabel
  label="Name"
  labelStyles={AfterSignUpStyleSheet.floatingLabel}
  value={name}
 
  hintTextColor={Appcolors.gray}
  hint="Enter Your Name"
  containerStyles={AfterSignUpStyleSheet.floatingInputContainer}
  customLabelStyles={AfterSignUpStyleSheet.floatingCustomerLabel}
 
  inputStyles={AfterSignUpStyleSheet.floatingInputStyle}
  onChangeText={value => {
    setName(value);
  }}
/>
</View>
}


       {/* *************************************************************************************************** */}
       <Text style={AfterSignUpStyleSheet.Text2}>Security questions</Text>
       <View style={AfterSignUpStyleSheet.quesView}>
        <Text style={AfterSignUpStyleSheet.displyNameText}>Q1 : What is your favourite fruit?</Text>
        </View>
        <TextInput
        placeholder='Answer'
        value={ques1}
                style={AfterSignUpStyleSheet.TextInputContainer}
        onChangeText={value => {
          setQues1(value);
        }}
         />

<View style={AfterSignUpStyleSheet.quesView}>
        <Text style={AfterSignUpStyleSheet.displyNameText}>Q2 : What is your favourite game?</Text>
        </View>
        <TextInput
        placeholder='Answer'
        value={ques2}
                style={AfterSignUpStyleSheet.TextInputContainer}
        onChangeText={value => {
          setQues2(value);
        }}
         />

        </View>
        
          </SafeAreaView>
    )
}
export default AfterSignUpProfileScreen;