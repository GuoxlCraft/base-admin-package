/**
 * 该文件是生产环境的基础配置文件
 */

'use strict'

// webpack 自带模块
const path = require('path')

// 导入工具文件
const utils = require('./utils')

// 引入webpack
const webpack = require('webpack')

// 引入合并对象插件
const { merge } = require('webpack-merge')

// 引入配置文件
const config = require('../config')

// 引入基础配置文件
const baseWebpackConfig = require('./webpack.base.conf')

// 静态资源复制的插件
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// 用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// js压缩插件
const TerserWebpackPlugin = require('terser-webpack-plugin')

// css 出来插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const env = require('../config/' + process.argv[2] + '.env')
const bundleAnalyzerReport = process.argv[3] === 'report'
const isProduction = process.argv[2] === 'pro'

const webpackConfig = merge(baseWebpackConfig, {
  // 模式
  mode: isProduction ? 'production' : 'development',

  module: {
    rules: utils.styleLoaders({
      sourceMap: isProduction,
      extract: isProduction,
      usePostCSS: true
    })
  },

  // 是否使用source-map
  devtool: isProduction ? false : 'eval-cheap-module-source-map',

  // webpack输出路径和命名规则
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'main.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'element-ui':{
      commonjs: 'element-ui',
      commonjs2: 'element-ui',
      amd: 'element-ui'
    },
    echarts:{
      commonjs: 'echarts',
      commonjs2: 'echarts',
      amd: 'echarts'
    }
  },
  plugins: [
    // 环境变量
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
})

if (isProduction) {
  // 开发环境做的一些优化项
  webpackConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          // 生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        parallel: true,
        exclude: /[\\/]node_modules[\\/]/
      }),
      new CssMinimizerPlugin()
    ]
  }
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css')
    })
  )

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 是否开启打包体积预览
if (bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
