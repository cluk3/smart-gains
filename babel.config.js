module.exports = function (api) {
  api.cache(true);
  const plugins = [
    // !!! react-native-reanimated/plugin has to be listed last.
    'react-native-reanimated/plugin',
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
