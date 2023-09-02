import React from 'react'
import { Text, StyleSheet,View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useDrawerProgress } from '@react-navigation/drawer'

const DrawerScreenswrapper = ({ children }) => {

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

  return (
    <Animated.View style={[animatedStyle,styles.container]}>
      <Text>{children}</Text>
    </Animated.View>
   
  )
}

export default DrawerScreenswrapper;

const styles = StyleSheet.create({
  container: {
    // flex: 1,   
    // backgroundColor:'red',  
    }
})