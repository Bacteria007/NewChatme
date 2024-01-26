import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import ButtonStyle from '../../assets/styles/ButtonStyle';

const LongButton = ({onPress,btnTitle}) => {
  return (
    <TouchableOpacity
        onPress={onPress}>
        <View style={[ButtonStyle.longButtonViewStyle]}>
          <Text style={[ButtonStyle.longButtonTextStyle]}>{btnTitle}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default LongButton