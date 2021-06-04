module.exports = {
    plugins: {
      // 兼容厂商浏览器版本 自动添加前缀  vue-cli已经在.browserslistrc文件中配置过
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      // px 转化为 rem
      'postcss-pxtorem': {
        // 转换的跟元素的基准值  正常情况是按设计稿来
        // 750宽的设计稿  width/10  75
        // 320宽的设计稿  widt/10  32
        // 375宽的设计稿  widt/10  37.5
        // 移动端 一般都是1⃣️iPhone678来设计的
        // vant是基于375
        rootValue: 37.5,
        // 需要转换的属性
        propList: ['*']
      }
    }
  }