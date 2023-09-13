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
import AppColors from '../../assets/colors/Appcolors';

const GroupMsgItem = ({ msgData }) => {
  const { curentUser, currentUser } = useContext(AppContext);
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
        style={{ justifyContent: 'center', alignItems: 'center', width: wp('40') }}
      >
        <Icons.Entypo name='reply' color="black" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // console.log("swipopen",swipeOpen)
  }, [swipeOpen, closeSwipeable, handleSwipeableClose, handleSwipeableOpen])
  // Checking  User
  const isCurrentUserFunc = async () => {
    const senderid = await msgData.sender_id;
    return senderid === currentUser.userId;
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
      onEnded={closeSwipeable}
      onCancelled={closeSwipeable}
      renderLeftActions={renderLeftActions}
      // renderRightActions={renderLeftActions}
      shouldCancelWhenOutside={true}
      dragOffsetFromRightEdge={0.5}
    >
      <View style={{ width: wp('100') }}>
        <View style={styles.wholeMsgBox(isCurrentUser)}>
          <Text style={{ color: AppColors.primary }}>
            {!isCurrentUser ? msgData.sender_name : 'You'}
          </Text>
          <Text style={[{ color: AppColors.coolgray, fontSize: 15, textAlign: 'right' }]}>
            {msgData.text}
          </Text>
          <Text style={{ fontSize: 10, textAlign: 'right' }}>
            {moment(msgData.createdAt).format('hh:mm a ')}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default GroupMsgItem;

const styles = StyleSheet.create({
  wholeMsgBox: (user) => ({
    flexDirection: 'column',
    backgroundColor: user ? AppColors.tab : AppColors.Lilac,
    margin: 5,
    marginHorizontal: 13,
    alignSelf: user ? 'flex-end' : 'flex-start',
    padding: 7,
    borderRadius: 6,
    maxWidth: wp('80'),
    // maxHeight:hp('90'),
    elevation: 4,
  }),
});
