module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-selector-namespace')({
      namespace: '#singlevue'
    })
  ]
}