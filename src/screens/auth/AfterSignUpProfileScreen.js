import { View ,Text,SafeAreaView,Image,ImageBackground,TouchableOpacity} from "react-native";
import AfterSignUpStyleSheet from "../../assets/styles/AuthStyleSheet/AfterSignUpStyleSheet/AfterSignUpStyleSheet";
import Primary_StatusBar from "../../components/statusbars/Primary_StatusBar";
import Appcolors from "../../assets/colors/Appcolors";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppColors from "../../assets/colors/Appcolors";
import { Icons } from "../../assets/Icons";
const AfterSignUpProfileScreen = () =>{
    return(
        <SafeAreaView style={AfterSignUpStyleSheet.container}>
        <Primary_StatusBar
          darkModeBgColor={'black'}
          lightModeBgColor={Appcolors.primary}
        />
  
        {/* *****************           HEADER OF WELCOME SCREEN   ************** */}
        <View style={AfterSignUpStyleSheet.TopView}>
          <View style={AfterSignUpStyleSheet.TopInnerView1}>
            <Image
              source={require('../../assets/imges/logo/logo.png')}
              style={AfterSignUpStyleSheet.LogoImageStyle}
            />
            <Text style={AfterSignUpStyleSheet.HeadingText1}> ChatMe</Text>
          </View>
          </View>
          <View style={AfterSignUpStyleSheet.BelowHeadercontainer}>
          <Text style={AfterSignUpStyleSheet.Text1}>Complete your profile</Text>
          <View
          style={AfterSignUpStyleSheet.ImageContainer}>
          <TouchableOpacity
            activeOpacity={0.9}  
            onPress={() => {
              console.log('Image Show');
            }}
            style={AfterSignUpStyleSheet.ImageBackTouchable}>
            <ImageBackground
              source={require('../../assets/imges/img2.png')}
              style={{
                height: hp('20%'),
                width: hp('20%'),
              }}
              imageStyle={{ borderRadius: 100 }}
              >
              {/* img k oper same size ka view ta k camera icon k view ko rotate kr k bottom right corner pr ly jaye*/}

             
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    console.log('Select from gallery');
                  }}
                >
                  {/* Icon ka view */}
                  <View
                    style={AfterSignUpStyleSheet.CameraIconView}>
                    <Icons.MaterialIcons
                      name="camera-alt"
                      size={23}
                      color="white"
                    />

                  </View>
                </TouchableOpacity>
                         </ImageBackground>
          </TouchableOpacity>
        </View>
        </View>
          </SafeAreaView>
    )
}
export default AfterSignUpProfileScreen;