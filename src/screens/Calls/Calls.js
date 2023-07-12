import React from 'react'
import AppHeader from '../../components/Headers/AppHeaders/AppHeader'
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontStyle from '../../assets/styles/FontStyle';

const Calls = ({ navigation }) => {
  return (

    <View style={styles.wholeContainer}>
      <AppHeader navigation={navigation} headerTitle={"Calls"} />
      <LinearGradient colors={['rgb(142, 209, 252)', '#DA70D6']} start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
        <Text style={styles.textstyle}>Calls</Text>
      </LinearGradient>

    </View>
  )
}

export default Calls
const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1
  },
  textstyle: {
    fontSize: 20, fontFamily: FontStyle.boldItalicFont, color: 'white'
  }
})