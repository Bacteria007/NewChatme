import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../../../components/Headers/AppHeaders/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import FontStyle from '../../../assets/styles/FontStyle';
import { heightPercentageToDP as hp, widthPercentageToDPas as wp } from 'react-native-responsive-screen';
const AllGroups = ({ navigation }) => {
  return (


    <View style={styles.wholeContainer}>
      <LinearGradient colors={['#c4ddfe', '#ffb6c1']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }}  locations={[0.3,0.9]}>
        <AppHeader navigation={navigation} headerTitle={"Groups"} />
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
        <Text style={styles.textstyle}>Groups</Text>
      </LinearGradient>


    </View>
  );
};

export default AllGroups;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1, height: hp('100%')
  },
  textstyle: {
    fontSize: 20, fontFamily: FontStyle.boldItalicFont, color: 'white'
  }
})