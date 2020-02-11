// pages/survey/survey.js
const { $Message } = require('../dist/base/index');
const app = getApp();
var util = require('../common/js/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList: [],
    oldList: [],
    showNewSurvey: true,
    newStyle: 'survey-tab-button-selected',
    doneStyle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSurveyList();
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

  },

  changeTab:function(e) {
    console.log(e);
    var id = e.target.id;
    this.setData({
      newStyle: id == 'new' ? 'survey-tab-button-selected' : '',
      doneStyle: id == 'done' ? 'survey-tab-button-selected' : '',
      showNewSurvey: id == 'new' ? true : false
    })
  },

  getStaffidValue: function (e) {
    this.setData({
      ['staffID.content']: e.detail.value
    })
  },
  //
  viewSurveyPage: function (e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var url = type == '0' ? '/pages/submitsurvey/submitsurvey' : '/pages/viewsurvey/viewsurvey';
    wx.navigateTo({
      url: url + "?id=" + id,
    });
  },

  getSurveyList() {
    util.showLoading();
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/surveyform/lists',
      method: 'POST',
      data: {
        staffId: app.globalData.userInfo.staffId,
        appId: app.globalData.appId
      },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('message success res :', res)
        if (res.statusCode == 200 && res.data.code == "200") {
          that.setData({
            newList: res.data.returnObject.unComplete || [],
            oldList: res.data.returnObject.complete || []
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