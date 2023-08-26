import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,

} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import UserChatInputStyle from '../../../../assets/styles/UserChatInputStyle';
import { Icons } from '../../../../assets/Icons';
import AppColors from '../../../../assets/colors/Appcolors';

const GroupChatInput = ({ sendMessageFunc, inputVal, setter }) => {
    const [height, setHeight] = useState(hp('7%')); // Initialize height with a default value
    const iconsColor=AppColors.darkgray
    const iconsColor2=AppColors.white
    const maxInputHeight = hp('17'); // Maximum input height
    
    const onContentSizeChange = (event) => {
        const newHeight = Math.min(event.nativeEvent.contentSize.height, maxInputHeight);
        setHeight(newHeight);
    };
    return (
        <View style={UserChatInputStyle.main_input_and_mic}>
            <View style={UserChatInputStyle.input_and_all_icons}>
                <ScrollView style={UserChatInputStyle.scroll_inputText}>
                    <TextInput
                        style={UserChatInputStyle.input(height)}
                        placeholder="Type a message"
                        value={inputVal}
                        onChangeText={e => {
                            setter(e);
                        }}
                        keyboardType='default'
                        keyboardAppearance="dark"
                        multiline={true}
                        placeholderTextColor={iconsColor}
                        onContentSizeChange={onContentSizeChange}
                        // onContentSizeChange={()=>{onContentSizeChange()}}
                        underlineColorAndroid={'transparent'}
                        // cursorColor={AppColors.primary}
                        />
                </ScrollView>
                <View style={UserChatInputStyle.camera_and_papercliper}>
                    <TouchableOpacity>
                        <Icons.FontAwesome name="paperclip" size={wp('6.5%')} color={iconsColor}/>
                    </TouchableOpacity>
                    {inputVal !== '' ? (
                        null
                    ) : <TouchableOpacity>
                        <Icons.FontAwesome name="camera" size={wp('5.5%')} color={iconsColor} />
                    </TouchableOpacity>}
                </View>
            </View>
            {inputVal !== '' ? (
                <TouchableOpacity onPress={() => { inputVal.trim() !== '' ? (sendMessageFunc()) : null }}>
                    <View style={[UserChatInputStyle.microphoneContainerView]}>
                        <Icons.Ionicons
                            name="send-sharp"
                            size={wp('5.7%')}
                            color={iconsColor2}
                        />
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