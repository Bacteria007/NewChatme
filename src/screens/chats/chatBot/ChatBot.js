import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';
import AppColors from '../../../assets/colors/Appcolors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Status_bar from '../../../components/Headers/Status_bar';
import BotChatHeader from '../../../components/Headers/ChatHeader/BotChatHeader';

const ChatBot = props => {
  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiURL =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const [textInput, setTextInput] = useState('');
  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiURL,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    const text = response.data.choices[0].text;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the current timestamp with only hour and minute
    setData([
      ...data,
      { type: 'user', text: textInput, timestamp: timestamp },
      { type: 'bot', text: text, timestamp: timestamp },
    ]);
    setTextInput('');
  };
  const renderMessage = ({ item }) => {
    if (item.type === 'bot') {
      const messageLines = item.text.split('\n');
      const remainingLines = messageLines.slice(2); // Exclude the first line

      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft:-10,marginRight:2}}>   {item.type === 'user' ? 'Maryam:  ' :
          <View style={{borderRadius:hp('5')}}>
           <Image
           source={require('../../../assets/imges/BotScreenImg/botPic.png')}
           style={styles.dpImageStyle}
         /> 
         </View>
         }</Text>
        <View style={styles.botMsgContainer}>
          {remainingLines.map((line, lineIndex) => (
            <View key={lineIndex}>
            <Text style={styles.messageText}>{line}</Text>
          
          </View>
          ))}
            <Text style={styles.timestamp}>{item.timestamp}</Text> 
            
        </View>
        </View>
      );
    } else {
      return (
        
        <View style={styles.userMsgContainer}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      
      );
    }
  };


 return (
    <View style={styles.container}>
 <Status_bar darkModeBgColor={"black"} lightModeBgColor={AppColors.linearGradient.blue} content={'light-content'}   />
 <BotChatHeader navigation={props.navigation}/>
      

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        style={styles.body}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderMessage}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder="Ask me Anything"
          placeholderTextColor={AppColors.gray}
        />
        
    
      {textInput === ''  
        ?
       
        ""
        : (
          // <View style={styles.sendButtonView}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <MaterialCommunityIcons name="send-circle" size={25} style={styles.sendButtonIcon} color={AppColors.periWinkle} />
            </TouchableOpacity>
          // </View>
        )}
          </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgprimary,
  },
  timestamp: {
    fontSize: hp('1.5%'),
    color: AppColors.gray,
    alignSelf: 'flex-end', // Align timestamp to the right
  
  },
  body: {
    backgroundColor:AppColors.bgprimary,
    flex: 1,
    // marginTop:hp('0.5'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
      marginBottom:hp('0.5')
    
  },
  dpImageStyle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius:hp('5'),
  },
  input: {
    borderColor: 'black',
    width: wp('50%'),
    borderRadius: 20,
    borderColor: AppColors.black,
    borderRadius: wp('10%'),
    borderWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    width: wp('100%'),
 
    height: hp('7%'),
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // alignSelf: 'center',
    marginBottom: hp('1%'),
  },
  sendButton: {

    // justifyContent: 'center',
    // alignItems:"center"
  },
  sendButtonIcon: {
   
    // borderRadius: hp('5.5'),
    // height: hp('5.5%'),
    width: hp('5.5%'),
    // backgroundColor:'red'
  //  alignSelf:'center',
  //  justifyContent:"center"
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  messageText: {
    fontSize: hp('2%'),
    color: AppColors.black,

  },
  botMsgContainer: {
    backgroundColor: "rgba(196,221,254,0.6)",
    maxWidth: '80%',

    
    paddingHorizontal: wp('2.5'),
paddingVertical:hp('1.25'),
// marginLeft:3,
    marginBottom: hp('1%'),
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'flex-start', // Left align for bot messages

  },
  userMsgContainer: {
    backgroundColor: AppColors.lightBlack,
    // elevation:2,
    maxWidth: '80%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: hp('1%'),
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'flex-end', // Right align for user messages
  },
  contentContainer: {
    justifyContent: 'flex-end',
 
  },
});