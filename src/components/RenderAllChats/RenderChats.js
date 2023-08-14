import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import moment from 'moment';
import UserChatStyle from '../../assets/styles/UserChatStyle'
import AppContext from '../../context/AppContext';

const RenderChats = ({ item ,itm,setChangeHeader,setMsgId,imagMessage}) => {
  const { language, baseUrl,currentUserId,getUserID2,selectedImageUri,storeImageUri } = useContext(AppContext);
  return (
    <TouchableOpacity onLongPress={()=>{
        setChangeHeader(true)
        setMsgId(item._id)
      }}>
      <View style={[item.senderId === itm.userId ? UserChatStyle.userMessageContainer : UserChatStyle.otherMessageContainer]}>
        {item.image&&<Image source={{uri:`${baseUrl}${item.image}`}} style={[item.senderId === itm.userId ? UserChatStyle.userMessageText : UserChatStyle.otherMessageText]}/>}
        {item.content!=='image'? <Text style={[item.senderId === itm.userId ? UserChatStyle.userMessageText : UserChatStyle.otherMessageText]}>{item.content}</Text>:<Text>''</Text>
}
        <Text style={[item.senderId === itm.userId ? UserChatStyle.userTimestampText : UserChatStyle.userTimestampText]}>{moment(item.createdAt).format('hh:mm a ')}</Text>
      </View>
      </TouchableOpacity>

  )
}

export default RenderChats