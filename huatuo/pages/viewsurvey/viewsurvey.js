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
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      type: 'number',
      label: '4. 你或你所报告同事的部门 What is the department of the reported colleague?',
      bindInputName: 'inputEvent',
      num: '1',
      isDisabled: true,
      content: 'Regional CIO - Canada',
      disabledStyle: ''
    },
    city: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      type: 'number',
      label: '5. 你或你所报告同事的办公城市 Where is the working city of the reported colleague:',
      bindInputName: 'inputEvent',
      num: '1',
      isDisabled: true,
      content: '西安 Xi\'an'
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
      isDisabled: true,
      content: '43794592'
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
      isDisabled: true,
      content: '18088888888'
    },
    area: {
      region: '请选择 Please Select',
      label: '5. 你或你所报告同事的办公城市 Where is the working city of the reported colleague? *',
    },
    others: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      maxlength: 11,
      placeholder: '请输入 Please Enter',
      type: 'number',
      label: '3. 你为其他同事报告吗 Are you reporting for other colleague?',
      confirmLabel: '3. 你为其他同事报告吗 Are you reporting for other colleague?',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter cell phone (请输入紧急联系电话)',
      num: '2',
      isDisabled: true,
      content: '不是 No'
    },
    othersStaffId: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: true,
      isCRSRelated: false,
      type: 'number',
      placeholder: '请输入 Please Enter',
      maxlength: 8,
      label: '你所报告同事的员工编号 The Staff ID of reported colleague:',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter the staff ID (请输入员工编号)',
      num: '3',
      content: ''
    },
    status: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      maxlength: 11,
      placeholder: '请输入 Please Enter',
      type: 'number',
      label: '7. 你或你所报告的同事目前的情况是 What is the current circumstance of the reported colleague?',
      confirmLabel: '7. 你或你所报告的同事目前的情况是 What is the current circumstance of the reported colleague?',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter',
      num: '2',
      isDisabled: true,
      content: '居住楼或小区被有关部门限制出入 The building or residential estate lived in is being restricted.'
    },
    visits: {
      hasLabel: true,
      hasWarning: false,
      isMandatory: false,
      isCRSRelated: false,
      maxlength: 11,
      placeholder: '请输入 Please Enter',
      type: 'number',
      label: '6. 你或你所报告的同事14天之内去过的办公地点 Which office did the reported colleague visit in last 14 days?(多选)',
      confirmLabel: '6. 你或你所报告的同事14天之内去过的办公地点 Which office did the reported colleague visit in last 14 days?(多选)',
      bindInputName: 'inputEvent',
      warningLabel: 'Please Enter',
      num: '2',
      isDisabled: true,
      content: 'Xi\'an Centre'
    }
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
    var navigateTitle = '汇丰健康小调查 Reprot health survey';
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
})