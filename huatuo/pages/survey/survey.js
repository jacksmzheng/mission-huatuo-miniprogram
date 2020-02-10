// pages/survey/survey.js
const { $Message } = require('../dist/base/index');
const app = getApp();
var util = require('../common/js/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    newList: [{
      cnName: '华佗小程序用户调查',
      enName: 'HUATUO APP User Survey.',
      time: '2020-02-05 08:08',
      id: '1',
      type: 'new'
    },
      {
        cnName: '华佗小程序用户调查',
        enName: 'HUATUO APP User Survey.',
        time: '2020-02-04 18:08',
        id: '2',
        type: 'new'
      }],
    oldList: [{
      cnName: '华佗小程序用户调查',
      enName: 'HUATUO APP User Survey.',
      time: '2020-02-05 08:08',
      id: '1',
      type: 'old'
    },
      {
        cnName: '华佗小程序用户调查',
        enName: 'HUATUO APP User Survey.',
        time: '2020-02-04 18:08',
        id: '2',
        type: 'old'
      }],
    */
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
    var url = type == 'new' ? '/pages/submitsurvey/submitsurvey' : '/pages/viewsurvey/viewsurvey';
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
        if (res.statusCode == 200) {
          /*
          var newList = [
              {
                cnName: '华佗小程序用户调查',
                enName: 'HUATUO APP User Survey.',
                time: '2020-02-05 08:08',
                id: '1',
                type: 'new'
              },
              {
                cnName: '华佗小程序用户调查',
                enName: 'HUATUO APP User Survey.',
                time: '2020-02-04 18:08',
                id: '2',
                type: 'new'
              }
            ];
          var oldList = [
            {
              cnName: '华佗小程序用户调查',
              enName: 'HUATUO APP User Survey.',
              time: '2020-02-05 08:08',
              id: '1',
              type: 'old'
            },
            {
              cnName: '华佗小程序用户调查',
              enName: 'HUATUO APP User Survey.',
              time: '2020-02-04 18:08',
              id: '2',
              type: 'old'
            },
          ];
          that.setData({
            newList : newList,
            oldList : oldList
          })
          */
          that.formatResData(res.data)
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
  },

  formatResData: function(resData){

    const unComplete = resData.returnObject.unComplete
    const complete = resData.returnObject.complete

    if (unComplete.length > 0){
      var newList = new Array(unComplete.length)
      for (let i = 0; i < unComplete.length; i++){
        newList[i] = {}
        newList[i].id = unComplete[i].formId
        newList[i].cnName = unComplete[i].formNameCn
        newList[i].enName = unComplete[i].formNameEn
        newList[i].type = unComplete[i].status == '0' ? 'new' : 'old'
        newList[i].time = unComplete[i].lastUpdateDateTime
      }
    }

    if (complete.length > 0) {
      var oldList = new Array(complete.length)
      for (let i = 0; i < complete.length; i++) {
        oldList[i] = {}
        oldList[i].id = complete[i].formId
        oldList[i].cnName = complete[i].formNameCn
        oldList[i].enName = complete[i].formNameEn
        oldList[i].type = complete[i].status == '0' ? 'new' : 'old'
        oldList[i].time = complete[i].lastUpdateDateTime
      }
    }

    this.setData({ newList, oldList })
  }

})