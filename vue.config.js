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
  }
}
