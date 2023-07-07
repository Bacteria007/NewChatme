import {View, Text,TextInput} from 'react-native';
import React from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import {Icons} from '../../../assets/Icons';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../../assets/styles/FontStyle';
import DeleteAccountStyle from '../../../assets/styles/DeleteAccountStyle';
import LongButton from '../../../components/Buttons/LongButton';

const DeleteAccount = ({navigation}) => {
  return (
    <View style={[DeleteAccountStyle.containerView]}>
      <InnerScreensHeader navigation={navigation} screenName="Delete Account" />
      <View style={[DeleteAccountStyle.mainView]}>
      <View style={[DeleteAccountStyle.warningView]}>
        <View style={[DeleteAccountStyle.warningLeftView]}>
          <Icons.FontAwesome
            name="exclamation-triangle"
            size={wp('5.5%')}
            color={AppColors.red}
          />
        </View>
        <View style={[DeleteAccountStyle.warningRightView]}>
          <Text style={[DeleteAccountStyle.warningHeadText]}>
            Deleting your account will:
          </Text>
          <View style={[DeleteAccountStyle.buletedView]}>
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Delete your account from ChatMe
            </Text>
          </View>
          <View style={[DeleteAccountStyle.buletedView]}>
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Earase your message history
            </Text>
          </View>
          <View style={[DeleteAccountStyle.buletedView]}>
            <Text>{'\u25cf'} </Text>
            <Text style={[DeleteAccountStyle.buletedText]}>
              Delete you from all of your ChatMe groups
            </Text>
          </View>
        </View>
      </View>
      <View style={[DeleteAccountStyle.actionContainerView]}>
        <Text style={[DeleteAccountStyle.actionConfirmText]}>
          To delete your account, confirm your country code and enter your phone
          number.
        </Text>
        <Text style={[DeleteAccountStyle.labelText]}>Country</Text>
        <TextInput
        placeholder="country"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
        {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
        <Text style={[DeleteAccountStyle.labelText]}>Phone</Text>
        <TextInput
        placeholder="phone number"
        keyboardType='numeric'
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
        {/* <View style={[DeleteAccountStyle.underlineView]}></View> */}
        <Text style={[DeleteAccountStyle.labelText]}>Password</Text>
        <TextInput
        placeholder="password"
        style={[{
          borderBottomWidth: wp('0.1%'),
          fontSize: wp('4.5%'),
          paddingBottom: wp('-2%'),
        }]}
      />
      <LongButton/>
      </View>
      </View>
    </View>
  );
};

export default DeleteAccount;
