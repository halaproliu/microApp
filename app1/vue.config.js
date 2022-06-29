module.exports = {
  // outputDir: '',
  // publicPath: '/app1',
  devServer: {
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    devtool: 'inline-source-map'
  }
}