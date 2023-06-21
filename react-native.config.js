module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ["./src/assets/fonts/"], // stays the same

  //'''''''''''''for vector icons nechy
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};