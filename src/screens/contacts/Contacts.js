import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CallsScreenHeader from '../../components/Headers/CallsHeader/CallsScreenHeader';
import { Neomorph } from 'react-native-neomorph-shadows-fixes';
import { Card } from "react-native-paper";
import HomeNeoCards from '../../assets/styles/homeScreenCardStyles/HomeNeoCards';
import { ThemeContext } from '../../context/ThemeContext';
import { Icons } from '../../assets/Icons';
import AppColors from '../../assets/colors/Appcolors';

const Contacts = ({ navigation }) => {
  //STATES
  const { theme, darkThemeActivator } = useContext(ThemeContext);
  const [searchedCalls, setSearchedCalls] = useState([]); // USE STATE FOR SEARCHING TEXT
  const [searchText, setSearchText] = useState(''); // USE STATE FOR SEARCHING TEXT
  const [allContacts, setAllContacts] = useState([
    {
      contactDpImage: require('../../assets/imges/w11.jpg'),
      contactName: 'Edgar',
      contactBio: 'horn dried next religious avoid future trunk cross plus invented pink truck dozen soap birth friend swam loose bare tomorrow serious design planet combination',
      contactId: '5b96840d-6dbe-53fb-9463-cc04dc0c71fd'
    },
    {
      contactDpImage: require('../../assets/imges/w11.jpg'),
      contactName: 'Warren',
      contactBio: 'cave post amount children key should explore powerful flow exact third couple throat serious could living seen car depend than factor scene flag scale',
      contactId: 'ea503d8d-8ba5-56da-9290-d78de745dd6d'
    },
    {
      contactDpImage: require('../../assets/imges/w11.jpg'),
      contactName: 'Max',
      contactBio: 'courage care us corn large snow introduced pupil sold flag till author tip form shoe swim itself popular live planned even tube mean principle',
      contactId: 'd9ebe95d-5138-5eee-8397-7325a3a81eec'
    },
    {
      contactDpImage: require('../../assets/imges/w11.jpg'),
      contactName: 'Loretta',
      contactBio: 'vapor front beat power route mathematics order note grew tape bottle brother native fierce dance cat spider smooth well which chicken useful represent dog',
      contactId: '71596bf7-8d2f-57c1-abc6-21180070c2c3'
    },
    {
      contactDpImage: require('../../assets/imges/w11.jpg'),
      contactName: 'Edgar',
      contactBio: 'cloud held built movement write race progress stone flat better health moment oxygen ahead usual struggle until cool customs question level wire meet layers',
      contactId: '07b5f38c-dc7a-54b3-8815-fc17d2e75eca'
    },

  ]);
  //FUNCTIONS
  const deleteCall = (item) => {
    const upDatedCalls = allContacts.filter((element) => element.contactId !== item.contactId);
    setAllContacts(upDatedCalls);
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
      setSearchedCalls(allContacts);
    } else {
      // Filter users based on search query
      const filteredCalls = allContacts.filter(user =>
        user.contactName.toLowerCase().includes(text.toLowerCase()),         // NAME KI BASE PR SEARCH HO RAHI HAI
      );
      setSearchedCalls(filteredCalls);
    }
  };
  const callIcon = (item) => {
    const iconSize = hp('2.5%')
    if ((item.callType === 'incoming') && (item.callStatus === 'accepted')) {
      return (<Icons.MaterialCommunityIcons
        name='call-received'
        color={'green'}
        size={iconSize}
      />)
    } else if ((item.callType === 'incoming') && (item.callStatus === 'rejected')) {

      return (<Icons.MaterialCommunityIcons
        name='call-received'
        color={'red'}
        size={iconSize}
      />)

    } else if ((item.callType === 'outgoing') && (item.callStatus === 'accepted')) {

      return (<Icons.MaterialCommunityIcons
        name='call-made'
        color={'green'}
        size={iconSize}
      />)

    } else if ((item.callType === 'outgoing') && (item.callStatus === 'rejected')) {

      return (<Icons.MaterialCommunityIcons
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
          {!darkThemeActivator ?
            <Neomorph lightShadowColor="#e2e2e2" darkShadowColor='#000' inner style={[HomeNeoCards.neomorphStyle, { backgroundColor: theme.discussionsCardColor }]} >
              <View style={HomeNeoCards.dpImageView}>
                <TouchableOpacity>
                  <Image
                    source={item.contactDpImage}
                    style={HomeNeoCards.dpImage}
                  />
                </TouchableOpacity>
              </View>
              {/* msg view */}
              <View style={HomeNeoCards.nameAndMsgContainer}>
                <Text
                  style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                  {item.contactName}
                </Text>
                <Text
                  style={[HomeNeoCards.lastMsg, { color: theme.profileName }]}>
                  {(item.contactBio).substring(0, 35)}....
                </Text>

              </View>

            </Neomorph>
            :
            <Card style={HomeNeoCards.cardStyle}>
              <View style={HomeNeoCards.cardView}>
                <View style={HomeNeoCards.dpImageView}>
                  <TouchableOpacity>
                    <Image
                      source={item.contactDpImage}
                      style={HomeNeoCards.dpImage}
                    />
                  </TouchableOpacity>
                </View>
                {/* msg view */}
                <View style={HomeNeoCards.nameAndMsgContainer}>
                  <Text
                    style={[HomeNeoCards.profileName, { color: theme.profileName }]}>
                    {item.contactName}
                  </Text>
                  <Text
                    style={[HomeNeoCards.lastMsg, { color: theme.headerSearchText }]}>
                    {(item.contactBio).substring(0, 35)}....
                  </Text>

                </View>

              </View></Card>
          }
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
      <CallsScreenHeader navigation={navigation} headerTitle={"Contacts"} handleSearchOnChange={handleSearch} searchQuery={searchText} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedCalls == '' ? allContacts : searchedCalls}
        renderItem={renderItem}
        keyExtractor={(item) => { item.contactId.toString() }}
      // onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
      />

      {/* </LinearGradient> */}
      {/* </SafeAreaView> */}
    </View>
  )
}

export default Contacts;