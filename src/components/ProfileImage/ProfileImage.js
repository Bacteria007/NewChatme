import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

const ProfileImage = () => {
    const { token, baseUrl,currentUser,selectedImageUri,storeImageUri } = useContext(AppContext);

     useEffect(()=>{
        fetch(`${baseUrl}/getProfileImage?userId=${currentUser.userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
            console.log('res aya',data)
            storeImageUri(data.profileImage);
          })
          .catch(error => console.log("res error",error));
    
      },[])
    
  return (
    <View>
    {selectedImageUri === '' ? (
        <Image
          source={require('../../assets/imges/defaultProfile/defaultDP.jpg')}
          style={{
            height: wp('25%'),
            width: wp('25%'),
            borderRadius: wp('100%'),
          }}
        />
      ) : (
        // console.log(`img${selectedImageUri}`)
        <Image
          source={{ uri: `${baseUrl}${selectedImageUri}` }}
          style={{
            height: wp('25%'),
            width: wp('25%'),
            borderRadius: wp('100%'),
          }}
        />
        )}

</View>
  )
}

export default ProfileImage