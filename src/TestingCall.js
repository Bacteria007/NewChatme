import React, { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import  { AgoraView,createAgoraRtcEngine,IRtcEngine } from 'react-native-agora';

const TestingCall = () => {
  const appId = '83d6cd3997e244c9bb3aa8c280fde5f4';
  const agoraUid = '123'; // Your unique identifier for the Agora user
  const agoraEngineRef = useRef(IRtcEngine); // Agora engine instance
  agoraEngineRef.current = createAgoraRtcEngine();
  const agoraEngine = agoraEngineRef.current;

  const startCall = () => {
    agoraEngine.create(appId);

    agoraEngine.enableVideo();
    agoraEngine.enableAudio();

    agoraEngine.joinChannel(appId, 'rest', null, agoraUid);

    agoraEngine.startPreview();
  };

  const endCall = () => {
    agoraEngine.leaveChannel();
    agoraEngine.destroy();
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={startCall}>
        <Text>Start Call</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={endCall}>
        <Text>End Call</Text>
      </TouchableOpacity>

      <AgoraView
        style={{ flex: 1 }}
        mode={1}
        remoteUid={null}
        zOrderMediaOverlay={true}
        showLocalVideo={true}
      />
    </View>
  );
};

export default TestingCall;