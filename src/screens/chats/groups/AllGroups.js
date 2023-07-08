import React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
const AllGroups = ({navigation}) => {
  return (
    
    <View>
      <AppHeader navigation={navigation} headerTitle={"Groups"}/>
      <Text>Groups</Text>
    </View>
  );
};

export default AllGroups;