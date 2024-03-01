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
import { Primary_StatusBar } from '../../../components/statusbars/Primary_StatusBar';
import BotChatHeader from '../../../components/Headers/ChatHeader/BotChatHeader';
import BotScreenStyleSheet from '../../../assets/styles/BotStyleSheet/BotScreenStyleSheet';
import AppContext from '../../../context/AppContext';
import { ThemeContext } from '../../../context/ThemeContext';
import TranslationFile from '../../../assets/translation/TranslationFile';


const ChatBot = props => {

  //***********************************      USE STATE    ************************* */
  const { baseUrl, currentUser, token, apiKey, apiURL,aimodel ,language} = useContext(AppContext)
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [msgHistory, setMessageHistory] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  const flatListRef = useRef(null);
  let msgOfBot;



  const handleSend = async () => {
    const prompt = textInput.toLowerCase().replace(/[\s\-]/g, '').replace(/[^\w\s]/g, '');
    console.log("User Message:", prompt);
    let botReply
    // Check for specific greetings
    if (prompt.includes('hi') || prompt.includes('hello')) {
      botReply = `\n\n Hello there ! How can I assist you today?`
      setBotMsg(botReply);
      msgOfBot = botReply
      setUserMsg(textInput);
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
          { type: 'bot', text: botReply, timestamp: timestamp },
        ]);
      }, 1000);
      storeInDb()
      return;
    }
    if (prompt.includes('assalamoalaikum')) {
      botReply = `\n \nWa Alaikumussalam ! How can I assist you today?`

      setBotMsg(botReply);
      msgOfBot = botReply
      setUserMsg(textInput);
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
          { type: 'bot', text: botReply, timestamp: timestamp },
        ]);
      }, 1000);
      storeInDb()
      return;
    }
    await axios.post(
      apiURL,
      {
        // messages: [{ role: "system", content: "you are a helpful assistant" },{ role: "user", content: textInput }],
        prompt: textInput,
        max_tokens: 1024,
        temperature: 0.8,
        model: aimodel
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    ).then((response) => {
      console.log("gpt===========res", response)
      const text = response.data.choices[0].text;
      setBotMsg(text)
      msgOfBot = text;
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
    }).catch((err) => {
      console.log("catch gpt error", err)
    })

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
              `${currentUser.name}:  `
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
    <View style={BotScreenStyleSheet.container(theme.chatScreenColor)}>
      <Primary_StatusBar />
      <BotChatHeader navigation={props.navigation} />


      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        style={BotScreenStyleSheet.body(theme.chatScreenColor)}
        contentContainerStyle={BotScreenStyleSheet.contentContainer}
        renderItem={renderMessage}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={BotScreenStyleSheet.inputContainer}>
        <TextInput
        lightTheme
          style={BotScreenStyleSheet.input(theme.chatScreenColor)}
          value={textInput}
          onChangeText={text => setTextInput(text)}
          placeholder={TranslationFile[language].Ask_me_Anything}
          placeholderTextColor={theme.headerSearchText}
          inputStyle={{ color: theme.headerSearchText }}
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


