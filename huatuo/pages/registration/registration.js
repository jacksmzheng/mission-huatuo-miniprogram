// pages/submithealth/submithealth.js
const { $Message } = require('../dist/base/index');
const app = getApp();
var util = require('../common/js/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stafID: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      type: 'number',
      label: '你的员工编号 Your Staff ID:*',
      bindInputName: 'inputEvent',
      num: '1',
      content: ''
    },
    mobile: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      maxlength: 11,
      placeholder: '请输入 Please Enter',
      type: 'number',
      label: '你的联系电话 Your mobile number:*',
      confirmLabel: '2. 你的联系电话 Your mobile number',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter mobile number (你的联系电话)',
      num: '2',
      content: ''
    },
    code: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: true,
      isCRSRelated: false,
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      label: '验证码 Verification code:',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter verification code (请输入验证码)',
      num: '3',
      content: ''
    },
    button: {
      text: "发送",
      disabled: false
    },
    verifyCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var navigateTitle = '注册 Registration';
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

  inputEvent: function (e_) {
    const e = e_.detail.e ? e_.detail.e : e_
    console.log('input event : ', e)
    var num = e.currentTarget.dataset.num;
    var field;
    switch(num) {
      case '1': field = 'stafID.content'; break;
      case '2': field = 'mobile.content'; break;
    }
    this.setData({
      [field]: e.detail.value
    })
  },

  getCodeValue: function (e) {
    this.setData({
      ['code.content']: e.detail.value
    })
  },

  submitHealthForm(e) {
    console.log(e.detail.value);
    var staffId = this.data.stafID.content;
    var mobile = this.data.mobile.content;
    var code = this.data.code.content;
    if (this.validate('registration')) {
      data = {};
      this.request(data);
    }
  },
  //call api
  request(data) {
    wx.showLoading({ title: '数据处理中...' });
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/registration',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        var page = '/pages/successful/successful';
        if(res.statusCode !== 200) {
          page = '/pages/errors/errors';
        }
        wx.navigateTo({
          url: page
        })
      },
      fail(res) {

        return;
      },
      complete(res) {
        wx.hideLoading();
      }
    })
  },
  //
  sendVerifyCode() {
    console.log(111);
    var _this = this;
    if (this.validate()) {
      this.setData({
        ['button.disabled']: true
      })
      wx.showLoading({ title: '数据处理中...' });
      var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
      // this.handle60TimeOut();
      // return;
      wx.request({
        url: host + '/api/sendSMSVerifyCode',
        method: 'POST',
        data: {
          mobileNum: this.data.mobile.content
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          _this.setData({
            verifyCode: res.code
          })
          _this.handle60TimeOut();
        },
        fail(res) {
          _this.setData({
            ['button.disabled']: false,
            ['button.text']: '重新发送'
          })
          wx.showToast({
            title: '发送失败！',
            icon: 'warn',
            duration: 2000
          })
        },
        complete(res) {
          wx.hideLoading();
        }
      })
      
    }
  },
  //validation
  validate(type) {
    util.handleError();
    var staffId = this.data.stafID.content;
    var mobile = this.data.mobile.content;
    var code = this.data.code.content;
    if (staffId == '' || mobile == '' || (type == 'registration' && code == '')) {
      util.handleError();
      return false;
    }
    if (!(/^\d{8}$/g).test(staffId) || !(/^\d{11}$/g).test(mobile)) {
      util.handleError('请输入合法的员工编号或者电话号码！');
      return false;
    }
    if (!(/^\d{6}$/g).test(code) && type == 'registration') {
      util.handleError('请输入合法的验证码！');
      return false;
    }
    return true;
  },
  //
  handle60TimeOut() {
    var _this = this;
    var num = 61;
    var timer = setInterval(function () {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        _this.setData({
          ['button.text']: '重新发送',
          ['button.disabled']: false
        })

      } else {
        _this.setData({
          ['button.text']: num + "s"
        })
      }
    }, 1000)
  }
})