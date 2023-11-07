import React, { useContext } from 'react'
import { Dimensions, Animated, View, Image } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Containers from '../../assets/styles/Containers';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GenerateVideoHtml from '../../screens/reels/ReelsHtmlVideo';
import AppContext from '../../context/AppContext';
import WebView from 'react-native-webview';
import ReelscreenStyle from '../../assets/styles/ReelStyleSheet/ReelscreenStyle';

const { width } = Dimensions.get('window')
export function ZoomVideo({ source }) {
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
    console.log("👽",source)
    const { baseUrl, token } = useContext(AppContext);
    const HtmlVideo = GenerateVideoHtml(baseUrl, source, true, false)

    return (
        <PinchGestureHandler onGestureEvent={this.onZoomEventFunction}
            onHandlerStateChange={this.onZoomStateChangeFunction}
        >
            <Animated.View style={{flex:1,  transform: [{ scale: this.scale }]}}>
            <WebView
                originWhitelist={['*']}
                source={{
                    html: `${HtmlVideo}`
                }}
                style={[ReelscreenStyle.backgroundVideo,]}
            />
            </Animated.View>
        </PinchGestureHandler>
    )
}
