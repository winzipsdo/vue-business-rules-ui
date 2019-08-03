module.exports = {
  // 在开发时注释、build时取消注释
  publicPath: 'vue-business-rules-ui',
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  },
};
