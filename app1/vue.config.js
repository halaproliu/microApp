const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  devServer: {
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('mf')
      .use(require('webpack').container.ModuleFederationPlugin, [
        {
          name: 'app1',
          shared: {
            vue: {
              eager: true,
              singleton: true
            }
          }
        }
      ]);
  },
  configureWebpack: {
    devtool: 'inline-source-map',
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
};
