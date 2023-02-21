const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    headers: {  //允许跨域访问
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/feapi': {
        target: 'http://192.168.1.59:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/feapi': ""
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        utils: resolve('./src/utils'),
        assets: resolve('./src/assets'),
        store: resolve('./src/store'),
        api: resolve('./src/api'),
      }
    },
    plugins: [new NodePolyfillPlugin()],
  },
  chainWebpack(config) {
    config.plugin('compressionPlugin')
      .use(new CompressionWebpackPlugin({
        test: /\.(js|css|html)$/i,
        algorithm: "gzip",
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }))
      .end()
  }
})
