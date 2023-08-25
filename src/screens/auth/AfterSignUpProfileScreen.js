import React, { useContext, useEffect, useState } from 'react';
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
  Keyboard,
  PermissionsAndroid,
  TouchableWithoutFeedback,
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraAndAudioPermission } from '../../components/Permission/Permission';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeZego } from '../../components/HelperFunctions/ZegoCloudFunction/ZegoInitFunction';
import UseScreenFocus from '../../components/HelperFunctions/AutoRefreshScreen/UseScreenFocus';
import { ThemeContext } from '../../context/ThemeContext';
import InnerScreensHeader from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';

const AfterSignUpProfileScreen = ({ navigation }) => {
  const { language, baseUrl, storedUser, getStoredUserDetails, selectedImageUri, storeImageUri } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  // const [selectedImageUri, setSelectedImageUri] = useState('');
  const [alreadyExist, setAlreadyExist] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  // UseScreenFocus(getStoredUserDetails)

  const handleProfileUpdate = async () => {
    const userid = await AsyncStorage.getItem('user');
    // const parseId = JSON.parse(userid);
    // // const parseIdcontextcrnt = JSON.parse(storedUser);
    // console.log('id from context', storedUser);
    // console.log('id from context', storedUser.userId);
    // console.log('id from Async', parseId);
    // console.log('id from getId', getStoredUserDetails());

    const formdata = new FormData();
    formdata.append('_id', storedUser.userId);
    formdata.append('name', name);

    // Convert security questions array to JSON and append as a string
    const securityQuestions = [
      { question: 'What is your favourite fruit?', answer: ques1 },
      { question: 'What is your favourite game?', answer: ques2 },
    ];
    formdata.append('securityQuestions', JSON.stringify(securityQuestions));

    try {
      const response = await fetch(`${baseUrl}/updateProfile`, {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for form data
        },
      });
      const data = await response.json();
      console.log('res after updating', data);
      if (data.message === "This user name is not available.") {
        setErrorMessage(true)
        setAlreadyExist(data.message)
      }
      else {
        AsyncStorage.getItem("user").then((userData) => {
          if (userData) {
            const existingData = JSON.parse(userData);
            const updatedData = { ...existingData, name: data.updated.name };
            console.log("update async", updatedData)
            AsyncStorage.setItem("user", JSON.stringify(updatedData));
          }

          const existinguserParseData = JSON.parse(userData);
          const idOfUser = existinguserParseData.userId;
          const nameofUser = data.updated.name;
          initializeZego(idOfUser, nameofUser)
          navigation.navigate('DrawerScreens');
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  // useEffect(()=>{
  //   getStoredUserDetails()
  // },[])
  useEffect(() => {
    console.log("after signup console", storedUser)
    let userid = storedUser.userId
    fetch(`${baseUrl}/getProfileImage?logegedId=${userid}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('res aya', data)
        storeImageUri(data.profileImage);
      })
      .catch(error => console.log("res error", error));

  }, [])


  return (
    <SafeAreaView style={AfterSignUpStyleSheet.container(theme.backgroundColor)}>
      <Primary_StatusBar />

      {/* ***************** HEADER OF SCREEN ************** */}
      {/* <View style={AfterSignUpStyleSheet.TopView}>
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
      </View> */}
      <InnerScreensHeader screenName={"Profile"} navigation={navigation} />
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
            <View>
              <View style={{ position: 'relative' }}>
                {selectedImageUri == '' ? (
                  <Neomorph
                    inner
                    style={{
                      shadowRadius: 3,
                      borderRadius: 90,
                      backgroundColor: "#d8dfe7", // Change this color to match your design
                      width: 130,
                      height: 130,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Neomorph
                      style={{
                        shadowRadius: 3,
                        borderRadius: 100,
                        backgroundColor: "#d8dfe7",
                        // backgroundColor: "#d8dfe7",
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icons.MaterialIcons
                        name="person"
                        size={60}
                        color={AppColors.black} // Change this color to match your design
                      />
                    </Neomorph>
                  </Neomorph>
                ) : (
                  <Image
                    source={{ uri: `${baseUrl}${selectedImageUri}` }}
                    style={{
                      height: hp('18%'),
                      width: hp('18%'),
                      borderRadius: wp('100'),
                      // alignSelf: 'center',
                      // marginBottom: 7,
                      backgroundColor: AppColors.periWinkle,
                    }}
                  />
                )}
              </View>
              {/* Icon ka view */}
              <View style={[AfterSignUpStyleSheet.CameraIconView, { position: 'absolute', right: 0, bottom: 0 }]}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                  requestCameraAndAudioPermission();
                  launchImageLibrary({
                    maxWidth: 800,
                    maxHeight: 800,
                  }).then(async Response => {
                    const userid = await AsyncStorage.getItem('user');
                    const parseId = JSON.parse(userid);
                    // const parseIdcntxtcurnt = JSON.parse(storedUser);
                    console.log("async parsed", parseId.userId)
                    console.log("async parsed context vali", storedUser)
                    console.log("async parsed context vali id", storedUser.userId)
                    console.log(Response.assets[0]);
                    // setSelectedImage(Response.assets[0]);
                    // setSelectedImageUri(Response.assets[0].uri);
                    const formdata = new FormData();
                    formdata.append('_id', storedUser.userId);
                    formdata.append('name', 'profileImage');
                    formdata.append('profileImage', {
                      uri: Response.assets[0].uri,
                      type: Response.assets[0].type,
                      name: Response.assets[0].fileName,
                    });
                    fetch(`${baseUrl}/uploadProfile`, {
                      method: 'POST',
                      body: formdata,
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                      })
                      .then(data => {
                        console.log('res aya')
                        storeImageUri(data.newImage.profileImage);
                        AsyncStorage.getItem("user").then((userData) => {
                          if (userData) {
                            const existingData = JSON.parse(userData);
                            const updatedData = { ...existingData, profileImage: data.newImage.profileImage };
                            console.log("async updatedion chli", updatedData)
                            AsyncStorage.setItem("user", JSON.stringify(updatedData));
                          }
                        });
                      })
                      .catch(error => console.log("res error", error));
                  })
                  // .catch(error=>{console.log("image picking error",error)})
                }}>
                  <Icons.MaterialIcons
                    name="edit"
                    size={15}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <Text style={AfterSignUpStyleSheet.displyNameText}>
            {TranslationFile[language].Enter_your_display_name}
          </Text> */}
          <View style={{ justifyContent: 'center' }}>
            <TextInput
              placeholder={TranslationFile[language].Name}
              value={name}
              style={AfterSignUpStyleSheet.TextInputContainer}
              onChangeText={value => {
                setName(value);
              }}
              autoCapitalize='none'
            />
            {errorMessage &&
              <Text style={{ color: AppColors.red }}>{alreadyExist}</Text>}


            {/* *************************************************************************************************** */}
            <Text style={[AfterSignUpStyleSheet.Text2, { marginLeft: 15 }]}>
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
              autoCapitalize='none'
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
              autoCapitalize='none'
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: hp('18') }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss;
                if (ques1 == '' && ques2 == '') {
                  alert('Plz enter the required field');
                } else {
                  handleProfileUpdate();
                }
              }}
              style={AfterSignUpStyleSheet.TouchableButtonStyle}>
              <Text style={AfterSignUpStyleSheet.TouchableTextStyle}>
                {TranslationFile[language].Next}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AfterSignUpProfileScreen;
