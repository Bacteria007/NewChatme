import {View,Image, Text,FlatList} from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import InnerScreensHeader from '../../../components/Headers/InnerHeaders/InnerScreensHeader';

const MyActivity = ({navigation}) => {
  const [allUploads, setAllUploads] = useState([
    {
      video: require('../../../assets/imges/w11.jpg'),
    },
    {
      video: require('../../../assets/imges/girlGuitar.jpg'),
    },
    {
      video: require('../../../assets/imges/mic.jpg'),
    },
    {
      video: require('../../../assets/imges/w11.jpg'),
    },
    {
      video: require('../../../assets/imges/bacteria.jpeg'),
    },
    {
      video: require('../../../assets/imges/mic.jpg'),
    },
    {
      video: require('../../../assets/imges/w11.jpg'),
    },
    {
      video: require('../../../assets/imges/mic.jpg'),
    },
  ]);
  return (
    <View>
      <InnerScreensHeader navigation={navigation} screenName='My uploads' />
      <FlatList 
      data={allUploads}
      numColumns={3}
      renderItem={({item})=>{
        return(
          <View style={{height:wp('34%'),width:wp('34%')}}>
            <Image source={item.video} style={{ height: wp('33%'), width: wp('33%') }}/>
          </View>
        )
      }}
      />
    </View>
  );

}

export default MyActivity