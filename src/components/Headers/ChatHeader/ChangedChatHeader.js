import React, { useContext } from 'react';
import { View } from 'react-native';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';
import { Icons } from '../../../assets/Icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ThemeContext } from '../../../context/ThemeContext';
import { TouchableRipple } from 'react-native-paper';

const ChangedChatHeader = ({ DeleteFunction, setChangeHeader }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={UserChatHeaderStyle.changedHeaderContainerView(theme.backgroundColor)}>
      <TouchableRipple
        borderless
        style={UserChatHeaderStyle.headerTouchableBtn}
        onPress={() => {
          setChangeHeader(false);
        }}>
        <Icons.Ionicons
          name="arrow-back"
          size={wp('6.5%')}
          color={theme.profileNameColor}
        />
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          DeleteFunction();
        }}
        borderless
        style={UserChatHeaderStyle.headerTouchableBtn}>
        <Icons.FontAwesome5
          name="trash"
          size={wp('5%')}
          color={theme.profileNameColor}
        />
      </TouchableRipple>
    </View>
  );
};

export default ChangedChatHeader;
