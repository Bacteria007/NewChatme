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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'react-native-axios';
import AppColors from '../assets/colors/Appcolors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const ChatBot = props => {
  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiURL =
    'https://api.openai.com/v1/engines/text-davinci-002/completions';
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
    setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text },]);
    setTextInput('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleConatiner}>
      <Text style={styles.title}>Talk Bot</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        style={styles.body}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: item.type === 'user' ? '#4A148C' : 'red',
                }}>
                {item.type === 'user' ? (
                  <View style={styles.userMsgBoxConatianer}>
                    <View style={styles.userMsgBox}>
                      <Text style={styles.userText}>{item.text}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.botMsgBox}>
                    <Text style={styles.botText}>{item.text}</Text>
                  </View>
                )}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder="Ask me AnyThing" placeholderTextColor={AppColors.gray}
        />
        {textInput == '' ? (
          <View style={styles.sendButtonView}>
          <TouchableOpacity style={styles.sendButton}>
            <FontAwesome name="send" size={20} color={AppColors.white}/>
          </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sendButtonView}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <FontAwesome name="send" size={20} color={AppColors.lightwhite} />
          </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  titleConatiner:{
    width:wp('100%'),
    alignItems:'center'
  },
 
  body: {
    backgroundColor: AppColors.bgprimary,
    width: wp('100%'),
    marginBottom: hp('1%'),
  },
 
  input: {
    borderColor: 'black',
    width: wp('60%'),
    borderRadius: 20,
  },
  inputContainer:{
    flexDirection: 'row',
    width: wp('90%'),
    borderColor:AppColors.black,
    borderRadius: wp('90%'),
    borderWidth:2,
    height: hp('7%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:hp('1%')
    
  },
  sendButton: {
    backgroundColor: AppColors.primary,
    padding:7,
    borderRadius:hp('5.5'),
    height:hp('5.5%'),width:hp('5.5%'),
    justifyContent:'center',
  },
  sendButtonView:{
    flexDirection:"row",alignItems:"center"
  },
    buttonText: {
    fontSize: 12,
    color: AppColors.primary,
  },
  botText: {
    fontSize: hp('2.5%'),
    color: AppColors.white,
  },
  userText: {
    fontSize: hp('2%'),
    color: AppColors.black,
  },
  botMsgBox: {
    backgroundColor: AppColors.coolgray,
    width: wp('40%'),
    padding:7,
    borderRadius:wp('2%'),
  },
  userMsgBox: {
    backgroundColor:AppColors.lightBlack,
    width: wp('45%'),
    padding:8,
    borderRadius:wp('2%'),
    alignSelf:'flex-end'
  },
  userMsgBoxConatianer: {
    width: wp('95%'),
   
  }
});
