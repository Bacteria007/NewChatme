import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icons } from '../assets/Icons';
import TermsStyle from '../assets/styles/tremsAndConditions/TermsStyle';
import { ThemeContext } from '../context/ThemeContext';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import AppColors from '../assets/colors/Appcolors';

const GlobalFunction = () => {
  const { theme } = useContext(ThemeContext);
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple']; // List of possible colors
    const randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
    return colors[randomIndex]; // Return the random color
  };

  const scrollToTop = flatListRef => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const renderFooter = (flatListRef, list) => {
    if (list.length > 5) {
      return (
        <TouchableOpacity
          onPress={() => {
            scrollToTop(flatListRef);
          }}>
            <View style={{alignItems:'flex-end'}}>
          <Neomorph
            darkShadowColor={AppColors.purple}
            swapShadows
            style={[TermsStyle.arrowupStyle(theme.homeCardColor)]}>
            <Icons.AntDesign
              name="arrowup"
              size={20}
              color={theme.profileNameColor}
            />
          </Neomorph>
          </View>
        </TouchableOpacity>
      );
    } else null;
    // ye s liye rkha tha k list k nechy thori c blank sace ban jaye
    //  {
    //   return (
    //     <View style={[TermsStyle.arrowupStyle, { opacity: 0, }]}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           scrollToTop();
    //         }}
    //         style={[TermsStyle.arrowupStyle, { backgroundColor: theme.discussionsCardColor, elevation: 0, display: 'none' }]}
    //       >
    //         <Icons.AntDesign name="arrowup" size={20} color={theme.profileName} />
    //       </TouchableOpacity>

    //     </View>
    //   );
    // }
  };

  return {
    getRandomColor,
    scrollToTop,
    renderFooter,
  };
};

export default GlobalFunction;
