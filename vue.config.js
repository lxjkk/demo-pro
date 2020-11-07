const webpack = require('webpack')
const Timestamp = new Date().getTime()
module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称
      filename: `js/[name]${Timestamp}.js`,
      chunkFilename: `js/[name]${Timestamp}.js`
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // 必须大于或等于 1
        minChunkSize: 1000
      })
    ]
  }
}
