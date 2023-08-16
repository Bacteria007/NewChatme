import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AppContext from '../../context/AppContext';
import { Swipeable } from 'react-native-gesture-handler';
import { Icons } from '../../assets/Icons';

const GroupMsgItem = ({ msgData }) => {
  const { curentUser,currentUserId } = useContext(AppContext);
  // const currentId = JSON.parse(curentUser._j);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  // reply
  const swipeableRef = useRef(null);
  const [swipeOpen, setSwipeOpen] = useState(false);

  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleSwipeableOpen = () => {
    closeSwipeable();
    setSwipeOpen(true);
  };

  const handleSwipeableClose = () => {
    setSwipeOpen(false);
  };

  const renderLeftActions = (progress, dragX, item) => {
    if (swipeOpen) {
      return null;
    }
    
    return (
      <TouchableOpacity
        onPress={() => {
          closeSwipeable();
          // Handle reply action
        }}
        style={{ justifyContent: 'center', alignItems: 'center', width: wp('40')}}
      >
        <Icons.Entypo name='reply' color="black" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(()=>{
// console.log("swipopen",swipeOpen)
  },[swipeOpen,closeSwipeable,handleSwipeableClose,handleSwipeableOpen])
// Checking  User
  const isCurrentUserFunc = async () => {
    const senderid = await msgData.sender_id;
    return senderid === currentUserId.userId;
  };
  const checkIsCurrentUser = async () => {
    const result = await isCurrentUserFunc();
    setIsCurrentUser(result);
  };

  useEffect(() => {
    checkIsCurrentUser();
  }, [checkIsCurrentUser]);


  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableClose={handleSwipeableClose}
      overshootLeft={false}
      overshootRight={false}
      overshootFriction={4}
      onEnded={closeSwipeable}
      onCancelled={closeSwipeable}
      renderLeftActions={renderLeftActions}
    >
      <View style={{ width: wp('100') }}>
        <View style={styles.wholeMsgBox(isCurrentUser)}>
          <Text style={{ color: "black" }}>
            {!isCurrentUser ? msgData.sender_name : 'You'}
          </Text>
          <Text style={[{ color: 'white', fontSize: 15, textAlign: 'right' }]}>
            {msgData.text}
          </Text>
          <Text style={{ fontSize: 10, textAlign: 'right' }}>
            {moment(msgData.createdAt).format('hh:mm a ')}
          </Text>

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
      </View>
    </Swipeable>
  );
};

export default GroupMsgItem;

const styles = StyleSheet.create({
  wholeMsgBox: (user) => ({
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


  // const getRandomColor = () => {
  //   const colors = ['yellow', 'black', 'orange', 'white', 'skyblue']; // List of possible colors
  //   const randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
  //   return colors[randomIndex]; // Return the random color
  // };
  // const randomColor = getRandomColor();
