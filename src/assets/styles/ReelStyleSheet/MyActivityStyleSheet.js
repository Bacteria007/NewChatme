import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../colors/Appcolors';

const MyActivityStyleSheet = StyleSheet.create({
    mainContainer: bgcolor => ({
        flex: 1,
        backgroundColor: bgcolor,
        opacity: 0.7
    }),
    reelsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: wp('1')
        // backgroundColor:'red'
    },
    lottieContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: hp('100'),
        width: wp('100')

    },
    loadingLottieStyle: {
        height: hp('30'),
        width: wp('60'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUploadsLottieStyle: {
        height: hp('30'),
        width: wp('60'),
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
    },
    loadingLottieText: {
        fontSize: 20,
        color: 'orange',
        textAlign: 'center',
    },
    noUploadsText: textColor => ({
        fontSize: 20,
        color: textColor,
        textAlign: 'center',
    }),
    reelsView: {
        // borderWidth: 1,
        // borderColor: AppColors.purple,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // elevation: 0.9,
        margin: hp('0.5'),
    },
    reelStyle: {
        height: wp('30'),
        width: wp('30'),
        // borderWidth: 1,
        // // marginRight: wp('0.5'),
        // borderColor: AppColors.purple,
    },
    reelsModal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 0,
        width: wp('100'),
    },
    viewInModal: {
        backgroundColor: AppColors.lightBlack2,
        height: hp('80'),
        width: wp('80'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 4,
    },
    modalReelHeader: {
        height: hp('7%'),
        width: wp('80%'),
        paddingHorizontal: 3,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerDescriptionText: {
        flex: 1,
        marginLeft: 5,
        textAlign: 'left',
        color: 'black',
    },
    webviewContainerStyle: {
        flex: 1,
        height: hp('80%'),
        width: wp('80%'),
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
});

export default MyActivityStyleSheet;
