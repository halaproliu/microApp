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
        name: 'app1'
      }])
  },
  configureWebpack: {
    devtool: 'inline-source-map'
  }
}