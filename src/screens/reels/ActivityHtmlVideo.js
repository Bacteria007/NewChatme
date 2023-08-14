// videoHtml.js

const ActivityVideoHtml = (baseUrl,item) => `
  <html>
  <head>
  <style>
  body {
    margin: 0;
    padding: 0;
  }
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;   
  }
 
  </style>
  </head>
  <body>
    <video controls muted>
    <source src="${baseUrl}${item.uri.uri}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </body>
  </html>
`;

export default ActivityVideoHtml;
