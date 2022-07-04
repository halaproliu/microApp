const path = require('path');
const minimist = require('minimist')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const rawArgv = process.argv.slice(2)
const argv = minimist(rawArgv)
const mode = argv.mode
const basePath = path.resolve(__dirname, `.env${mode ? `.${mode}` : ``}`)
const localPath = `${basePath}.local`
const loadEnv = envPath => {
  try {
    const env = dotenv.config({ path: envPath })
    dotenvExpand(env)
  } catch (err) { }
}

if (mode) {
  const commonPath = path.resolve(__dirname, '.env')
  loadEnv(commonPath)
}
loadEnv(basePath)
loadEnv(localPath)

const isProduction = mode === 'production'
module.exports = (env = {}) => ({
  mode,
  cache: false,
  devtool: 'source-map',
  optimization: {
    minimize: false,
    splitChunks: false,
    runtimeChunk: false
  },
  target: 'web',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    libraryExport: 'default', // 支持vite-plugin-federation必须，指定只导出指定子模块
    publicPath: isProduction ? 'http://liuwenjian.cn:8010/' : 'http://localhost:8010/'
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: '@vue/runtime-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    new ModuleFederationPlugin({
      name: 'comp',
      filename: 'remoteEntry.js',
      library: {
        type: 'umd',
        name: 'comp'
      }, // type必须为umd或者window才能在micro-app中使用
      exposes: {
        './Button': './src/components/Button',
      },
      shared: {
        vue: {
          requiredVersion: '^3.0.0'
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8010,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
