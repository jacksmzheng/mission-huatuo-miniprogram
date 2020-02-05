// pages/newslist/newslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[
      {
        id:1,
        newTitle:"汇丰银行（中国）有限公司疫情防控期间网点营业安排调整通知",
        newTime:'2020-02-02 10:00',
        important:true,
        unread:true,
      },
      {
        id: 2,
        newTitle: "疫情防控期间网点营业安排调整通知",
        newTime: '2020-02-03 10:00',
        important: true,
        unread: false,
      },
      {
        id: 3,
        newTitle: "上海长海医院启用野战医疗帐篷避免交叉感染",
        newTime: '2020-02-03 18:00',
        important: true,
        unread: false,
      }, 
      {
        id: 4,
        newTitle: "李兰娟院士发布重大成果 这两种药能抑制冠状病毒",
        newTime: '2020-02-04 17:22',
        important: true,
        unread: false,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getDatail:function(e){
    let newId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/newdetail/newdetail?id=' + newId,
    })
    console.log(e)
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

  }
})