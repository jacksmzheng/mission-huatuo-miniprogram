// pages/officestatus/officestatus.js
const app = getApp()
const util = require('../common/js/util.js')
Page({
  /**
   * 页面的初始数据
   * 
   */
  data: {
    prodVersion: app.globalData.prodVersion,
    userInfo: app.globalData.userInfo,
    btnNews:{
      name:'新闻资讯',
      nameen:'Latest News',
      image: '/pages/common/resources/images/huotuo_latest_news.png',
      url: '/pages/newslist/newslist',
      event: 'goNewsList',
      count: 0,
    },
    btnReport:{
      name: '报告病例',
      nameen: 'Report a case',
      image: '/pages/common/resources/images/huatuo_health_survey.png',
      url: '/pages/submithealth/submithealth',
      event: 'submitHealth',
      count: 0,
    },
    btnVPN:{
      name: 'VPN问题',
      nameen: 'VPN Problem',
      image: '/pages/common/resources/images/huatuo_vpn_problem.png',
      url: '/pages/submitvpn/submitvpn',
      event: 'submitVPN' ,
      count: 0,
    },
    btnHelp:{
      name: '求助&捐赠',
      nameen: 'Help & Donation',
      image: '/pages/common/resources/images/huatuo_help_donation.png',
      url: '/pages/helpanddonation/helpanddonation',
      event: 'submitHelp' ,
      count: 0
    },
    btnSurvey:{
      name: '员工调研',
      nameen: 'Survey',
      image: '/pages/common/resources/images/huatuo_research.png',
      url: '/pages/survey/survey',
      event: 'sbumitSurvey' ,
      count: 0
    },

    healthStatus:
      [
        {
          area:'广州办公室情况',
          areaen: 'Guangzhou Office Status',
          buildingReports:[
            {
              buildingName:'',
              confirmed:0,
              suspect:0,
              fever:0,
            },
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            },
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            },
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            },
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            },
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            }
          ]
        },
        {
          area:'西安办公室情况',
          areaen: "Xi'An Office Status",
          buildingReports: [
            {
              buildingName: '',
              confirmed: 0,
              suspect: 0,
              fever: 0,
            }
          ]
        }
      ],
    vpnStatus: 
      [
        {
          vpn: [
            {
              name: 'VPN-HK',
              count: 0
            },
            {
              name: 'VPN-CN',
              count: 0
            }
          ]
        }
      ],
    news: [
      { 
        title: "",
        id: 1
      }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const screenWidth =  wx.getSystemInfoSync().windowWidth
    const imageWidth = (screenWidth - 160)/5
    const imageHeight = imageWidth
    this.setData({ imageWidth, imageHeight })
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
    this.wxLogon();
    //this.wxSubcirbe();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.refreshEvent)
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
    this.refreshData()
    wx.stopPullDownRefresh();
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
  //show subcribe dialog
  wxSubcirbe: function() {
    if (app.globalData.userInfo) {
      wx.requestSubscribeMessage({
        tmplIds: ['yPWLSERHcxwoLV8IARcSn_YcXtuq4Ld_lLeTwmPPcs4'],
        success(res) {
          console.log(res);
        },
        fail(res) {
          console.log(res);
        }
      })
    }
  },

  wxLogon:function(){
    let that = this;
    if (null == app.globalData.userInfo || undefined == app.globalData.userInfo || "" == app.globalData.userInfo){
      
      console.log('wx logon : ', app.globalData.userInfo)
      wx.login({
        success: res => {
          let host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
          wx.request({
            url: host + '/api/wechat-login',
            method: 'POST',
            data: {
              "appId": app.globalData.appId,
              "code": res.code
            },
            header: {
              'content-type': 'application/json',
              'X-IS-DUMMY': false
            },
            success(res) {
              console.log(res)
              if (res.statusCode == 200) {
                app.globalData.userInfo = res.data.userInfo;
                app.globalData.openId = res.data.session.openid;
                if (null == res.data.userInfo || undefined == res.data.userInfo || '' == res.data.userInfo)             {
                  wx.reLaunch({
                    url: '/pages/registration/registration',
                  })
                } else {
                  that.setData({userInfo: app.globalData.userInfo})
                  that.refreshData();
                  //that.wxSubcirbe();
                }
              } else {
                util.showErrorMessage(res.statusCode,res)
                console.log('fail : ', res)
              }
            },
            fail(res) {
              util.showErrorMessage();
              console.log('wx login fail res : ', res)
            },
          });
        }
      })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo
      })
      that.refreshData();
      //that.wxSubcirbe();
    }
  },

  refreshData: function () {
    const that = this
    util.showLoading();
    that.requestDict()
    that.requestMessage()
    that.setData({
      refreshEvent: setInterval(function () {
        that.requestDict()
      }, 5 * 60 * 1000),
    })
  },

  requestMessage: function(){
    util.showLoading();
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/important-news',
      method: 'POST',
      data: { 
        openId: app.globalData.openId,
        appId: app.globalData.appId 
        },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('message success res :', res)
        if (res.statusCode == 200) {
          that.setData({
            newsList: res.data.returnObject.importantNewsResponseList,
            ['btnNews.count']: res.data.returnObject.unReadCount
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
  },

  requestDict:function() {
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host + '/api/datadict',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('dictionary success res :', res)
        if (res.statusCode == 200){
          that.setData({
            areaDic: res.data.area,
            buildingDic: res.data.building,
            vpnDic: res.data.vpn
          })
          util.showLoading();
          that.requestHealthStatus()
          that.requestVPNStatus()
        }else{
          util.showErrorMessage(res.statusCode,res)
          console.log('fail : ', res)
        }

      },
      fail(res) {
        util.showErrorMessage()
        console.log('dictionary fail res : ', res)
      },
      complete(res) {
        wx.hideLoading()
      }
    });

  },

  requestHealthStatus: function () {
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host+ '/api/health',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('health status success res :',res)
        if ( res.statusCode == 200 && res.data ){
          const healthStatus = that.formatHealthData(res.data)
          that.setData({ healthStatus })
        } else {
          util.showErrorMessage(res.statusCode, res)
        }
      },
      fail(res) {
        util.showErrorMessage()
        console.log('health status fail res : ', res)
      },
      complete(res){
        wx.hideLoading()
      }
    });
  },

  requestVPNStatus: function () {
    const that = this
    var host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    wx.request({
      url: host+ '/api/vpn/report',
      method: 'POST',
      data: {
        "day": 1
      },
      header: {
        'content-type': 'application/json',
        'X-IS-DUMMY': false
      },
      success(res) {
        console.log('vpn status success res :',res)
        if (res.statusCode == 200 && res.data) {
          const vpnStatus = that.formatVPNData(res.data)
          that.setData({ vpnStatus })
        }else{
          util.showErrorMessage(res.statusCode, res)
        }
      },
      fail(res) {
        util.showErrorMessage()
        console.log('vpn status fail res : : ', res)
      },
      complete(res) {
        wx.hideLoading()
      }
    })
  },

  formatHealthData: function(responseData){
    const areaDic = this.data.areaDic
    const buildingDic = this.data.buildingDic
    for (let i = 0; i < responseData.length; i++){
      if (areaDic && responseData[i].area == 'GZ' ){
        responseData[i].area = areaDic.GZ["zh-cn"] 
        responseData[i].areaen = areaDic.GZ["en-hk"] 
        responseData[i].buildingReports[0].buildingName = buildingDic["2"]
        responseData[i].buildingReports[1].buildingName = buildingDic["3"]
        responseData[i].buildingReports[2].buildingName = buildingDic["4"]
        responseData[i].buildingReports[3].buildingName = buildingDic["5"]
        responseData[i].buildingReports[4].buildingName = buildingDic["6"]
        responseData[i].buildingReports[5].buildingName = buildingDic["7"]

      }
      if (areaDic && responseData[i].area == 'XA') {
        responseData[i].area = areaDic.XA["zh-cn"]
        responseData[i].areaen = areaDic.XA["en-hk"]
        for (let j = 0; j < responseData[i].buildingReports.length; j++){
          responseData[i].buildingReports[j].buildingName = buildingDic["8"]
        }
      }
      if(responseData[i].buildingReports.length>1){
        for(let j=0; j<responseData[i].buildingReports.length; j++){
          responseData[i].buildingReports[j].num = j
          if( j%2 == 0 && responseData[i].buildingReports[j+1]){
            
            responseData[i].buildingReports[j].buildingName1 = responseData[i].buildingReports[j+1].buildingName
            responseData[i].buildingReports[j].confirmed1 = responseData[i].buildingReports[j + 1].confirmed
            responseData[i].buildingReports[j].suspect1 = responseData[i].buildingReports[j + 1].suspect
            responseData[i].buildingReports[j].fever1 = responseData[i].buildingReports[j + 1].fever
          }
        }
      }
    }
    console.log('generated response data : ', responseData)
    return responseData
  },

  formatVPNData: function(responseData){
    const vpnReports = responseData.vpnReports
    const vpnStatus = this.data.vpnStatus
    const vpnDic = this.data.vpnDic

    for (let i = 0; i < vpnReports.length; i++){
      if(vpnDic[vpnReports[i].vpnType]){
        vpnStatus[0].vpn[i].name = vpnDic[vpnReports[i].vpnType]['en-hk']
        vpnStatus[0].vpn[i].cnname = vpnDic[vpnReports[i].vpnType]['zh-cn']
        vpnStatus[0].vpn[i].count = vpnReports[i].count
      }
    }
    return vpnStatus
  },

  goNewsList: function(e){
    util.goNext(e.currentTarget.dataset.url)
  },

  goNewsDetail: function(e) {
    util.goNext(e.currentTarget.dataset.url)
  },

  submitHealth: function(e) {
    util.goNext(e.currentTarget.dataset.url)
  },

  submitVPN: function(e) {
    util.goNext(e.currentTarget.dataset.url)
  },

  submitHelp: function(e) {
    wx.showToast({
      title: '页面开发中，敬请期待',
      icon: 'none'
    })
    // util.goNext(e.currentTarget.dataset.url)
  },

  sbumitSurvey: function (e){
    util.goNext(e.currentTarget.dataset.url)
  }

})