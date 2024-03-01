import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView, StatusBar, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader'
import CreateGroupScreenStyle from '../../../assets/styles/GroupScreenStyle/CreateGroupScreenStyle'
import { Icons } from '../../../assets/Icons'
import { launchImageLibrary } from 'react-native-image-picker'
import AppContext from '../../../context/AppContext'
import { ThemeContext } from '../../../context/ThemeContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AppColors from '../../../assets/colors/Appcolors'
import { Badge, FAB } from 'react-native-paper'
import { capitalizeFirstLetter } from '../../../helpers/UiHelpers/CapitalizeFirstLetter'
import { SelectImage } from '../../../helpers/launchCameraHelper/SelectImage'
import TranslationFile from '../../../assets/translation/TranslationFile'

const NewGroup = (props) => {
    const { baseUrl, currentUser, token ,language} = useContext(AppContext);
    const { theme, darkThemeActivator } = useContext(ThemeContext);
    const { selectedMembers, deselectMember, } = props.route.params
    const [groupName, setgroupName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [groupDisplayPic, setGroupDisplayPic] = useState('');
    const [isDeselected, setIsDeselected] = useState(false)

    const handleSelectImage = () => {
        SelectImage(setGroupDisplayPic);
    };

    const createNewGroup = async name => {
        if (selectedMembers.length >= 2) {
            if (name != '') {
                setIsCreating(true)
                const formData = new FormData();
                formData.append('group_name', name);
                formData.append('group_admin', currentUser.userId);
                formData.append('members', JSON.stringify(selectedMembers));
                if (groupDisplayPic != '') {
                    formData.append("ProfileImage", groupDisplayPic);
                }
                await fetch(`${baseUrl}/creategroup`, {
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                })
                    .then(async response => {
                        const res = await response.json()
                        if (res.data.message == "Please provide a valid token.") {
                            Alert.alert("Provide a valid token.")
                        } else if (res.data.message == 'Please provide a token.') {
                            Alert.alert('Token required')
                        } else {
                            console.log('res=====>>>>', res.data)
                            setIsCreating(false)
                            setgroupName("")
                            props.navigation.replace('InnerScreens', { screen: 'GroupChat', params: { item: res.data,allGroupMsgs:[] } })
                        }
                    })
                    .catch(error => {
                        console.log('error in creatng group', error);
                    });
            } else {

                Alert.alert('please enter subject of group');
            }
        } else {
            Alert.alert('pleaes add at least 3 member');
        }
    };
    useEffect(()=>{
console.log("deselctmem")
    },[isDeselected])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar backgroundColor={AppColors.Lavender} barStyle={'dark-content'} /> */}
            <InnerScreensHeader screenName={TranslationFile[language].NewGroup} navigation={props.navigation} />
            <View style={CreateGroupScreenStyle.container(AppColors.Lavender)}>
                <View style={CreateGroupScreenStyle.avatarAndNameContainer}>
                    <View style={CreateGroupScreenStyle.circleAroundGroupDp(AppColors.lightBlack2)}>
                        <View style={CreateGroupScreenStyle.groupDp(AppColors.lightBlack2)}>
                            {groupDisplayPic == '' ?
                                <Icons.Ionicons name='people' size={hp('4.5')} color={AppColors.white} />
                                :
                                <Image source={{ uri: `${groupDisplayPic.uri}` }} style={CreateGroupScreenStyle.groupDpImage} />
                            }
                        </View>
                        <TouchableOpacity onPress={handleSelectImage} style={[
                            CreateGroupScreenStyle.editIconBtn,
                            { position: 'absolute', right: 0, bottom: 0 },
                        ]}>
                            <Icons.MaterialIcons name="edit" size={12} color="white" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        value={groupName}
                        placeholder={TranslationFile[language].Group_Name}
                        cursorColor={AppColors.primary}
                        placeholderTextColor={AppColors.black}
                        style={CreateGroupScreenStyle.enterNameTextinput}
                        textAlign='center'
                        autoFocus={true}
                        onChangeText={e => { setgroupName(e) }}
                    />
                    <Text style={CreateGroupScreenStyle.msgText}>{TranslationFile[language].Provide_a_group_subject}</Text>
                </View>
                <View style={CreateGroupScreenStyle.participantsSectionContainer}>
                    <View style={CreateGroupScreenStyle.participantsTextContainer}>
                        <Text style={CreateGroupScreenStyle.participantsText}>{TranslationFile[language].Participants} </Text>
                        {/* <View style={CreateGroupScreenStyle.participantsNumberContainer}>
                            <Text style={CreateGroupScreenStyle.participantsNumber}>{selectedMembers.length - 1}</Text>
                        </View> */}
                        <Badge
                size={wp('7.1')}
                visible={true}
                style={{ backgroundColor: AppColors.primary,alignSelf:'center',justifyContent:'center' ,alignItems:'center'}}
              >
                <Text style={{alignSelf:'center',fontSize: hp('2.1'),}}>{selectedMembers.length - 1}</Text>
                
              </Badge>

                    </View>
                    <FlatList
                        data={selectedMembers.filter(item => item._id !== currentUser.userId)}
                        numColumns={4}
                        keyExtractor={item => item._id}
                        // contentContainerStyle={{backgroundColor:'red',paddingHorizontal:wp('5')}}
                        renderItem={({ item }) => {
                            return (
                                <View key={item._id} style={[CreateGroupScreenStyle.nameAndDpOfSelected]}>
                                    <View style={{ position: 'relative' }}>
                                        <View style={CreateGroupScreenStyle.circleAroundMemberDp}>
                                            {!item.profileImage ?
                                                <View style={CreateGroupScreenStyle.memberDp}>
                                                    <Icons.MaterialIcons name={'person'} size={29} color={theme.profileNameColor} />
                                                </View>
                                                : <Image style={CreateGroupScreenStyle.memberDp} source={{ uri: `${baseUrl}${item.profileImage}` }} />
                                            }
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            deselectMember(item);
                                            setIsDeselected(true)
                                        }} style={CreateGroupScreenStyle.deSelectIconBtn}>
                                            <Icons.AntDesign name="close" size={10} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={CreateGroupScreenStyle.memberName}>
                                        {item.name ? (item.name.length > 7 ? capitalizeFirstLetter(item.name.substring(0, 7)) + '..' : capitalizeFirstLetter(item.name)) : 'no user name'}
                                    </Text>
                                </View>
                            )
                        }}

                    />

                    <FAB
                        loading={isCreating}
                        icon="check"
                        style={CreateGroupScreenStyle.fab}
                        onPress={() => createNewGroup(groupName)}
                        color={AppColors.white}
                    />
                </View>
            </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default NewGroup