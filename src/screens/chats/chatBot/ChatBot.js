import React, { useRef, useState, useEffect, useContext } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  LayoutAnimation
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Primary_StatusBar} from '../../../components/statusbars/Primary_StatusBar';
import BotChatHeader from '../../../components/Headers/ChatHeader/BotChatHeader';
import BotScreenStyleSheet from '../../../assets/styles/BotStyleSheet/BotScreenStyleSheet';
import AppContext from '../../../context/AppContext';

const ChatBot = props => {

  //***********************************      USE STATE    ************************* */
  const { baseUrl, currentUser,token,apiKey,apiURL } = useContext(AppContext)
  const [data, setData] = useState([]);
  const [msgHistory, setMessageHistory] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  let msgOfBot;


  //***********************************     VARIABLES   ************************* */
  const flatListRef = useRef(null);

  //***********************************      FUNCTIONS    ************************* */

  // useEffect(()=>{
  //   console.log("Bot Msg")
  // },[botMsg])
  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiURL,
      {
        prompt: prompt,
        max_tokens: 900,
        temperature: 1.0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    const text = response.data.choices[0].text;
    setBotMsg(text)
    msgOfBot=text;
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setUserMsg(textInput)
    setData(prevData => [
      ...prevData,
      { type: 'user', text: textInput, timestamp: timestamp },

    ]);
    setTextInput('');
    setTimeout(() => {
      setData(prevData => [
        ...prevData,
        { type: 'bot', text: text, timestamp: timestamp },
      ]);
    }, 1000);
    storeInDb()

  };

  const storeInDb = async () => {
    const formData = new FormData();
    formData.append("userId", currentUser.userId);
    formData.append("userMsg", textInput);
    formData.append("botMsg", msgOfBot);
    console.log("bot_msg", msgOfBot);
        // formData.append("timestamp", timestamp);
    const response = await fetch(`${baseUrl}/storeBotMsg`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
      },
      body: formData,

    });

    const data = await response.json(); // Parse the response body as JSON
    // setMessageHistory(data)
    console.log('after msg send:', data);
  }
  // useEffect(() => {
  //   storeInDb()
  // }, [])

  //***********************************      FLATLIST FUNCTION    ************************* */
  const renderMessage = ({ item }) => {
    if (item.type === 'bot') {
      const messageLines = item.text.split('\n');
      const remainingLines = messageLines.slice(2); // Exclude the first line
      return (
        <View style={BotScreenStyleSheet.botView}>
          <Text style={BotScreenStyleSheet.botImage}>
            {item.type === 'user' ? (
              'Maryam:  '
            ) : (
              <View style={{ borderRadius: hp('5') }}>
                <Image
                  source={require('../../../assets/imges/BotScreenImg/botPic.png')}
                  style={BotScreenStyleSheet.dpImageStyle}
                />
              </View>
            )}
          </Text>
          <View style={BotScreenStyleSheet.botMsgContainer}>
            {remainingLines.map((line, lineIndex) => (
              <View key={lineIndex}>
                <Text style={BotScreenStyleSheet.messageText}>{line}</Text>
              </View>
            ))}
            <Text style={BotScreenStyleSheet.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={BotScreenStyleSheet.userMsgContainer}>
          <Text style={BotScreenStyleSheet.messageText}>{item.text}</Text>
          <Text style={BotScreenStyleSheet.timestamp}>{item.timestamp}</Text>
        </View>
      );
    }
  };

  //***********************************     USE EFFECT    ************************* */
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [data]);
  useEffect(() => {
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [data]);
  //***********************************      DEWSIGNING OF SCREEN    ************************* */
  return (
    <View style={BotScreenStyleSheet.container}>
      <Primary_StatusBar />
      <BotChatHeader navigation={props.navigation} />


      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        style={BotScreenStyleSheet.body}
        contentContainerStyle={BotScreenStyleSheet.contentContainer}
        renderItem={renderMessage}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={BotScreenStyleSheet.inputContainer}>
        <TextInput
          style={BotScreenStyleSheet.input}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder="Ask me Anything"
          placeholderTextColor={AppColors.gray}
        />


        {textInput === '' ? (
          <TouchableOpacity disabled={true}>
            <MaterialCommunityIcons
              name="send-circle"
              size={55}
              style={BotScreenStyleSheet.sendButtonIcon}
              color={AppColors.periWinkle}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSend}>
            <MaterialCommunityIcons
              name="send-circle"
              size={55}
              style={BotScreenStyleSheet.sendButtonIcon}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatBot;


