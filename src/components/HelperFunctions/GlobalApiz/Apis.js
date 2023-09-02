import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../../context/AppContext";


const CommonApis = () => {
    
    // const baseUrl='http://192.168.43.122:8888';
    const [userData,setUserata]=useState()
    const { baseUrl ,currentUser,token} = useContext(AppContext);

    const UserDetails = async () => {
        // const userId = await AsyncStorage.getItem('user');
        // const parseId =await JSON.parse(userId)

        try {
            const user_data = await fetch(`${baseUrl}/getUserData/?userId=${currentUser.userId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data=await user_data.json()
            console.log("user id======================", currentUser.userId)
            console.log("user data============================", data)
            if(data.message=="Please provide a valid token."){
                Alert.alert("Provide a valid token.")
              }else if(data.message=='Please provide a token.'){
                Alert.alert('Token required')
              }
            else if (data) {
                console.log('admin result==========================', data);
                setUserata(data)
                return userData
            } else {
                console.log("no user data====================");
                return []
            }
        } catch (error) {
            console.log("error fetching user data",error);
        }
    }

    useEffect(()=>{
    UserDetails();
},[])
  return {
    UserDetails,
  };

}

export default CommonApis;