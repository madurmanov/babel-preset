const env = process.env.BABEL_ENV || process.env.NODE_ENV
const dev = env !== 'production'

module.exports = function getPreset(context, opts) {
  if (opts && opts.library) {
    const options = {
      targets: {
        browsers: [
          'last 2 versions',
          'safari >= 7',
          'ie 11',
        ],
      },
      loose: true,
    }

    return {
      presets: [
        [require.resolve('babel-preset-env'), options],
      ],
      plugins: [
        require.resolve('babel-plugin-syntax-object-rest-spread'),
        require.resolve('babel-plugin-syntax-export-extensions'),
        require.resolve('babel-plugin-syntax-class-properties'),

        [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
        require.resolve('babel-plugin-transform-export-extensions'),
        require.resolve('babel-plugin-transform-class-properties'),
      ],
    }
  }

  const targets = opts && opts.targets
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
    ],
    plugins: [
      require.resolve('babel-plugin-universal-import'),
      targets && require.resolve('babel-plugin-syntax-dynamic-import'),
      !targets && require.resolve('babel-plugin-dynamic-import-node'),

      require.resolve('babel-plugin-syntax-object-rest-spread'),
      require.resolve('babel-plugin-syntax-export-extensions'),
      require.resolve('babel-plugin-syntax-class-properties'),

      [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
      require.resolve('babel-plugin-transform-export-extensions'),
      require.resolve('babel-plugin-transform-class-properties'),

      [require.resolve('babel-plugin-transform-react-jsx'), { useBuiltIns: true }],
      dev && require.resolve('babel-plugin-transform-react-jsx-source'),
      dev && require.resolve('babel-plugin-transform-react-jsx-self'),
    ].filter(Boolean),
  }
}
