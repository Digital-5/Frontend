module.exports = function (api) {
  api.cache(true);

  // Use Expo's preset so React Native + Flow/TS code is compiled correctly
  return {
    presets: ['babel-preset-expo'],
  };
};
