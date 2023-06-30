import React from 'react'
import { View ,Text} from 'react-native'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader';
const Contacts = ({navigation}) => {
  return (
    <View>
      <AppHeader navigation={navigation}/>
        <Text>Contacts  </Text>
    </View>
  )
}

export default Contacts;