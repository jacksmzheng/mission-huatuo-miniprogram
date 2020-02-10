// pages/submithealth/submithealth.js
const { $Message } = require('../dist/base/index');
const util = require('../common/js/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
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
    id: '',
    resData: {
      "code": "200",
      "msg": "success",
      "returnObject": {
        "answers": {
          "answer1": "3",
          "answer2": "6,5,4",
          "answer3": "第一次单行输入测试文本",
          "answer4": "第一次多行输入测试文本，第一次多行输入测试文本，第一次多行输入测试文本，第一次多行输入测试文本，第一次多行输入测试文本，第一次多行输入测试文本，第一次多行输入测试文本，",
          "answer5": "第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，第二次多行输入测试文本，",
          "answer6": "第二次单行输入测试文本，第二次单行输入测试文本，第二次单行输入测试文本，第二次单行输入测试文本，",
          "answer7": "1,2",
          "answer8": "2",
          "answer9": "",
          "answer10": "",
          "answer11": "",
          "answer12": "",
          "answer13": "",
          "answer14": "",
          "answer15": "",
          "answer16": "",
          "answer17": "",
          "answer18": "",
          "answer19": "",
          "answer20": "",
          "answer21": "",
          "answer22": "",
          "answer23": "",
          "answer24": "",
          "answer25": "",
          "answer26": "",
          "answer27": "",
          "answer28": "",
          "answer29": "",
          "answer30": "",
          "answer31": "",
          "answer32": "",
          "answer33": "",
          "answer34": "",
          "answer35": "",
          "answer36": "",
          "answer37": "",
          "answer38": "",
          "answer39": "",
          "answer40": "",
          "answer41": "",
          "answer42": "",
          "answer43": "",
          "answer44": "",
          "answer45": "",
          "answer46": "",
          "answer47": "",
          "answer48": "",
          "answer49": "",
          "answer50": "",
          "answer51": "",
          "answer52": "",
          "answer53": "",
          "answer54": "",
          "answer55": "",
          "answer56": "",
          "answer57": "",
          "answer58": "",
          "answer59": "",
          "answer60": "",
          "answer61": "",
          "answer62": "",
          "answer63": "",
          "answer64": "",
          "answer65": "",
          "answer66": "",
          "answer67": "",
          "answer68": "",
          "answer69": "",
          "answer70": "",
          "answer71": "",
          "answer72": "",
          "answer73": "",
          "answer74": "",
          "answer75": "",
          "answer76": "",
          "answer77": "",
          "answer78": "",
          "answer79": "",
          "answer80": "",
          "answer81": "",
          "answer82": "",
          "answer83": "",
          "answer84": "",
          "answer85": "",
          "answer86": "",
          "answer87": "",
          "answer88": "",
          "answer89": "",
          "answer90": "",
          "answer91": "",
          "answer92": "",
          "answer93": "",
          "answer94": "",
          "answer95": "",
          "answer96": "",
          "answer97": "",
          "answer98": "",
          "answer99": "",
          "answer100": ""
        },
        "questions": [{
          "question_id": 1,
          "question_title_cn": "问题11_单选",
          "question_title_en": "Question11",
          "question_no": "1",
          "question_type": "1",
          "rule": "mandatory",
          "answers": [{
            "item_id": "1",
            "question_id": "1",
            "item_no": "1",
            "item_text_cn": "选项11",
            "item_text_en": "Option11",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "2",
            "question_id": "1",
            "item_no": "2",
            "item_text_cn": "选项12",
            "item_text_en": "Option12",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "3",
            "question_id": "1",
            "item_no": "3",
            "item_text_cn": "选项13",
            "item_text_en": "Option13",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "4",
            "question_id": "1",
            "item_no": "4",
            "item_text_cn": "选项14",
            "item_text_en": "Option13",
            "need_sub_item": null,
            "sub_item_rule": null
          }]
        }, {
          "question_id": 2,
          "question_title_cn": "问题12_多选",
          "question_title_en": "Question12",
          "question_no": "2",
          "question_type": "2",
          "rule": "mandatory",
          "answers": [{
            "item_id": "5",
            "question_id": "2",
            "item_no": "1",
            "item_text_cn": "选项21",
            "item_text_en": "Option21",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "6",
            "question_id": "2",
            "item_no": "2",
            "item_text_cn": "选项22",
            "item_text_en": "Option22",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "7",
            "question_id": "2",
            "item_no": "3",
            "item_text_cn": "选项23",
            "item_text_en": "Option23",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "8",
            "question_id": "2",
            "item_no": "4",
            "item_text_cn": "选项24",
            "item_text_en": "Option24",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "9",
            "question_id": "2",
            "item_no": "5",
            "item_text_cn": "选项25",
            "item_text_en": "Option25",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "0",
            "question_id": "2",
            "item_no": "6",
            "item_text_cn": "选项26",
            "item_text_en": "Option26",
            "need_sub_item": null,
            "sub_item_rule": null
          }]
        }, {
          "question_id": 5,
          "question_title_cn": "问题13_文本",
          "question_title_en": "Question13",
          "question_no": "3",
          "question_type": "3",
          "rule": "mandatory,numberOnly",
          "answers": null
        }, {
          "question_id": 6,
          "question_title_cn": "问题14_多行文本",
          "question_title_en": "Question14",
          "question_no": "4",
          "question_type": "4",
          "rule": "",
          "answers": null
        }, {
          "question_id": 7,
          "question_title_cn": "问题15_多行文本",
          "question_title_en": "Question15",
          "question_no": "5",
          "question_type": "4",
          "rule": "mandatory",
          "answers": null
        }, {
          "question_id": 8,
          "question_title_cn": "问题16_文本",
          "question_title_en": "Question16",
          "question_no": "6",
          "question_type": "3",
          "rule": "numberOnly",
          "answers": null
        }, {
          "question_id": 9,
          "question_title_cn": "问题17_多选",
          "question_title_en": "Question17",
          "question_no": "7",
          "question_type": "2",
          "rule": null,
          "answers": [{
            "item_id": "10",
            "question_id": "9",
            "item_no": "1",
            "item_text_cn": "选项91",
            "item_text_en": "Option91",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "11",
            "question_id": "9",
            "item_no": "2",
            "item_text_cn": "选项92",
            "item_text_en": "Option92",
            "need_sub_item": null,
            "sub_item_rule": null
          }]
        }, {
          "question_id": 10,
          "question_title_cn": "问题18_单选",
          "question_title_en": "Question18",
          "question_no": "8",
          "question_type": "1",
          "rule": "mandatory",
          "answers": [{
            "item_id": "12",
            "question_id": "10",
            "item_no": "1",
            "item_text_cn": "选项101",
            "item_text_en": "Option101",
            "need_sub_item": null,
            "sub_item_rule": null
          }, {
            "item_id": "13",
            "question_id": "10",
            "item_no": "2",
            "item_text_cn": "选项102",
            "item_text_en": "Option102",
            "need_sub_item": null,
            "sub_item_rule": null
          }]
        }]
      }
    }
    */
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
      url: host + '/api/surveyform/detail',
      method: 'POST',
      data: {
        staffId: app.globalData.userInfo.staffId,
        appId: app.globalData.appId,
        formId: this.data.id
      },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('message success res :', res)
        if (res.statusCode == 200) {
          // that.setData({
          //   surveyDetails: newList
          // })
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
    // this.formatResData(this.data.resData)
    // wx.hideLoading();
  },
  formatResData: function(resData){

    const questions = resData.returnObject.questions
    const answers = resData.returnObject.answers
    var surveyDetails
    if(questions.length>0){
      surveyDetails = new Array(questions.length)
      for (let i = 0; i < questions.length; i++){
        surveyDetails[i] = {}
        surveyDetails[i].title = questions[i].question_title_cn + " " + questions[i].question_title_en
        switch (questions[i].question_type){
          case '1':
          case '2':
            const result = answers["answer" + questions[i].question_no].split(",")  // "6,5,4",
            surveyDetails[i].text = ''
            console.log('questions ' + i + " answers : ", questions[i].answers )
            console.log('result : ', result )

            if (questions[i].answers && questions[i].answers.length > 0) {
              for (let k = 0; k < questions[i].answers.length; k++) {
                for (let j = 0; j < result.length; j++) {
                  if (result[j] == questions[i].answers[k].item_no ) { 
                    var dot = result.length > 1 && j != result.length - 1 ? '，' : ''
                    surveyDetails[i].text += questions[i].answers[k].item_text_cn + " " + questions[i].answers[k].item_text_en + dot

                  }
                }
              }
            }
          break;
          case '3':
          case '4':
            surveyDetails[i].text = answers["answer" + questions[i].question_no]
          break;
        }
      }
    }
    console.log('surveyDetails : ', surveyDetails)
    this.setData({ surveyDetails})

  }
})