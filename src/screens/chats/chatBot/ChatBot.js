import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';
import AppColors from '../../../assets/colors/Appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Primary_StatusBar from '../../../components/statusbars/Primary_StatusBar';
import BotChatHeader from '../../../components/Headers/ChatHeader/BotChatHeader';
import BotScreenStyleSheet from '../../../assets/styles/BotStyleSheet/BotScreenStyleSheet';

const ChatBot = props => {

  //***********************************      USE STATE    ************************* */
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');

 //***********************************     VARIABLES   ************************* */
  const flatListRef = useRef(null);

  const apiKey = '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';
  const apiURL =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';

    //***********************************      FUNCTIONS    ************************* */

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
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
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
  };


  //***********************************      FLATLIST FUNCTION    ************************* */
  const renderMessage = ({ item }) => {
    if (item.type === 'bot') {
      const messageLines = item.text.split('\n');
      const remainingLines = messageLines.slice(2);

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
      <Primary_StatusBar
        darkModeBgColor={AppColors.black}
        lightModeBgColor={AppColors.linearGradient.blue}
        content={'light-content'}
      />
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
