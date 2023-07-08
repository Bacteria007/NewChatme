import { View } from 'react-native'
import React,{useContext} from 'react'
import AppContext from "../../context/AppContext";


  const BgTheme=()=>{

  const {darkThemeActivator}=useContext(AppContext)
  console.log(darkThemeActivator)
  return darkThemeActivator

}

export default BgTheme