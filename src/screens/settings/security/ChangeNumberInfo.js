import {View, Text,Image} from 'react-native';
import React, { useContext } from 'react';
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import ChnageNumberInfoStyle from '../../../assets/styles/ChnageNumberInfoStyle';
import LongButton from '../../../components/Buttons/LongButton';
import { ThemeContext } from '../../../context/ThemeContext';
import AppColors from '../../../assets/colors/Appcolors';
import TranslationFile from '../../../assets/translation/TranslationFile';
import AppContext from '../../../context/AppContext';

const ChangeNumberInfo = ({navigation}) => {
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const {language} = useContext(AppContext)
  const maintextColor = theme.profileNameColor
  const btnColor = AppColors.white
  const secondaryTextColor = darkThemeActivator ? AppColors.gray : AppColors.black

  return (
    <View style={{flex:1,backgroundColor:theme.backgroundColor}}>
      <InnerScreensHeader navigation={navigation} screenName={TranslationFile[language].changeNumber} />
      <View style={[ChnageNumberInfoStyle.imageContainerView]}>
      <Image  source={require('../../../assets/imges/sim-card-icon-11.jpg')}
          style={[ChnageNumberInfoStyle.imageStyle]}/>
      </View>
      <View style={[ChnageNumberInfoStyle.textContainerView]}>
      <Text style={[ChnageNumberInfoStyle.headText(maintextColor)]}>
      {TranslationFile[language].Changing_your_phone_number_wiil_migrate_your_account_info_groups_settings}
        
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText(secondaryTextColor)]}>
      {TranslationFile[language].Before_proceeding_please_confirm_that_you_are_able_to_recieve_SMS_or_calls_at_your_new_number}
        
      </Text>
      <Text style={[ChnageNumberInfoStyle.plainText(secondaryTextColor)]}>
      {TranslationFile[language].If_you_have_both_a_new_phone_a_new_number_first_chnage_your_number_on_your_old_phone}
        
  
      </Text>
      <LongButton btnTitle={TranslationFile[language].Next} onPress={() => {navigation.replace('changeNumber')}} />
      </View>
    </View>
  );
};

export default ChangeNumberInfo;
