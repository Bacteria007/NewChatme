import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,PermissionsAndroid
} from 'react-native';
import AfterSignUpStyleSheet from '../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet';
import Primary_StatusBar from '../../components/statusbars/Primary_StatusBar';
import Appcolors from '../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import TranslationFile from '../../assets/translation/TranslationFile';
import AppContext from '../../context/AppContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { requestCameraPermission } from '../../components/Permission/Permission';

const AfterSignUpProfileScreen = ({ navigation }) => {
  const { language } = useContext(AppContext);
  const [name, setName] = useState('');
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  
  
  


  return (
    <SafeAreaView style={AfterSignUpStyleSheet.container}>
      <Primary_StatusBar
        darkModeBgColor={'black'}
        lightModeBgColor={Appcolors.primary}
      />

      {/* ***************** HEADER OF SCREEN ************** */}
      <View style={AfterSignUpStyleSheet.TopView}>
        <View style={AfterSignUpStyleSheet.TopInnerView1}>
          <Image
            source={require('../../assets/imges/logo/logo.png')}
            style={AfterSignUpStyleSheet.LogoImageStyle}
          />
          <Text style={AfterSignUpStyleSheet.HeadingText1}>
            {' '}
            {TranslationFile[language].ChatMe}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={AfterSignUpStyleSheet.BelowHeadercontainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset based on your requirement
      >
        <ScrollView
          contentContainerStyle={AfterSignUpStyleSheet.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* <Text style={AfterSignUpStyleSheet.Text1}>
            {TranslationFile[language].Complete_your_profile}
          </Text> */}
          <View style={AfterSignUpStyleSheet.ImageContainer}>
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
                imageStyle={{ borderRadius: 100 }}>
                {/* img k oper same size ka view ta k camera icon k view ko rotate kr k bottom right corner pr ly jaye*/}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    requestCameraPermission() 
                    launchCamera(
                      {
                        mediaType: 'photo',
                        // Other options if needed
                      },
                      response => {
                        console.log('Camera Access');
                      }
                    );
                    }}>
                  {/* Icon ka view */}
                  <View style={AfterSignUpStyleSheet.CameraIconView}>
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

          <Text style={AfterSignUpStyleSheet.displyNameText}>
            {TranslationFile[language].Enter_your_display_name}
          </Text>

          {/* ************************************************************************************************ */}

          {name == '' ? (
            <View style={AfterSignUpStyleSheet.floatingInputView}>
              <FloatingLabelInput
                value={name}
                hintTextColor={Appcolors.gray}
                hint={TranslationFile[language].Enter_Your_Name}
                containerStyles={AfterSignUpStyleSheet.floatingInputContainer}
                customLabelStyles={AfterSignUpStyleSheet.floatingCustomerLabel}
                inputStyles={AfterSignUpStyleSheet.floatingInputStyle}
                onChangeText={value => {
                  setName(value);
                }}
              />
            </View>
          ) : (
            <View style={AfterSignUpStyleSheet.floatingInputView}>
              <FloatingLabelInput
                staticLabel
                label={TranslationFile[language].Name}
                labelStyles={AfterSignUpStyleSheet.floatingLabel}
                value={name}
                hintTextColor={Appcolors.gray}
                hint={TranslationFile[language].Enter_Your_Name}
                containerStyles={AfterSignUpStyleSheet.floatingInputContainer}
                customLabelStyles={AfterSignUpStyleSheet.floatingCustomerLabel}
                inputStyles={AfterSignUpStyleSheet.floatingInputStyle}
                onChangeText={value => {
                  setName(value);
                }}
              />
            </View>
          )}

          {/* *************************************************************************************************** */}
          <Text style={AfterSignUpStyleSheet.Text2}>
            {TranslationFile[language].Security_questions}
          </Text>
          <View style={AfterSignUpStyleSheet.quesView}>
            <Text style={AfterSignUpStyleSheet.displyNameText}>
              {TranslationFile[language].What_is_your_favourite_fruit}
            </Text>
          </View>
          <TextInput
            placeholder={TranslationFile[language].Answer}
            value={ques1}
            style={AfterSignUpStyleSheet.TextInputContainer}
            onChangeText={value => {
              setQues1(value);
            }}
          />

          <View style={AfterSignUpStyleSheet.quesView}>
            <Text style={AfterSignUpStyleSheet.displyNameText}>
              {TranslationFile[language].What_is_your_favourite_game}
            </Text>
          </View>
          <TextInput
            placeholder={TranslationFile[language].Answer}
            value={ques2}
            style={AfterSignUpStyleSheet.TextInputContainer}
            onChangeText={value => {
              setQues2(value);
            }}
          />

          {/* ################################################################### */}

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss;
                if (ques1 == '' && ques2 == '') {
                  alert('Plz enter the required field');
                } else {
                  navigation.navigate('DrawerScreens');
                }
              }}
              style={AfterSignUpStyleSheet.TouchableButtonStyle}>
              <Text style={AfterSignUpStyleSheet.TouchableTextStyle}>
                {TranslationFile[language].Next}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ################################################################### */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AfterSignUpProfileScreen;
