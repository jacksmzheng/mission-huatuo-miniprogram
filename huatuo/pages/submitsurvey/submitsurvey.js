// pages/submithealth/submithealth.js
const { $Message } = require('../dist/base/index');
const util = require('../common/js/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      label: '4. 你或你所报告同事的部门 What is the department of the reported colleague?*',
      array: [
        '请选择 Please Select', 
        'Architecture IT', 
        'Cloud Platform and SSE', 
        'CMB',
        'Compliance',
        'COO IT & CCO',
        'Cyber Security',
        'Data Services',
        'Corporate Functions IT & Finance IT',
        'GBM',
        'GPB',
        'Innovation IT',
        'ITID',
        'OSS',
        'RBWM Technology',
        'Regional CIO - ASP',
        'Regional CIO - Canada',
        'Risk IT',
        'Support Functions',
        'Non-HTC* (Bussiness Co-lation)'
        ],
      index: 0,
      bindName: 'pickerChange',
      content: ''
    },
    city: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      label: '5. 你或你所报告同事的办公城市 Where is the working city of the reported colleague:* ',
      array: [
        '请选择 Please Select',
        '广州 Guangzhou',
        '西安 Xi\'an'
      ],
      index: 0,
      bindName: 'pickerCityChange',
      content: ''
    },
    stafID: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      type: 'number',
      label: '1. 你的员工编号 Your Staff ID:*',
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
      label: '2. 你的紧急联系电话 Your cell phone for emergency call:*',
      confirmLabel: '2. 你的紧急联系电话 Your cell phone for emergency call:',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter cell phone (请输入紧急联系电话)',
      num: '2',
      content: ''
    },
    // area: {
    //   region: '请选择 Please Select',
    //   label: '5. 你或你所报告同事的办公城市 Where is the working city of the reported colleague? *',
    // },
    quality: {
      items: [{
        id: 1,
        name: '非常满意 Highly Satisfactory',
      }, {
      id: 2,
          name: '满意 Satisfaction'
      }, {
        id: 3,
        name: '一般 Fair'
      }],
      title: '1. 你对我们产品质量的满意度评价如何 How is the quality of our product?*',
      current: '-',
      position: 'left',
      checked: false,
      disabled: false,
    },
    experience: {
      items: [{
        id: 1,
        name: '非常满意 Highly Satisfactory',
      }, {
        id: 2,
        name: '满意 Satisfaction'
      }, {
        id: 3,
        name: '一般 Fair'
      }],
      title: '2. 你对我们产品的总体体验的满意度评价如何 How is the experience of our product?*',
      current: '-',
      position: 'left',
      checked: false,
      disabled: false,
    },
    recommend: {
      items: [{
        id: 1,
        name: '肯定会 Yes',
      }, {
        id: 2,
          name: '可能会 Probably'
      }],
      title: '3. 你在会向你的同事和朋友推荐我们的产品吗 Will you recommend our product to your colleagues or friends?*',
      current: '-',
      position: 'left',
      checked: false,
      disabled: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo == null) {
      wx.redirectTo({
        url: '/pages/registration/registration'
      })
      return;
    }
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

  pickerChange: function (e) {
    console.log('picker change : ',e)

    this.setData({
      ['department.index']: e.detail.value,
      ['department.content']: this.data.department.array[e.detail.value]

    })
  },
  //
  pickerCityChange: function (e) {
    console.log('picker change : ', e)

    this.setData({
      ['city.index']: e.detail.value,
      ['city.content']: this.data.city.array[e.detail.value]

    })
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
  //
  handleQualityChange({ detail = {} }) {
    console.log(detail.value)
    this.setData({
      ['quality.current']: detail.value
    });
  },
  //
  handleExperienceChange({ detail = {} }) {
    console.log(detail.value)
    this.setData({
      ['experience.current']: detail.value
    });
  },
  //
  handleRecommendChange({ detail = {} }) {
    console.log(detail.value)
    this.setData({
      ['recommend.current']: detail.value
    });
  },
  //
  submitSurveyForm(e) {
    console.log(e.detail.value);
    var staffId = app.globalData.userInfo.staffId;//this.data.stafID.content;
    var mobile = app.globalData.userInfo.mobileNum;//this.data.mobile.content;
    var quality = this.data.quality.current;
    var experience = this.data.experience.current;
    var recommend = this.data.recommend.current;
    var suggestion = e.detail.value.suggestion;
    
    if (staffId == '' || mobile == '' || quality == '-' || experience == '-' || recommend == '-') {
      util.handleError();
      return;
    }
    //var reg = new RegExp('^\\d+$', 'gi');
    // if (!util.regStaffid(staffId) || !util.regMobileNum(mobile)) {
    //   util.handleError('请输入合法的员工编号或者电话号码！');
    //   return;
    // }
    var data = {
      
    }
    this.request(data);
  },
  //call api
  request(data) {
    wx.showLoading({ title: '数据处理中...' });
    wx.redirectTo({
      url: '/pages/successful/successful'
    })
    return;
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/health',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        var page = '/pages/successful/successful';
        if(res.statusCode !== 200) {
          // util.showErrorMessage(res.statusCode, res)
          page = '/pages/errors/errors'
        }
        //redirect to page
        wx.redirectTo({
          url: page,
        })
      },
      fail(res){
        util.showErrorMessage()
        console.log(res)
      },
      complete(res) {
        wx.hideLoading();
      }
    })
  },
  //
  getFieldValue(value, data) {
    for(var i = 0; i < data.length; i++) {
      if(value == data[i].name) {
        return data[i].id;
      }
    }
    return null;
  }
})