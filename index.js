const env = require('babel-preset-env')
const react = require('babel-preset-react')

const moduleResolver = require('babel-plugin-module-resolver').default

const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread')
const transformExponentiationOperator = require('babel-plugin-transform-exponentiation-operator')

module.exports = function (context, opts) {
  const alias = {
    src: './src'
  }

  return {
    presets: [
      env,
      react
    ].filter(Boolean),
    plugins: [
      [moduleResolver, { alias: alias }],
      transformObjectRestSpread,
      transformExponentiationOperator
    ].filter(Boolean)
  }
}
