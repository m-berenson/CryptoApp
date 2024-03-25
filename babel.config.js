module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    // react-native-reanimated/plugin has to be listed last.
    'react-native-reanimated/plugin',
  ],
}
