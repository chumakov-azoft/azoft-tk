const CompressionWebpackPlugin = require('compression-webpack-plugin')
const manifestJSON = require('./public/manifest.json')
// плагин для контроля содержания бандлов:
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
let plugins = []
if (process.env.NODE_ENV === 'production') {
  const compressionTest = /\.(js|css|txt|html|ico|svg)(\?.*)?$/i
  plugins = [
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new CompressionWebpackPlugin({
      compressionOptions: {
        numiterations: 15
      },
      minRatio: 0.99,
      test: compressionTest
    })
  ]
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: false,
  configureWebpack: {
    plugins
  },
  devServer: {
    disableHostCheck: true
  },
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
      exclude: /\.json$/
    }
  }
}
