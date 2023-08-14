import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebViews = () => {

  // Specify the uri of the local video file
  const localVideoUri = require('../../assets/video/Whatsapp_20220923051345.mp4'); // Use require to get the uri

  // Create an HTML string to embed the video using an iframe
  const htmlContent = `
    <html>
      <body style="margin: 0; display: flex; align-items: center; justify-content: center;">
        <video controls autoplay style="width: 100%;height: 100%;">
          <source src="${localVideoUri}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `;

  return <WebView
  source={{html:htmlContent}} style={styles.container} 
  originWhitelist={['*']}
  />;
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyWebViews;
