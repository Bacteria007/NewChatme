import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import AfterSignUpStyleSheet from '../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet';
import { Primary_StatusBar } from '../../components/statusbars/Primary_StatusBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icons } from '../../assets/Icons';
import TranslationFile from '../../assets/translation/TranslationFile';
import AppContext from '../../context/AppContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestGalleryPermission } from '../../components/Permission/Permission';
import AppColors from '../../assets/colors/Appcolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeZego } from '../../helpers/ZegoCloudFunction/ZegoInitFunction';
import { ThemeContext } from '../../context/ThemeContext';
import InnerScreensHeader, { AfterSignUpScreenHeader } from '../../components/Headers/InnerHeaders/InnerScreensHeader';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import ReactNativeModal from 'react-native-modal';
import ProfileScreenStyleSheet from '../../assets/styles/ProfileScreenStyle/ProfileScreenStyleSheet';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';

const AfterSignUpProfileScreen = ({ navigation }) => {

  const { language, baseUrl, currentUser, updateCurrentUser, selectedImageUri, storeImageUri, token, storeUserName} = useContext(AppContext);
  const { theme, darkThemeActivator } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  const [alreadyExist, setAlreadyExist] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const iconSize = hp('3');
  const important_note="These are security questions so give answers that you can easily remeber and others don't know about them."
  
  const handleNextBtn=() => {
    Keyboard.dismiss();
    if (ques1 == '' && ques2 == '') {
      alert('Plz enter the required field');
    } else {
      handleProfileUpdate();
    }
  }
  const openCamera = async () => {
    launchCamera({
      maxWidth: 1080,
      maxHeight: 1080,
    }).then(async Response => {
      console.log('async parsed context vali', currentUser);
      console.log(
        'async parsed context vali id',
        currentUser.userId,
      );
      console.log(Response.assets[0]);
      const formdata = new FormData();
      formdata.append('_id', currentUser.userId);
      formdata.append('name', 'profileImage');
      formdata.append('profileImage', {
        uri: Response.assets[0].uri,
        type: Response.assets[0].type,
        name: Response.assets[0].fileName,
      });
      fetch(`${baseUrl}/uploadProfile`, {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(
              `HTTP error! Status: ${response.status}`,
            );
          }
          return response.json();
        })
        .then(data => {
          console.log('res aya');
          storeImageUri(data.newImage.profileImage);
          updateCurrentUser(existingData => ({
            ...existingData,
            profileImage: data.newImage.profileImage,
          }));
          AsyncStorage.setItem(
            'profileImage',
            data.newImage.profileImage,
          );
          // AsyncStorage.getItem("user").then((userData) => {
          //   if (userData) {
          //     const existingData = JSON.parse(userData);
          //     const updatedData = { ...existingData, profileImage: data.newImage.profileImage };
          //     console.log("async updatedion chli", updatedData)
          //     AsyncStorage.setItem("user", JSON.stringify(updatedData));
          //   }
          // });
        })
        .catch(error => console.log('res error', error));
    })

  }
  const chooseFromGallery = async () => {
    launchImageLibrary({
      maxWidth: 1080,
      maxHeight: 1080,
    }).then(async Response => {
      console.log('async parsed context vali', currentUser);
      console.log(
        'async parsed context vali id',
        currentUser.userId,
      );
      console.log(Response.assets[0]);
      const formdata = new FormData();
      formdata.append('_id', currentUser.userId);
      formdata.append('name', 'profileImage');
      formdata.append('profileImage', {
        uri: Response.assets[0].uri,
        type: Response.assets[0].type,
        name: Response.assets[0].fileName,
      });
      fetch(`${baseUrl}/uploadProfile`, {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`, // Make sure to prepend "Bearer"
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(
              `HTTP error! Status: ${response.status}`,
            );
          }
          return response.json();
        })
        .then(data => {
          console.log('res aya');
          storeImageUri(data.newImage.profileImage);
          updateCurrentUser(existingData => ({
            ...existingData,
            profileImage: data.newImage.profileImage,
          }));
          AsyncStorage.setItem(
            'profileImage',
            data.newImage.profileImage,
          );
        })
        .catch(error => console.log('res error', error));
    })
  }
  const handleProfileUpdate = async () => {
    console.log('aftersignup', currentUser);
    const formdata = new FormData();
    formdata.append('_id', currentUser.userId);
    formdata.append('name', name);
    // Convert security questions array to JSON and append as a string
    const securityQuestions = [
      { question: 'What is your favourite fruit?', answer: ques1 },
      { question: 'What is your favourite game?', answer: ques2 },
    ];
    formdata.append('securityQuestions', JSON.stringify(securityQuestions));

    try {
      console.log("token", `Bearer ${token}`)
      const response = await fetch(`${baseUrl}/updateProfile`, {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      console.log('res after updating', data);
      if (data.message === 'This user name is not available.') {
        setErrorMessage(true);
        setAlreadyExist(data.message);
      } else if (data.message !== "Please provide a valid token." || data.message !== 'Please provide a token.') {
        updateCurrentUser(existingData => ({
          ...existingData,
          name: data.updated.name,
        }));
        AsyncStorage.setItem('name', data.updated.name);
        const idOfUser = currentUser.userId;
        const nameofUser = data.updated.name;
        storeUserName(nameofUser);

        initializeZego(idOfUser, nameofUser);
        navigation.replace("DrawerStack");
      } else {
        console.log('token verify console', data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  useEffect(() => {
    console.log('after signup console', currentUser);
    let userid = currentUser.userId;
    console.log("token useeffect", `Bearer ${token}`)

    fetch(`${baseUrl}/getProfileImage?userId=${userid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('res aya', data);
        if (data.message !== "Please provide a valid token." || data.message !== 'Please provide a token.') {
          console.log("first time img khali ai?", data.profileImage)
          { data.profileImage !== undefined && storeImageUri(data.profileImage); }
        } else {
          console.log('token verify console', data.message);
        }
      })
      .catch(error => console.log('res error', error));
  }, [selectedImageUri]);

  return (
    <SafeAreaView
      style={AfterSignUpStyleSheet.container(theme.backgroundColor)}>
      <Primary_StatusBar />
      {/* <InnerScreensHeader screenName={'More about you'} navigation={navigation} /> */}
      <AfterSignUpScreenHeader screenName={'More about you'} navigation={navigation} />
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
                    style={ProfileScreenStyleSheet.outerNeomorph}>
                    <Neomorph
                      style={ProfileScreenStyleSheet.innerNeomorph}>
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
                      backgroundColor: AppColors.periWinkle,
                    }}
                  />
                )}
              </View>
              {/* Icon ka view */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  showModal()
                }}>
                <View
                  style={[
                    AfterSignUpStyleSheet.CameraIconView(darkThemeActivator),
                    { position: 'absolute', right: 0, bottom: 0 },
                  ]}>
                  <Icons.MaterialIcons name="edit" size={15} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={AfterSignUpStyleSheet.quesView}>
            <Text style={AfterSignUpStyleSheet.displyNameText}>
              {TranslationFile[language].Enter_your_display_name}
            </Text>
          </View> */}
          <View style={{ justifyContent: 'center' }}>
            <TextInput
              placeholder={'Account ' + TranslationFile[language].Name}
              value={name}
              style={AfterSignUpStyleSheet.TextInputContainer}
              onChangeText={value => {
                setName(value);
                // storeUserName(value)
              }}
              autoCapitalize="none"
            />
            {errorMessage && (
              <Text style={{ color: AppColors.red }}>{alreadyExist}</Text>
            )}
            <Text style={[AfterSignUpStyleSheet.Text2, { marginLeft: 15 }]}>
              {/* {TranslationFile[language].Security_questions} */}
              {important_note}
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
              autoCapitalize="none"

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
              autoCapitalize="none"
            />
          </View>
          <View style={AfterSignUpStyleSheet.nextBtnConatiner}>
            <PrimaryBtn btnTitle={TranslationFile[language].Next} onPress={handleNextBtn}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ReactNativeModal
        onDismiss={hideModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        isVisible={visible}
        style={AfterSignUpStyleSheet.modalStyle}
        backdropOpacity={0.2}
      >
        {/* <Text style={AfterSignUpStyleSheet.modalText}>Profile</Text> */}
        <View style={AfterSignUpStyleSheet.modalMainView}>
          <TouchableOpacity
            onPress={async () => {
              console.log("iiiiiiiiiiiiiiiiiii")
              console.log("camera")
              console.log("iiiiiiiiiiiiiiiiiii")
              const permision = await requestCameraPermission();
              if (permision === true) {
                openCamera().then(() => {
                  hideModal()
                })
              } else {
                requestCameraPermission().then(async (res) => {
                  if (res == true) {
                    await openCamera().then(() => {
                      hideModal()
                    })
                  }
                })
              }
            }}
          >
            <View style={AfterSignUpStyleSheet.modalIconAndTextView}>
              <View style={AfterSignUpStyleSheet.modalIconContainer}>
                <Icons.FontAwesome name='camera' size={iconSize} color={AppColors.black} style={{ margin: 6 }} />
              </View>
              <Text style={AfterSignUpStyleSheet.modalText}>Open Camera</Text>
            </View>
          </TouchableOpacity>
          <View style={AfterSignUpStyleSheet.lineStyle}></View>
          <TouchableOpacity
            onPress={async () => {
              const permision = requestGalleryPermission();
              if (permision === true) {
                console.log("iiifiiiiifiiiiiiiif")
                console.log(permision)
                console.log("iiiiiiiiiiiiiiiif")
                chooseFromGallery().then(() => {
                  hideModal()
                })
              } else {
                console.log("eeeeeeellllsssee")
                console.log(permision)
                console.log("eeeeeeellllsssee")
                requestGalleryPermission().then(async (res) => {
                  if (res == true) {
                    console.log(res)
                    await chooseFromGallery().then(() => {
                      hideModal()
                    })
                  }
                })
              }
            }}
          >
            <View style={AfterSignUpStyleSheet.modalIconAndTextView}>
              <View style={AfterSignUpStyleSheet.modalIconContainer}>
                <Icons.FontAwesome name='picture-o' size={iconSize} color={AppColors.black} style={{ margin: 6 }} />
              </View>
              <Text style={AfterSignUpStyleSheet.modalText}>Open Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView >
  );
};

export default AfterSignUpProfileScreen;

