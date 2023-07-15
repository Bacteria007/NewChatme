import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontStyle from '../../assets/styles/FontStyle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CallsScreenHeader from '../../components/Headers/CallsHeader/CallsScreenHeader';
import { Shadow } from 'react-native-neomorph-shadows-fixes';
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';

const Calls = ({ navigation }) => {
  //STATES
  const { theme } = useContext(ThemeContext);
  const [searchedCalls, setSearchedCalls] = useState([]); // USE STATE FOR SEARCHING TEXT
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [allCalls, setAllCalls] = useState([
    {
      callerDpImage: require('../../assets/imges/w11.jpg'),
      callerName: 'Edgar',
      callCategory:'audio',
      callType: 'outgoing',
      callStatus: 'accepted',
      callTime: '9/24/2112',
      callerId: 'd9ea9b4d-586f-5b0a-a9ca-9af7edc39227'
    },
    {
      callerDpImage: require('../../assets/imges/w11.jpg'),
      callerName: 'Edgar Ellon',
      callCategory:'video',
      callType: 'incoming',
      callStatus: 'accepted',
      callTime: '9/24/2112',
      callerId: 'd9ea9b4d-586f-5b0a-a9ca-9af7edc39227'
    },
    {
      callerDpImage: require('../../assets/imges/w11.jpg'),
      callerName: 'Edgar Ellon',
      callCategory:'video',
      callType: 'incoming',
      callStatus: 'rejected',
      callTime: '9/24/2112',
      callerId: 'd9ea9b4d-586f-5b0a-a9ca-9af7edc39227'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Victor',
      callCategory:'video',
      callType: 'incoming',
      callStatus: 'accepted',
      callTime: '5/15/2104',
      callerId: '111d3058-ffe1-5cc7-93ca-8addbe091c44'
    },
    {
      callerDpImage: require('../../assets/imges/w11.jpg'),
      callerName: 'Andrew',
      callType: 'incoming',
      callStatus: 'rejected',
      callTime: '5/19/2111',
      callerId: '879a38cc-8e9b-5eec-9628-d30680539cc5'
    },
    {
      callerDpImage: require('../../assets/imges/girlGuitar.jpg'),
      callerName: 'Cynthia',
      callCategory:'video',
      callType: 'incoming',
      callStatus: 'rejected',
      callTime: '9/19/2110',
      callerId: 'c981911a-2175-54a4-b346-2037f0c2b262'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'James',
      callCategory:'audio',
      callType: 'outgoing',
      callStatus: 'accepted',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Medicine Jhon',
      callType: 'outgoing',
      callCategory:'video',
      callStatus: 'rejected',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Medicine Jhon',
      callType: 'outgoing',
      callCategory:'video',
      callStatus: 'rejected',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Medicine Jhon',
      callType: 'outgoing',
      callCategory:'video',
      callStatus: 'rejected',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Aristotle',
      callCategory:'audio',
      callType: 'outgoing',
      callStatus: 'accepted',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Aristotle',
      callCategory:'audio',
      callType: 'outgoing',
      callStatus: 'accepted',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
    {
      callerDpImage: require('../../assets/imges/mic.jpg'),
      callerName: 'Aristotle',
      callCategory:'audio',
      callType: 'outgoing',
      callStatus: 'accepted',
      callTime: '12/15/2034',
      callerId: '0ba5b1c4-f29b-5d57-be16-4932366aef21'
    },
  ]);
  //FUNCTIONS
  const deleteCall = (item) => {
    const upDatedCalls = allCalls.filter((element) => element.callerId !== item.callerId);
    setAllCalls(upDatedCalls);
  }
  const handleLongPress = (item) => {
    // toggleLongPressModal();
    Alert.alert(
      'Delete Call', '',
      [{ text: 'Delete', onPress: () => { deleteCall(item) } }],
      { cancelable: true },
    )
  }
  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      // If search query is empty, show all users
      setSearchedCalls(allCalls);
    } else {
      // Filter users based on search query
      const filteredCalls = allCalls.filter(user =>
        user.callerName.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedCalls(filteredCalls);
    }
  };
  const callIcon = (item) => {
   const iconSize=hp('2.5%')
    if ((item.callType === 'incoming') && (item.callStatus === 'accepted')) {
      return( <Icons.MaterialCommunityIcons
        name='call-received'
        color={'green'}
        size={iconSize}
      />)
    } else if ((item.callType === 'incoming') && (item.callStatus ==='rejected')) {

      return (  <Icons.MaterialCommunityIcons
        name='call-received'
        color={'red'}
        size={iconSize}
      />)

    } else if ((item.callType === 'outgoing') && (item.callStatus === 'accepted')) {

      return ( <Icons.MaterialCommunityIcons
        name='call-made'
        color={'green'}
        size={iconSize}
      />)

    } else if ((item.callType === 'outgoing') && (item.callStatus === 'rejected')) {

      return ( <Icons.MaterialCommunityIcons
        name='call-made'
        color={'red'}
        size={iconSize}
      />)

    }

  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('UserChat', { item: item });
        // }}
        onLongPress={() => handleLongPress(item)}

      >
        <View
          style={HomeNeoCards.flatlistItemContainer}>
          {/* discussion content container */}
          <Shadow swapShadows style={[HomeNeoCards.shadowStyle, { backgroundColor: theme.discussionsCardColor }]}>
            {/* <Neomorph lightShadowColor="#e2e2e2" darkShadowColor='#000' inner style={[HomeNeoCards.neomorphStyle,{backgroundColor:theme.discussionsCardColor}]} > */}
            <View style={HomeNeoCards.dpImageView}>
              <TouchableOpacity>
                <Image
                  source={item.callerDpImage}
                  style={HomeNeoCards.dpImage}
                />
              </TouchableOpacity>
            </View>
            {/* msg view */}
            <View style={HomeNeoCards.name_CallIcon_Container}>
              <View style={HomeNeoCards.nameAndTimeContainer}>
                <Text
                  style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                  {item.callerName}
                </Text>
                <View style={HomeNeoCards.timeAndCallType}>
                {callIcon(item)}
                <Text
                  style={[HomeNeoCards.lastMsg, { color: theme.lastMsg }]}>
                  {item.callTime}
                </Text>
                
                </View>
              </View>
              <View style={HomeNeoCards.callIconView}>
                {item.callCategory==='audio'?<Icons.Ionicons name='call-sharp' size={wp('6%')} color={AppColors.black}/>:<Icons.FontAwesome5 name="video" size={wp('5%')} color={AppColors.black} />
}
              </View>
            </View>

          </Shadow>
          {/* </Neomorph> */}

        </View>
      </TouchableOpacity>

    );
  };

  return (

    <View style={HomeNeoCards.wholeScreenContainer}>
      {  /*start  top itny %, left %  ---  end bottom , left */}
      <LinearGradient colors={[theme.linearBlue, theme.linearPink]} start={{ x: 0.0, y: 0.0 }} end={{ x: 1, y: 1 }} locations={[0.3, 0.9]}
        style={StyleSheet.absoluteFillObject}
      />
      <CallsScreenHeader navigation={navigation} headerTitle={"Calls"} handleSearchOnChange={handleSearch} searchQuery={searchText} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedCalls == '' ?  allCalls : searchedCalls}
        renderItem={renderItem}
        keyExtractor={(item) => { item.callerId.toString() }}
      // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
      />

      {/* </LinearGradient> */}
      {/* </SafeAreaView> */}
    </View>
  )
}

export default Calls
const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1
  },
  textstyle: {
    fontSize: 20, fontFamily: FontStyle.boldItalicFont, color: 'white'
  }
})