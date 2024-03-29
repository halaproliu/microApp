module.exports = {
  // outputDir: 'root',
  // publicPath: '/root/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 8000,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '个人技术文章记录'
      return args
    })
  }
}