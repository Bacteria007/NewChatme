const GenerateVideoHtml=(baseUrl, item, autoplay = false,muted=false) => `
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <video ${autoplay ? 'autoplay' : ''} controls  ${muted ? 'muted' : ''}>
    <source src="${baseUrl}${item.uri.uri}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>
`;

export default GenerateVideoHtml;