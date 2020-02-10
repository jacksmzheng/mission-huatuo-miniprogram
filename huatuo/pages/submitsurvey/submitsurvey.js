// pages/submithealth/submithealth.js
const { $Message } = require('../dist/base/index');
const util = require('../common/js/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestForm()
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
    console.log('input event : ', e)
    const e = e_.detail.e ? e_.detail.e : e_
    const forms = this.data.forms
    var num = e.currentTarget.dataset.num;
    forms[num].content = e.detail.value
    this.setData({ ['forms[' + num + ']']: forms[num] })
  },

  radioChange: function (e) {
    console.log('radio change : ', e)
    const num = e.currentTarget.dataset.num
    const forms = this.data.forms;
    const itemList = forms[num].array;

    for (let i = 0, len = itemList.length; i < len; ++i) {
      itemList[i].checked = itemList[i].value === parseInt(e.detail.value)
      if (itemList[i].checked) {
        forms[num].content = itemList[i].itemNum
        // forms[num].content = itemList[i].name
      }
    }

    forms[num].array = itemList;

    this.setData({
      forms
    })
  },

  checkedChange: function (e) {

    console.log('checkbox changed : ', e)

    const num = e.currentTarget.dataset.num
    const forms = this.data.forms;
    const items = forms[num].array;
    const values = e.detail.value
    console.log('values :',  values)

    var content = ''
    var index = items.length - 1 + ""
    for (let i = 0; i < values.length; ++i) {
      // content += items[parseInt(values[i])].name
      content += items[parseInt(values[i])].itemNum
      if (i === values.length - 1) {
        break
      }
      content += ","
    }

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === parseInt(values[j])) {
          items[i].checked = true
          break
        }
      }
      console.log('items : ', items[i].name + 'check : ' + items[i].checked);
    }
    console.log('content : ', content);

    forms[num].array = items
    forms[num].content = content
    this.setData({
      ['forms[' + num +']']: forms[num]
    })

  },

  getFieldValue(value, data) {
    for(var i = 0; i < data.length; i++) {
      if(value == data[i].name) {
        return data[i].id;
      }
    }
    return null;
  },

  requestForm: function () {
    wx.showLoading({
      title: '提交中,请稍候...',
    })
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/survey/form',
      method: 'POST',
      data: {
        openId: app.globalData.openId,
        appId: app.globalData.appId,
        staffId: app.globalData.userInfo.staffId,
        formId: "1"
      },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('request form success res :', res)
        if (res.statusCode == 200) {
          that.setFormData(res.data)
        } else {
          util.showErrorMessage(res.statusCode, res)
          console.log('request form fail : ', res)
        }

      },
      fail(res) {
        util.showErrorMessage()
        console.log('request form fail res : ', res)
      },
      complete(res) {
        wx.hideLoading()
      }
    });
  },

  setFormData: function (responseData){
    const returnObject = responseData.returnObject
    const forms = new Array(responseData.length)

    for( let i=0; i<returnObject.length; i++ ){
      const returnItem = returnObject[i]

      forms[i] = {}
      forms[i].num = i
      forms[i].id = returnItem.question_id
      forms[i].label = returnItem.question_title_cn + " " + returnItem.question_title_en
      forms[i].questionNum = returnItem.question_no
      forms[i].component = returnItem.question_type
      // forms[i].mandatory = true
      // forms[i].fieldType = 'number'
      switch (returnItem.question_type){
        case '1':
          forms[i].event = 'radioChange'
          break;
        case '2':
          forms[i].event = 'checkedChange'
          break;
        case '3':
        case '4':
          forms[i].bindInputName = 'inputEvent'
          break
      }

      if (returnItem.question_type == '1' || returnItem.question_type == '2'){
        forms[i].array = new Array(returnItem.answers.length)
        const answers = returnItem.answers
        for (let j = 0; j < answers.length; j++) {
          forms[i].array[j] = {}
          forms[i].array[j].value = j
          forms[i].array[j].itemId = parseInt(answers[j].item_id)
          forms[i].array[j].itemNum = answers[j].item_no
          forms[i].array[j].name = answers[j].item_text_cn + " " + answers[j].item_text_en
          forms[i].array[j].other = answers[j].need_sub_item
          forms[i].array[j].checked = false
          forms[i].array[j].type = answers[j].sub_item_rule
        }
      }

    }

    console.log( 'return object : ', returnObject )
    console.log('forms data : ', forms )

    this.setData({ forms })

  },

  genSubmitData: function(){
    const forms = this.data.forms
    // console.log('generate for data forms : ', forms)
    var answers = {}
    var completed = false
    for(let i=0; i<forms.length; i++){
      answers[forms[i].questionNum] = forms[i].content 
      completed += forms[i].content
    }

    if(!completed){
      util.handleError()
      return false
    }

    const answer = {
      // openId: app.globalData.openId,
      // appId: app.globalData.appId,
      // staffId: app.globalData.userInfo.staffId,
      staffId: "44053653",
      formId: "1",
      answers: answers
    }

    return answer

  },

  submit: function() {
    wx.showLoading({
      title: '数据加载中，请稍候...',
    })
    const that = this
    const reqData = that.genSubmitData()
    if(!reqData){ return }
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/survey/form/submit',
      method: 'POST',
      data: reqData,
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('submit form success res :', res)
        var page = res.statusCode == 200 ? '/pages/successful/successful' : '/pages/errors/errors'
        wx.redirectTo({
          url: page,
        })

      },
      fail(res) {
        util.showErrorMessage()
        console.log('submit form fail res : ', res)
      },
      complete(res) {
        wx.hideLoading()
      }
    });
  }

})