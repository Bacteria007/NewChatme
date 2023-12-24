import React from 'react'
import { Dimensions, Animated, View, Image } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Containers from '../../assets/styles/Containers';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window')
export function ZoomImage({ source }) {
    scale = new Animated.Value(1);
    onZoomEventFunction = Animated.event(
        [{
            nativeEvent: { scale: this.scale }
        }],
        {
            useNativeDriver: true
        }
    )
    onZoomStateChangeFunction = (event) => {
        if (event.nativeEvent.oldState == State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true //imp line
            }).start()
        }
    }
    return (
        <PinchGestureHandler onGestureEvent={this.onZoomEventFunction}
            onHandlerStateChange={this.onZoomStateChangeFunction}
        >
            <Animated.Image
                source={source}
                style={{ height: hp('100'), width: wp('100'), transform: [{ scale: this.scale }] }}
                resizeMode='center'
            />
        </PinchGestureHandler>
    )
}
