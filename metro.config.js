const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Deaktiviere Hermes für Web-Platform
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
