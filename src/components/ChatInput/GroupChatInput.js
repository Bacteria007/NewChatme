import React, { useContext, useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,

} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import UserChatInputStyle from '../../assets/styles/UserChatInputStyle';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';
import { ThemeContext } from '../../context/ThemeContext';

const GroupChatInput = ({ sendMessageFunc, inputVal, setter, sendGroupImageMessage, inputRef, scrollToBottomFunc, isSending }) => {
    const { theme } = useContext(ThemeContext)
    const [height, setHeight] = useState(hp('5%')); // Initialize height with a default value
    const iconsColor = AppColors.coolgray
    const iconsColor2 = AppColors.black
    const maxInputHeight = hp('17');


    const onContentSizeChange = (event) => {
        const newHeight = Math.min(event.nativeEvent.contentSize.height, maxInputHeight);
        setHeight(newHeight);
    };
    return (
        <View style={UserChatInputStyle.main_input_and_mic(theme.backgroundColor)}>
            <View style={UserChatInputStyle.input_and_all_icons}>
                <ScrollView style={UserChatInputStyle.scroll_inputText}>

                    <TextInput
                        style={UserChatInputStyle.input}
                        placeholder="Message"
                        value={inputVal}
                        onChangeText={e => { setter(e) }}
                        multiline={true}
                        placeholderTextColor={AppColors.gray}
                        onContentSizeChange={onContentSizeChange}
                        // onContentSizeChange={()=>{onContentSizeChange()}}
                        underlineColorAndroid={'transparent'}
                        ref={inputRef}
                        onFocus={() => {
                            console.log("focus---- ");
                            scrollToBottomFunc()
                        }}
                        selectTextOnFocus={true}
                        placeholderStyle={{ color: 'red' }}
                    />
                </ScrollView>

                {inputVal === '' && <TouchableOpacity
                    onPress={() => { sendGroupImageMessage() }}
                >
                    <Icons.FontAwesome name="camera" size={wp('5.5%')} color={iconsColor} />
                </TouchableOpacity>}
            </View>
            {inputVal !== '' ? (
                <TouchableOpacity onPress={() => { inputVal.trim() !== '' ? (sendMessageFunc()) : null }}>
                    <View style={[UserChatInputStyle.microphoneContainerView]}>
                        {isSending ? (
                            <ActivityIndicator size="small" color={iconsColor2} /> // Show loading animation
                        ) : (
                            <Icons.Ionicons
                                name="send-sharp"
                                size={wp('5.7%')}
                                color={iconsColor2}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ) :
                (
                    <TouchableOpacity>
                        <View style={[UserChatInputStyle.microphoneContainerView]}>
                            <Icons.FontAwesome
                                name="microphone"
                                size={wp('5.7%')}
                                color={iconsColor2}
                            />
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}
export default GroupChatInput;