import { resolve } from './utils'
import { Configuration as WebpackConfiguration } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { VueLoaderPlugin } from 'vue-loader'
import webpack from 'webpack'
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { ModuleFederationPlugin } = webpack.container

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      '@': resolve('../src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx?|tsx?)$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader'
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('../src/assets/svg')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[base]',
        },
        exclude: [resolve('src/assets/svg')],
      },
      // element-plus
      {
        test: /\.mjs$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
        type: 'javascript/auto',
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: 'index.html'
    }),
    new ModuleFederationPlugin({
      name: 'app4',
      shared: {
        vue: {
          eager: true,
          singleton: true
        }
      }
    }),
    // element-plus 按需引入
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),

  ],
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 8004,
    open: true,
    hot: true,
    allowedHosts: 'all',
    compress: true, // 为所有服务启用gzip 压缩
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

export default config