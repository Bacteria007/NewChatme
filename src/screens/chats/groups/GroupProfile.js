import React, { useContext } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';
import AppContext from '../../../context/AppContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import AppColors from '../../../assets/colors/Appcolors';
import { ThemeContext } from '../../../context/ThemeContext';
import { Image } from 'react-native';
import FontStyle from '../../../assets/styles/FontStyle';
import { Divider, List } from 'react-native-paper';
import GroupHeaderStyle from '../../../assets/styles/GroupScreenStyle/GroupHeaderStyle';
import UserChatHeaderStyle from '../../../assets/styles/UserChatHeaderStyle';

const GroupProfile = (props) => {
  const { baseUrl, currentUser, token } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const userId = currentUser.userId;
  const { data } = props.route.params;
  console.log("group profile--", data)



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView style={{ flex: 1 }}>
        <InnerScreensHeader navigation={props.navigation} screenName={"Group Details"} />
        <Image
          source={{ uri: `${baseUrl}${data.group_dp}` }}
          style={{
            height: hp('30%'),
            width: wp('100%'),
            resizeMode: 'cover',
          }}
        />
        <View style={{ flexDirection: 'row', width: wp('100'), paddingTop: hp('2.5') }}>
          <View style={{ justifyContent: 'center', width: wp('20'), alignItems: 'center' }}>
            <Image style={[{ height: hp('7%'), width: hp('7%'), borderRadius: wp('100') }]}
              source={{ uri: `${baseUrl}${data.group_dp}` }}
            />
          </View>
          <View style={{ paddingHorizontal: wp('5'), flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <View>
              <Text
                style={[{ fontSize: wp('7'), opacity: 0.8, fontFamily: FontStyle.regularFont, color: theme.profileNameColor, }]}>
                {data.group_name}
              </Text>
              <Text
                style={[{ fontSize: wp('4.5'), fontFamily: FontStyle.regularFont, color: AppColors.primary, opacity: 0.7 }]}>
                {data.members.length} members
              </Text>
            </View>

          </View>
        </View>
        <MemebersList2 members={data.members} admin={data.admin} />
      </ScrollView>
    </SafeAreaView>

  );
};

export default GroupProfile;


const MemebersList = ({ members, admin }) => {

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      title="Show members"
      left={() => <List.Icon icon="folder" />}
      expanded={expanded}
      onPress={handlePress}>
      {members &&
        members.map((item) => (
          <List.Item title={item.name} />
        ))
      }
    </List.Accordion>
  );
};

const MemebersList2 = ({ members, admin }) => {

  const { baseUrl, currentUser } = useContext(AppContext);
  console.log("ii", admin)

  return (
    <View style={{
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: AppColors.white,
      padding: hp('3'),
    }}>
      <View style={GroupHeaderStyle.modalItem}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={members}
          renderItem={({ item, index }) => {
            return <View style={{ padding: 4 }}>
              <View style={GroupHeaderStyle.modalItemsContainer}>
                <View style={[UserChatHeaderStyle.dpImageStyle]}
                >

                  {item.profileImage &&
                    <Image
                      source={{ uri: `${baseUrl}${item.profileImage}` }}
                      style={[UserChatHeaderStyle.dpImageStyle]}
                    />}
                </View>
                {/* name and phoneNo view */}
                <View style={GroupHeaderStyle.nameAndPhone}>
                  <View style={GroupHeaderStyle.nameView}>
                    <Text
                      style={GroupHeaderStyle.nameStyle}>
                      {currentUser.name === item.name ? "You" : item.name}
                    </Text>
                    {item._id == admin &&  <View style={GroupHeaderStyle.adminBtn}>
                        <Text style={GroupHeaderStyle.adminText}>Admin</Text>
                      </View>
                    }
                  </View>
                  <Text style={GroupHeaderStyle.phoneText}>
                    {item.phoneNo}
                  </Text>
                </View>
              </View>
              {!(index == members.length - 1) && <Divider style={{ margin: wp('2') }} />}
            </View>
          }}
        />
      </View>
    </View>
  );
};