//行内样式里面的px不转
module.exports = {
  plugins: {
    //   VueCLI内部已经配置了autoprefixer插件
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      //vant是基于375写的
      //   rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
