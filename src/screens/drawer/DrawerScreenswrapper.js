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
    overflow:'hidden',
    // borderRadius:progress.value===1?12:0
    
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
    flex: 1,   
    backgroundColor:'lightgrey',  
    }
})