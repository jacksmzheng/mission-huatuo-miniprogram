//app.js
App({
  api: {
    isProdEnv: true,
    devUrl: '',
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