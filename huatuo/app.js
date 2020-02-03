//app.js
App({
  api: {
    isProdEnv: false,
    devUrl: 'https://huatuo-test.app77.cn',
    prodUrl: 'https://huatuo.app77.cn'
  },
  globalData: {
    appId: 'wx9812117be87d24d2',
    prodVersion: false,
    userInfo: null
  },
  goNext(url) {
    wx.navigateTo({
      url: url
    })
  }
})