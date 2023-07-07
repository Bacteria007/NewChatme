import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import ButtonStyle from '../../assets/styles/ButtonStyle';

const LongButton = ({navigation}) => {
  return (
    <TouchableOpacity
        onPress={() => {
          navigation.navigate('changeNumber');
        }}>
        <View style={[ButtonStyle.longButtonViewStyle]}>
          <Text style={[ButtonStyle.longButtonTextStyle]}>Next</Text>
        </View>
      </TouchableOpacity>
  )
}

export default LongButton