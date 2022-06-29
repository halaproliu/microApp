const {  override, overrideDevServer } = require('customize-cra')

const customizePlugin = () => config => {
  // config.output.publicPath = '/app2'
  return config
}

module.exports = {
  webpack: override(
    customizePlugin()
  ),
  devServer: overrideDevServer(
    config => {
      config.port = 8002
      config.headers = config.headers || {}
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config
    }
  )
}