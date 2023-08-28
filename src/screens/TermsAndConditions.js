import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useRef } from 'react';
import InnerScreensHeader from '../components/Headers/InnerHeaders/InnerScreensHeader';
import { Icons } from '../assets/Icons';
import TermsStyle from '../assets/styles/tremsAndConditions/TermsStyle';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useDrawerProgress } from '@react-navigation/drawer'
import { ThemeContext } from '../context/ThemeContext';

const TermsAndConditions = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const{theme}=useContext(ThemeContext)
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  ///drawer wrapper

  const progress = useDrawerProgress()
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp') },
      // { rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg` },
      { translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp') }
    ],
    overflow: 'hidden',
    borderRadius: progress.value === 1 ? 18 : 0,
    shadowColor: 'rgba(0,0,0,1)', // Shadow color
    shadowOpacity: 1, // Opacity of the shadow
    shadowRadius: 10, // Radius of the shadow blur
    shadowOffset: {
      width: 0, // Horizontal offset
      height: -10, // Vertical offset
    },
    elevation: 10,
    

  }));

  //
  return (
    <Animated.ScrollView ref={scrollViewRef} style={[TermsStyle.container,animatedStyle]}>
      <InnerScreensHeader
        navigation={navigation}
        screenName={'Terms and conditions'}
        />
      <View style={TermsStyle.content}>
        <Text style={TermsStyle.title}>Terms and Conditions</Text>
        <Text style={TermsStyle.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus
          arcu non tellus fermentum pulvinar. Vestibulum facilisis ex quis sem
          sollicitudin fermentum. Integer cursus justo id dui scelerisque
          feugiat. Nunc vitae tortor leo. Quisque pharetra dolor id lectus
          viverra fermentum. Fusce sollicitudin, justo id tempor consectetur,
          justo lectus eleifend velit, at ultrices mauris lorem quis nisl.
        </Text>
        <Text style={TermsStyle.body}>
          In hac habitasse platea dictumst. Suspendisse et lectus malesuada,
          aliquam orci at, congue magna. Nullam sodales ipsum at pharetra
          interdum. Etiam efficitur purus quis turpis ullamcorper, vel
          vestibulum metus maximus. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Vestibulum vitae
          suscipit est, ut efficitur sem. Duis tristique odio id justo malesuada
          rutrum. Suspendisse potenti. Nulla facilisi. Ut blandit ante tellus,
          vitae consequat dolor tempus id.
        </Text>
        <Text style={TermsStyle.body}>
          In hac habitasse platea dictumst. Suspendisse et lectus malesuada,
          aliquam orci at, congue magna. Nullam sodales ipsum at pharetra
          interdum. Etiam efficitur purus quis turpis ullamcorper, vel
          vestibulum metus maximus. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Vestibulum vitae
          suscipit est, ut efficitur sem. Duis tristique odio id justo malesuada
          rutrum. Suspendisse potenti. Nulla facilisi. Ut blandit ante tellus,
          vitae consequat dolor tempus id.
        </Text>

        <TouchableOpacity
          onPress={() => {
            scrollToTop();
          }}
        style={TermsStyle.arrowupStyle(theme.homeCardColor)}
        >
            <Icons.AntDesign name="arrowup" size={20} color={theme.profileNameColor} />
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

export default TermsAndConditions;


