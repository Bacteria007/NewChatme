import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import moment from 'moment';
import UserChatStyle from '../../assets/styles/UserChatStyle';
import AppContext from '../../context/AppContext';
import Pdf from 'react-native-pdf';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


const RenderChats = ({ item, itm, setChangeHeader, setMsgId,document, imagMessage }) => {
  const {
    language,
    baseUrl,
    storedUser,
    getStoredUserDetails,
    selectedImageUri,
    storeImageUri,
  } = useContext(AppContext);
  return (
    <TouchableOpacity
      onLongPress={() => {
        setChangeHeader(true);
        setMsgId(item._id);
      }}>
      <View
        style={[
          item.senderId === itm.userId
            ? UserChatStyle.userMessageContainer
            : UserChatStyle.otherMessageContainer,
        ]}>
          {item.content!=='ChatMe_Image'?
        <Text
          style={[
            item.senderId === itm.userId
              ? UserChatStyle.userMessageText
              : UserChatStyle.otherMessageText,
          ]}>
          {item.content}
        </Text>:<Text></Text>}
        {item.image&&<Image source={{uri:`${baseUrl}${item.image}`}} style={{height:hp('27%'),width:wp('50%')}}/>}
        {item.document&&<View style={{flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,}}>
                <Pdf
                    source={{uri:item.document}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{flex:1,
                      width:Dimensions.get('window').width,
                      height:Dimensions.get('window').height,}}/>
            </View>}
        <Text
          style={[
            item.senderId === itm.userId
              ? UserChatStyle.userTimestampText
              : UserChatStyle.otherTimestampText,
          ]}>
          {item.senderId == itm.userId ? '' : `${item.mood} mood`}{' '}
          {moment(item.createdAt).format('hh:mm a ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderChats;
