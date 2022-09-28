'use strict'
const path = require('path')
// const distName = process.argv[2]
// const apiconfig = require('../src/axios-config/config')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    // proxyTable: {
    //   '/cas': {
    //     target: 'http://192.168.169.206:22010/',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/cas': ''
    //     }
    //   }
    // },
    // Various Dev Server settings
    host: '0.0.0.0',
    port: 7009,
    autoOpenBrowser: false,
    poll: false,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist/index.html`),

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist`),
    assetsSubDirectory: '',
    assetsPublicPath: './',
    productionGzipExtensions: ['js', 'css']
  }
}
