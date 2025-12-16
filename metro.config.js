const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Füge den SignalProtocolReactLib Pfad zu den watchFolders hinzu
const signalLibPath = path.resolve(__dirname, '../SignalProtocolReactLib');

config.watchFolders = [signalLibPath];

// Konfiguriere den Resolver für Symlinks
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../SignalProtocolReactLib/node_modules'),
  ],
  extraNodeModules: {
    'signal-protocol-react-lib': signalLibPath,
  },
};

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
