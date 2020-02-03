//app.js
App({
  api: {
    isProdEnv: false,
    devUrl: '',
    prodUrl: 'https://huatuo.app77.cn'
  },
  globalData: {
    prodVersion: false,
    userInfo: null
  },
  goNext(url) {
    wx.navigateTo({
      url: url
    })
  }
})