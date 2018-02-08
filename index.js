const DEV = process.env.NODE_ENV !== 'production'

module.exports = function getPreset(context, opts) {
  const targets = opts && opts.targets
  const alias = {
    src: './src',
  }
  const node = {
    targets: { node: 'current' },
  }
  const browser = {
    targets,
    useBuiltIns: false,
    modules: false,
    loose: true,
  }

  return {
    presets: [
      [require.resolve('babel-preset-env'), targets ? browser : node],
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-2'),
    ],
    plugins: [
      [require.resolve('babel-plugin-module-resolver'), { alias }],
      require.resolve('babel-plugin-universal-import'),
      !targets && require.resolve('babel-plugin-dynamic-import-node'),
      [
        require.resolve('babel-plugin-transform-react-jsx'),
        { useBuiltIns: true },
      ],
      DEV && require.resolve('babel-plugin-transform-react-jsx-source'),
      DEV && require.resolve('babel-plugin-transform-react-jsx-self'),
    ].filter(Boolean),
    env: {
      development: {
        plugins: [
          'react-hot-loader/babel',
        ],
      },
    },
  }
}
