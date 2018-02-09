module.exports = function getPreset() {
  return {
    presets: [
      'babel-preset-env',
      'babel-preset-react',
      'babel-preset-stage-2',
    ].map(require.resolve),
    plugins: [
      [
        require.resolve('babel-plugin-universal-import'),
        {
          disableWarnings: true,
        },
      ],
    ],
    env: {
      development: {
        plugins: [
          'react-hot-loader/babel',
        ].map(require.resolve),
      },
    },
  }
}
