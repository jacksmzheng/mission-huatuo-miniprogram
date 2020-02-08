// pages/submithealth/submithealth.js
const { $Message } = require('../dist/base/index');
const util = require('../common/js/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    surveyDetails: [
      {
        title: '1. 你的员工编号 Your Staff ID:*',
        text: '43794592'
      },
      {
        title: '2. 你的紧急联系电话 Your cell phone for emergency call:*',
        text: '18088888888'
      },
      {
        title: '3. 你对我们产品质量的满意度评价如何 How is the quality of our product?*',
        text: '非常满意 Highly Satisfactory'
      },
      {
        title: '4. 你对我们产品的总体体验的满意度评价如何 How is the experience of our product?*',
        text: '非常满意 Highly Satisfactory非常满意 Highly Satisfactory非常满意 Highly Satisfactory非常满意 Highly Satisfactory'
      },
    ],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1);
    this.setData({
      id: options.id
    })
    this.getSurveyDetails();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },
  //初始化数据
  initData: function () {
    var navigateTitle = '员工调研 Survey';
    this.setData({
      navigateTitle
    })

    wx.setNavigationBarTitle({
      title: navigateTitle,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  ,
  getSurveyDetails() {
    util.showLoading();
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/surveyform/details',
      method: 'POST',
      data: {
        staffId: app.globalData.userInfo.staffId,
        appId: app.globalData.appId,
        id: this.data.id
      },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('message success res :', res)
        if (res.statusCode == 200) {
          that.setData({
            surveyDetails: newList
          })
        } else {
          util.showErrorMessage(res.statusCode, res)
          console.log('message fail : ', res)
        }

      },
      fail(res) {
        util.showErrorMessage()
        console.log('message fail res : ', res)
      },
      complete(res) {
        wx.hideLoading()
      }
    });
  }
})