// 在 eslintrc.js 关闭
const path = require('path')

module.exports = {
  // 1. 配置方式一：CLI提供的属性
  publicPath: './',
  // 2. 配置方式二: 和 webpack属性完全一致，最后进行合并. 参考: https://cli.vuejs.org/zh/config/#configurewebpack
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components',
  //     },
  //   },
  // },
  // 3.配置方式三: 链式编程
  chainWebpack(config) {
    return config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
}
