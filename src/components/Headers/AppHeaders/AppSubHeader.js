import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import React, {useContext} from 'react';
// import  Icons from '../../assets/Icons'
import AppSubHeaderStyle from '../../../assets/styles/AppSubHeaderStyle';
import {Icons} from '../../../assets/Icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import AppContext from '../../../context/AppContext';

const AppSubHeader = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {darkThemeActivator} = useContext(AppContext);

  return (
    <View
      style={[
        AppSubHeaderStyle.searchViewStyle,
        {
          backgroundColor: darkThemeActivator
            ? AppColors.darkTheme
            : AppColors.lightGrey,
          borderColor: darkThemeActivator?AppColors.searchBorderDark:AppColors.transparent,
        },
      ]}>
      <Icons.Feather
        name="search"
        size={wp('4%')}
        color={darkThemeActivator ? AppColors.searchContentDark: AppColors.coolgray}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor={
          darkThemeActivator ? AppColors.searchContentDark : AppColors.coolgray
        }
        style={[
          AppSubHeaderStyle.textInputPlaceholderStyle,
          {color: darkThemeActivator ?AppColors.searchContentDark: AppColors.coolgray},
        ]}
      />
    </View>
  );
};

export default AppSubHeader;