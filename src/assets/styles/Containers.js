import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Containers = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCenterContainer: (bgcolor) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgcolor
  }),
  centercontent: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Containers;
