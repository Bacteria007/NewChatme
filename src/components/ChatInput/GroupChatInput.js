import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Keyboard,

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
    const [inputHeight, setInputHeight] = useState(0); // Initialize height with a default value
    const iconsColor = AppColors.coolgray
    const iconsColor2 = AppColors.black
    const maxInputHeight = hp('17');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const screenDimensions = Dimensions.get('window');

    const handleContentSizeChange = (contentHeight) => {
        setInputHeight(Math.min(contentHeight, 6 * 18));
        setIsScrollEnabled(contentHeight / 18 > 6);
    };

    const handleFocus = () => {
        if (!keyboardOpen) {
            setKeyboardOpen(true);
        }
    };
    const handleBlur = () => {
        if (keyboardOpen) {
            setKeyboardOpen(false);
        }
    };
    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardOpen(true);
        });

        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);


    return (
        <View style={[UserChatInputStyle.main_input_and_mic(theme.chatScreenColor), { paddingBottom: keyboardOpen ? screenDimensions.width * 0.06 : screenDimensions.width * 0 }]}>
            <View style={UserChatInputStyle.input_and_all_icons}>
                <ScrollView style={UserChatInputStyle.scroll_inputText} scrollEnabled showsVerticalScrollIndicator>
                    <TextInput
                        value={inputVal}
                        onChangeText={e => { setter(e) }}
                        style={[UserChatInputStyle.input, { maxHeight: inputHeight }]}
                        placeholder="Message"
                        keyboardType="default"
                        multiline={true}
                        placeholderTextColor={AppColors.gray}
                        onContentSizeChange={(e) =>
                            handleContentSizeChange(
                                e.nativeEvent.contentSize.height
                            )
                        }
                        underlineColorAndroid={'transparent'}
                        scrollEnabled={isScrollEnabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={inputRef}
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
                    <TouchableOpacity disabled>
                        <View style={[UserChatInputStyle.microphoneContainerView]}>
                            <Icons.Ionicons
                                name="send-sharp"
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