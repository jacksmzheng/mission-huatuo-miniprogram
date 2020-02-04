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
    btnNews:{
      name:'新闻资讯',
      nameen:'Latest News',
      image: '/pages/common/resources/images/huotuo_latest_news.png',
      url: '',
      event: '',
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
      url: '',
      event: '' ,
      count: 0
    },
    btnSurvey:{
      name: '员工调研',
      nameen: 'Survey',
      image: '/pages/common/resources/images/huatuo_research.png',
      url: '',
      event: '' ,
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
        title: "汇丰内地主要机构捐助700万元支援抗击疫情",
        url: "",
        id: ""
      },
      { 
        title: "汇丰银行（中国）有限公司疫情防控期间网点营业安排调整通",
        url: "",
        id: ""
      },
      { 
        title: "恒生银行中国及员工捐助200万元助力抗击疫情",
        url: "",
        id: ""
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
    this.refreshData()
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

  refreshData: function () {
    const that = this
    wx.showLoading({ title: '数据加载中...' })
    that.requestDict()
    that.setData({
      refreshEvent: setInterval(function () {
        that.requestDict()
      }, 5 * 60 * 1000),
    })
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
          wx.showLoading({ title: '数据加载中...', })
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
        "day": 0
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
    }
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

  submitHealth: function(e) {
    console.log(e)
    app.goNext(e.currentTarget.dataset.url)
  },

  submitVPN: function(e) {
    console.log(e)
    app.goNext(e.currentTarget.dataset.url)
  },
})