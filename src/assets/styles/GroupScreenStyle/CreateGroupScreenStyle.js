import { heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import AppColors from "../../colors/Appcolors";
import FontStyle from "../FontStyle";
import { StyleSheet } from "react-native";

const CreateGroupScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp('100'),
    width: wp('100'),
  },
  memberlistContainer: {
    flexDirection: 'row',
    height: hp('15'),
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('8'),
  },
  doneButton: btnColor => ({
    height: hp('4.5'),
    width: hp('4.5'),
    borderRadius: hp('4.5'),
    backgroundColor: btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    elevation: 4,
  }),

  header: bgcolor => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    backgroundColor: bgcolor,
    elevation: 4,
  }),
  headerContainer: {
    height: hp('7'),
    width: wp('100'),
    elevation: 4,
  },
  modalView: {
    backgroundColor: '#fff',
    height: hp('25'),
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  createBtn: {
    width: wp('40'),
    alignSelf: 'center',
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: wp('20'),
  },
  modalStyle: {
    backgroundColor:'rgba(0,0,0,0.2)',
    margin: 0,
    justifyContent: 'flex-end',
    height: hp('30'),
  },
  nameAndDpOfSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  memberName: {
    fontFamily: FontStyle.mediumFont,
    fontSize: wp('3.5'),
    color: AppColors.primary,
    marginTop: 5,
  },
  memberDp: {
    height: hp('8%'),
    width: hp('8%'),
    borderRadius: hp('6%'),
  },
  addBtn:{
    height: hp('5%'),
    width: wp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName:(textColor)=>({
    fontFamily: FontStyle.regularFont,
    fontSize: 16,
    color: textColor,
    letterSpacing: 0.3,
    marginLeft:8
  })
});

export default CreateGroupScreenStyle;
