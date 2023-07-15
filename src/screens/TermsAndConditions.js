import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useRef } from 'react';
import InnerScreensHeader from '../components/Headers/InnerHeaders/InnerScreensHeader';
import { Icons } from '../assets/Icons';
import TermsStyle from '../assets/styles/tremsAndConditions/TermsStyle';

const TermsAndConditions = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <ScrollView ref={scrollViewRef} style={TermsStyle.container}>
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
        style={TermsStyle.arrowupStyle}
        >
            <Icons.AntDesign name="arrowup" size={20} color={'black'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TermsAndConditions;


