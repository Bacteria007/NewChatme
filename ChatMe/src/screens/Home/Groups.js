import React from 'react'
import { View ,Text} from 'react-native'
const Groups = () => {
  return (
    <View>
        <Text>Groups</Text>
    </View>
  )
}

export default Groups






// import React from 'react'
// import { FlatList, Image, Text,TouchableOpacity,View } from 'react-native'
// import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
// // import AppHeader from './AppHeader'


// const Chats = () => {

    
//     const allChats=[
//         {dpImage:require('../../assets/imges/w11.jpg'),profileName:'Aqsa',lastMsg:'Hello Afshan',},
//         {dpImage:require('../../assets/imges/w11.jpg'),profileName:'Aqsa',lastMsg:'Hello Afshan',},
    
//         {dpImage:require('../../assets/imges/girlGuitar.jpg'),profileName:'Afshan',lastMsg:'Hello Afshan',},
//         {dpImage:require('../../assets/imges/mic.jpg'),profileName:'Hina',lastMsg:'Hello Afshan',},
//         {dpImage:require('../../assets/imges/mic.jpg'),profileName:'Hina',lastMsg:'Hello Afshan',},
     
//         {dpImage:require('../../assets/imges/bacteria.jpeg'),profileName:'Rabia',lastMsg:'Hello Afshan',},
//     ]

//     const renderItem=({item})=>{
//         return (
//             <TouchableOpacity>
//             <View style={{height:hp('11%'),width:wp('100%'),
//             // backgroundColor:"rgba(255,255,255,0.5)",
//             // borderBottomWidth:0.3,borderBottomColor:"dimgrey"
//             }}
//             >
//             <View style={{height:hp('11%'),width:wp('100%'),flexDirection:"row",alignItems:'center'}}>
//                 <View style={{marginLeft:10}}><TouchableOpacity><Image source={item.dpImage} style={{height:hp('6%'),width:wp('12%'),borderRadius:25}}/></TouchableOpacity></View>
//                 <View style={{flexDirection:'column',marginLeft:10}}>
//                   <Text style={{fontFamily:"Poppins-Regular",color:'black',fontSize:17,}}>{item.profileName}</Text>
//                     <Text style={{fontFamily:"Poppins-Regular",color:'grey',fontSize:11,}}>{item.lastMsg}</Text>
//                 </View>
//                 </View>
//             </View>
//             </TouchableOpacity>
//         )
//     }
//   return (
   
      
//     <View style={{flex:1,backgroundColor:"white"}}>
//     {/* <AppHeader title={"CHATME"} /> */}

//    <FlatList
//    data={allChats}
//    renderItem={renderItem}
   
//    />
//    </View>
//   )
// }

// export default Chats