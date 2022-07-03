const pkg = require('./package.json')
module.exports = {
  devServer: {
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  chainWebpack: config => {
    config
      .plugin('mf')
      .use(require('webpack').container.ModuleFederationPlugin, [{
        name: 'app1',
        shared: {
          vue: {
            eager: true,
            singleton: true
          }
        }
      }])
  },
  configureWebpack: {
    devtool: 'inline-source-map'
  }
}