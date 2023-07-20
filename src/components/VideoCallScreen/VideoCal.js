import React, {useContext} from 'react';
import {Text} from 'react-native';
import AgoraUIKit, {AgoraUIKitProps} from 'agora-rn-uikit';


const VideoCal = (props) => {

  const {connectionData,rtcCallbacks}=props.route.params;
  
  // const props: AgoraUIKitProps = {
   
  // };
  return  (
    <AgoraUIKit
      connectionData={connectionData}
      rtcCallbacks={rtcCallbacks}
    />
  ) 
};
export default VideoCal;