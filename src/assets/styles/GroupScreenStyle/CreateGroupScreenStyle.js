import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';
import FontStyle from '../FontStyle';
import { StyleSheet } from 'react-native';

const CreateGroupScreenStyle = StyleSheet.create({
  container: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('100'),
    width: wp('100'),
  }),
  memberlistContainer: isDark => ({
    flexDirection: 'row',
    height: hp('15'),
    width: wp('93'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDark ? AppColors.black : AppColors.white,
    marginLeft: wp('3'),
  }),
  doneButton: btnColor => ({
    height: hp('4.5'),
    width: hp('4.5'),
    borderRadius: hp('4.5'),
    // backgroundColor: btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // elevation: 4,
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
  flatlistItemStyle: itemColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('10%'),
    width: wp('96%'),
    backgroundColor: itemColor,
    paddingHorizontal: 14,
    flex: 1,
    alignSelf: 'center',
  }),

  modalView: {
    // flex:1,
    // backgroundColor: '#fff',
    // height: hp('50'),
    width: wp('100'),
    // alignItems: 'center',
    // alignSelf: 'center',
    borderTopRightRadius: wp('4'),
    borderTopLeftRadius: wp('4'),
    paddingVertical: hp('2'),
    paddingHorizontal: wp('4'),
  },
  createBtn: {
    // width: wp('40'),
    alignSelf: 'flex-end',
    backgroundColor: AppColors.Lilac,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    borderRadius: wp('10'),
    paddingVertical: wp('1.4'),
    marginTop: 20,
    marginHorizontal: wp('3'),
    // elevation:4,
  },
  createBtnText: {
    color: AppColors.black,
    fontFamily: FontStyle.regularFont,
    fontSize: hp('1.6'),
  },
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  nameAndDpOfSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('4'),
    marginVertical: hp('1.5'),
  },
  memberName: {
    fontFamily: FontStyle.mediumFont,
    fontSize: wp('3'),
    color: AppColors.primary,
    marginTop: 5,
  },
  memberDp: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.lightBlack,
  },
  memberDpInCreateGroup: {
    height: hp('7%'),
    width: hp('7%'),
    borderRadius: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.lightBlack,
  },
  groupDpImage: {
    height: hp('11%'),
    width: hp('11%'),
    borderRadius: hp('11%'),
  },
  addBtn: {
    height: hp('5%'),
    width: wp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: textColor => ({
    fontFamily: FontStyle.regularFont,
    fontSize: 16,
    color: textColor,
    letterSpacing: 0.3,
  }),
  groupDp: bgColor => ({
    // marginLeft: 10,
    height: hp('11%'),
    width: hp('11%'),
    borderRadius: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    alignSelf: 'center',
  }),

  circleAroundGroupDp: bgColor => ({
    height: hp('12.5%'),
    width: hp('12.5%'),
    borderRadius: hp('10%'),
    backgroundColor: AppColors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: bgColor,
  }),
  circleAroundMemberDp: {
    height: hp('7%'),
    width: hp('7%'),
    borderRadius: hp('8%'),
    backgroundColor: AppColors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  editIconBtn: {
    height: hp('3.3%'),
    width: hp('3.3%'),
    borderRadius: hp('3'),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.white,
  },
  deSelectIconBtn: {
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: 100,
    backgroundColor: AppColors.lightBlack2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  enterNameTextinput: {
    width: wp('30%'),
    height:hp('6%'),
    fontFamily: FontStyle.boldFont,
    textAlign: 'center',
    // backgroundColor: 'yellow',
    marginBottom: hp('-1'),
    // borderBottomColor:AppColors.primary,borderBottomWidth:wp('0.2%')
  },
  msgText: {
    fontFamily: FontStyle.regularFont,
    textAlign: 'center',
    fontSize: hp('1.5'),
    color: AppColors.black,
    width: wp('60'),
    // backgroundColor: 'yellow'
  },
  phoneText: {
    fontFamily: FontStyle.regularFont,
    fontSize: hp('1.5'),
    color: AppColors.gray,
  },
  modalText: {
    fontFamily: FontStyle.regularFont,
    textAlign: 'center',
  },
  participantsTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: wp('100'),
    paddingLeft:wp('7')
  },
  participantsText: {
    fontFamily: FontStyle.regularFont,
    textAlign: 'left',
    fontSize: hp('3'),
    color: AppColors.black,
    // width: wp('93'),
    flexDirection: 'row',
  },
  participantsNumber: {
    fontFamily: FontStyle.mediumFont,
    textAlign: 'center',
    fontSize: hp('2.3'),
    color: AppColors.white,
  },
  participantsNumberContainer: {
    backgroundColor: AppColors.primary,
    height: hp('3.4'),
    width: hp('2.8'),
    borderRadius: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.primary,
    borderRadius: 100,
  },
  participantsSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.bgprimary,
    width: wp('100'),
    height: hp('65'),
    borderTopLeftRadius: wp('9'),
    borderTopRightRadius: wp('9'),
    paddingTop: hp('3'),
  },
  avatarAndNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // width:wp('100%'),
    height: hp('25'),
  },
  horizontalLineStyle: {
    height: hp('0.1'),
    width: wp('72'),
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'flex-end',
    marginRight: wp('6'),
  },
  dpImage: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateGroupScreenStyle;
