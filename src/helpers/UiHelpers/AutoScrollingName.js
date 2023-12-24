import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import UserChatHeaderStyle from '../../assets/styles/UserChatHeaderStyle';
import { ThemeContext } from '../../context/ThemeContext';

const AutoScrollingName = ({ name }) => {
    const { theme } = useContext(ThemeContext);

    const animatedValue = new Animated.Value(0);
    const containerWidth = wp('60'); // Set the width of the containing View

    useEffect(() => {
        const nameWidth = wp('20'); // Set the width you desire
        const initialPosition = containerWidth;
        const endingPosition = -nameWidth;
        const duration = (nameWidth + containerWidth) * 25;
        animatedValue.setValue(initialPosition);

        const scrollName = () => {
            animatedValue.setValue(initialPosition);
            Animated.timing(animatedValue, {
                toValue: endingPosition,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                // Reset the position to the initial value when the animation is complete
                animatedValue.setValue(initialPosition);
                scrollName();
            });
        };

        scrollName();
    }, []);

    return (
        <View style={[UserChatHeaderStyle.profileNameContainerStyle,{ width: containerWidth, overflow: 'hidden',flexDirection:'row'}]}>
            <Animated.Text style={[UserChatHeaderStyle.profileNameTextStyle(theme.profileNameColor),{transform: [{ translateX: animatedValue }]}]}>
                {name}
            </Animated.Text>
        </View>
    );
};

export default AutoScrollingName;
