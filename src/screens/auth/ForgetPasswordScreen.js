import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ForgetScreenStyle from '../../assets/styles/AuthStyleSheet/ForgetScreen/ForgetScreenStyle';
import Primary_StatusBar from '../../components/statusbars/Primary_StatusBar';
import TranslationFile from '../../assets/translation/TranslationFile';
import { Icons } from '../../assets/Icons';
import { Snackbar } from 'react-native-paper';
import AppContext from '../../context/AppContext';
const ForgetPasswordScreen = ({ navigation }) => {
  const { language } = useContext(AppContext);
  const [ques1, setQues1] = useState('');
  const [ques2, setQues2] = useState('');
  const [newPassword, setNewPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleState, setToggleState] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [visible, setVisible] = useState(false);

  // Regular expression to check for special characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const showSnackbar = message => {
    setSnackbarMessage(message);
    setVisible(true);
  };
  return (
    <View style={ForgetScreenStyle.container}>
      <Primary_StatusBar />
      <Image
        source={require('../../assets/imges/AuthScreenPictures/ForgetPassPic/ForgetPic2.png')}
        style={[ForgetScreenStyle.image]}
      />
      {/* *************************************************************************************************** */}
      {toggleState == 1 ? (
        <>
          <Text style={ForgetScreenStyle.Text2}>Security questions</Text>
          <View style={ForgetScreenStyle.quesView}>
            <Text style={ForgetScreenStyle.displyNameText}>
              Q1 : What is your favourite fruit?
            </Text>
          </View>
          <TextInput
            placeholder="Answer"
            value={ques1}
            style={ForgetScreenStyle.TextInputContainer}
            onChangeText={value => {
              setQues1(value);
            }}
          />

          <View style={ForgetScreenStyle.quesView}>
            <Text style={ForgetScreenStyle.displyNameText}>
              Q2 : What is your favourite game?
            </Text>
          </View>
          <TextInput
            placeholder="Answer"
            value={ques2}
            style={ForgetScreenStyle.TextInputContainer}
            onChangeText={value => {
              setQues2(value);
            }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss;
                if ((ques1 == '') & (ques2 == '')) {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else if (ques1 === '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else if (ques2 === '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else {
                  setToggleState(0);
                }
              }}
              style={ForgetScreenStyle.TouchableButtonStyle}>
              <Text style={ForgetScreenStyle.TouchableTextStyle}>
                {TranslationFile[language].Next}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={ForgetScreenStyle.Text2}>Change Password</Text>
          <View style={ForgetScreenStyle.quesView}>
            <Text style={ForgetScreenStyle.displyNameText}>Password:</Text>
          </View>
          <View style={ForgetScreenStyle.passwordContainer}>
            <TextInput
              value={newPassword}
              style={ForgetScreenStyle.passwordInput}
              secureTextEntry={passwordVisible}
              onChangeText={value => {
                setNewPasword(value);
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={ForgetScreenStyle.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={ForgetScreenStyle.quesView}>
            <Text style={ForgetScreenStyle.displyNameText}>
              Confirm Password:
            </Text>
          </View>
          <View style={ForgetScreenStyle.passwordContainer}>
            <TextInput
              value={confirmPassword}
              style={ForgetScreenStyle.passwordInput}
              secureTextEntry={passwordVisible}
              onChangeText={value => {
                setConfirmPassword(value);
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              <Icons.Feather
                name={passwordVisible === true ? 'eye' : 'eye-off'}
                style={ForgetScreenStyle.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                if (newPassword == '' && confirmPassword == '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else if (newPassword.length < 8) {
                  if (newPassword === '') {
                    showSnackbar(
                      TranslationFile[language].Password_must_not_be_empty,
                    );
                    return;
                  } else {
                    showSnackbar(
                      TranslationFile[language]
                        .Password_contain_atLeast_8_character,
                    );

                    if (!specialCharRegex.test(newPassword)) {
                      showSnackbar(
                        TranslationFile[language]
                          .Password_must_contain_at_least_one_special_character,
                      );
                      return;
                    }

                    return;
                  }
                } else if (confirmPassword == '') {
                  showSnackbar(
                    TranslationFile[language].Plz_enter_the_required_field,
                  );
                  return;
                } else {
                  if (newPassword !== confirmPassword) {
                    showSnackbar(
                      TranslationFile[language].Passwords_do_not_match,
                    );
                    return;
                  } else {
                    navigation.replace('DrawerScreens');
                  }
                }
              }}
              style={ForgetScreenStyle.TouchableButtonStyle}>
              <Text style={ForgetScreenStyle.TouchableTextStyle}>
                {TranslationFile[language].Next}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* ################################################################### */}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={{
          backgroundColor: '#D3D3D3',
          width: wp('70'),
          marginBottom: hp('6'),
          marginLeft: wp('15'),
        }}>
        <Text style={[ForgetScreenStyle.text]}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};
export default ForgetPasswordScreen;
