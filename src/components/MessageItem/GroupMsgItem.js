import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AppContext from '../../context/AppContext';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { Icons } from '../../assets/Icons';

const GroupMsgItem = ({ msgData, onSwipeEnabled }) => {
  const { curentUser } = useContext(AppContext);
  const currentId = JSON.parse(curentUser._j);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const getRandomColor = () => {
    const colors = ['yellow', 'black', 'orange', 'white', 'skyblue']; // List of possible colors
    const randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
    return colors[randomIndex]; // Return the random color
  };
  const randomColor = getRandomColor();
  // ################################## swipe work start
  let startingPoint = 0;
  let dir = 'right';
  const x = useSharedValue(startingPoint);
  const textColor = useSharedValue('black'); // Initialize with default color
  // --------------------
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = dir === 'left' ? -180 : 60;
      textColor.value = dir === 'left' ? 'white' : 'orange';
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPoint);
      textColor.value = withSpring('black');
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: textColor.value,
    };
  });
  //######################################## swipe work end
  const isCurrentUserFunc = async () => {
    const senderid = await msgData.sender_id;
    return senderid === currentId;
  };
  const checkIsCurrentUser = async () => {
    const result = await isCurrentUserFunc();
    setIsCurrentUser(result);
  };

  useEffect(() => {
    checkIsCurrentUser();
  }, [checkIsCurrentUser]);

  useEffect(() => {
    if (msgData.deliveryStatus === true) {
      const tickTimeout = setTimeout(() => {
        setShowTick(true);
      }, 100); // Adjust the delay time as needed (in milliseconds)

      return () => clearTimeout(tickTimeout);
    }
  }, [msgData.deliverStatus]);
  return (
    <FlingGestureHandler
      direction={dir == 'left' ? Directions.LEFT : Directions.RIGHT}
      onGestureEvent={gestureHandler}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state == State.ACTIVE) {
          // add logic when you swipe what to do
          console.log('active');
          onSwipeEnabled(true);
        }
        if (nativeEvent.state == State.CANCELLED) {
          // add logic when you swipe what to do
          console.log('cancel');
          onSwipeEnabled(false);
        }
      }}>
      <Animated.View style={[animatedStyle, { width: wp('100') }]}>
        <View style={styles.wholeMsgBox(isCurrentUser)}>
          <Text style={{ color: randomColor }}>
            {!isCurrentUser ? msgData.sender_name : 'You'}
          </Text>
          <Text style={[{ color: 'white', fontSize: 15, textAlign: 'right' }]}>
            {msgData.text}
          </Text>
          <Animated.Text
            style={[textAnimatedStyle, { fontSize: 10, textAlign: 'right' }]}>
            {moment(msgData.createdAt).format('hh:mm a ')}
          </Animated.Text>
          {/* // {showTick ? */}
          {msgData.deliverStatus ? (
            <Icons.MaterialIcons
              name="done"
              size={15}
              color={'cyan'}
              style={{ alignSelf: 'flex-end' }}
            />
          ) : null}
          {isCurrentUser ? (
            <>
              <View style={styles.rightArrow}></View>
              <View style={styles.rightArrowOverlap}></View>
            </>
          ) : (
            <>
              <View style={styles.leftArrow}></View>
              <View style={styles.leftArrowOverlap}></View>
            </>
          )}
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
};

export default GroupMsgItem;

const styles = StyleSheet.create({
  wholeMsgBox: user => ({
    flexDirection: 'column',
    width: 'auto',
    backgroundColor: user ? 'grey' : 'purple',
    marginTop: 8,
    marginHorizontal: 10,
    alignSelf: user ? 'flex-end' : 'flex-start',
    padding: 7,
    borderRadius: 6,
  }),
  rightArrow: {
    position: 'absolute',
    // backgroundColor: "#0078fe",
    backgroundColor: 'grey',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: 'absolute',
    backgroundColor: 'purple',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    // backgroundColor:"purple",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});
