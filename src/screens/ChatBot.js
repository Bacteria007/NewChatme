import React, {useRef, useState} from 'react';

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
    setData([ ...data,{type: 'user', text: textInput}, {type: 'bot', text: text},  ]);
    setTextInput('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ChatBot</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        //   showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        style={styles.body}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: item.type === 'user' ? '#4A148C' : 'red',
                }}>
                {item.type === 'user' ? 'Me:  ' : 'Bot:'}
              </Text>
              <Text style={styles.bot}>{item.text}</Text>
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          borderColor: 'black',
          borderRadius: 40,
          borderWidth: 1,
          height: 60,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder="Ask me AnyThing"
        />
        {textInput == '' ? (
          <TouchableOpacity style={styles.button}>
            {/* <Text style={styles.buttonText}>Send Message</Text> */}
            <FontAwesome name="send" size={30} color="#E1BEE7" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            {/* <Text style={styles.buttonText}>Send Message</Text> */}
            <FontAwesome name="send" size={30} color="#E1BEE7" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CE93D8',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#CE93D8',
    width: '90%',
    marginTop: 5,
    marginBottom: 10,
    //    marginRight:10
    // marginRight:20,
  },
  bot: {
    fontSize: 16,
    marginRight: 25,
    // padding:0
  },
  input: {
    borderColor: 'black',
    // borderWidth: 1,
    width: '60%',
    borderRadius: 20,
    // marginLeft:10,
    // paddingHorizontal:10
  },
  button: {
    backgroundColor: '#4A148C',
    borderColor: 'black',
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    width: '15%',
    // paddingTop:10,
    // paddingLeft:10,
    // marginRight:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 15,
    height: 50,
  },
  buttonText: {
    fontSize: 12,
    color: 'Green',
  },
});
