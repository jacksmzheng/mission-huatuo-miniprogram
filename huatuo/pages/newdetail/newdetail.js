// pages/newdetail/newdetail.js
const app = getApp();
const util = require('../common/js/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newdetail:{},
    newdetails:[{
      title:"李兰娟院士发布重大成果 这两种药能抑制冠状病毒",
      author:"汇丰银行（中国）有限公司",
      time:"2020年2月4日",
      id: 4,
      paragraph:[
        "相隔9天，中共中央政治局常委会再次召开会议研究疫情防控工作。如此密度，不记得可曾有过。上次开常委会时全国确诊病例是两千余例，9天之后已是两万余例。疫情之严峻，明摆着。而经过这9天，全面动员、全面部署、全面加强疫情防控工作的局面，已在全国形成。在党中央的集中统一领导下，举国上下，正凝聚起共同抗击疫情的磅礴力量，同时间赛跑，与病魔较量。",
        "制度优势是我们打赢疫情防控阻击战的最大优势、最重要底牌、最坚实支撑。习近平总书记在总结前一阶段疫情防控工作时，主要就是在讲这个。9000万党员、14亿人民，虽面对巨大挑战、严峻局面，但始终有党的集中统一领导，有主心骨、有动员力，能集中力量办大事，能众志成城、团结奋战。这个状态在握，胜利终将属于我们。",
        "习近平总书记讲到三个关联——“做好疫情防控工作，直接关系人民生命安全和身体健康，直接关系经济社会大局稳定，也事关我国对外开放”。比9天前多提到了后两个。说明随着局势进一步发展，要充分认识到，如果疫情防控工作做不好，不仅影响生命和健康，也会影响宝贵的稳定大局和开放局面。唯有做好，没有退路。",
        "他强调现在“最关键的问题就是把落实工作抓实抓细”。说明党中央的相关决策部署已总体完成，当前关键在落实，一是“实”，二是“细”。想实就要细，不细就不实。他提出“尽快找差距、补短板”，说明疫情防控工作“有力开展”中，也暴露了一些差距和短板。不回避问题，问题所在，恰是着力点所在。"
      ]
    },
      {
        title: "汇丰银行（中国）有限公司疫情防控期间网点营业安排调整通知",
        author: "汇丰银行（中国）有限公司",
        time: "2020年2月4日",
        id: 1,
        paragraph: [
          "汇丰银行（中国）有限公司疫情防控期间网点营业安排调整通知",
          "相隔9天，中共中央政治局常委会再次召开会议研究疫情防控工作。如此密度，不记得可曾有过。上次开常委会时全国确诊病例是两千余例，9天之后已是两万余例。疫情之严峻，明摆着。而经过这9天，全面动员、全面部署、全面加强疫情防控工作的局面，已在全国形成。在党中央的集中统一领导下，举国上下，正凝聚起共同抗击疫情的磅礴力量，同时间赛跑，与病魔较量。",
         
        ]
      },
      {
        title: "来自厂长的信",
        author: "汇丰银行",
        time: "2020年2月4日",
        id: 5,
        paragraph: [
          "大家好！祝愿每一位同事新春快乐，身体健康，一家平安！",
          "今年的新年是一个不一様的新年，特别是对仍留在湖北武汉的同事，他们现在的生活一定十分不容易。可以接触到的，我最近也在微信接触到他们，很高兴知道他们现在安好，即使现在情况十分困难，物资短缺，他们仍然十分正面和坚强地去面对。",
          "作为厂镸，我为他们而十分自豪！真的希望他们很快就可以健康回来，一起和我吃个丰富的晚餐！这是我对他们的小小承诺！",
          "我想这抗疾战争还有一段时间，需要同事们紧守岗位，使汇丰和我厂可以安然渡过，希望大家継续努力！",
          "在这段时间，特别是下星期很多同事都会在家工作，如果你有一些疑问，欢迎你加我微信 18820138843 直接和我联络！",
          "武汉加油！大家身体健康！",
          "",
          "Hello Everyone",
          "Happy Chinese New Year.  ",
          "This is a very unusual start of a Chinese New year.  Especially for our colleagues who are still in Wuhan, it must be very difficult for them at this time.  I managed to contact most of them in person via WeChat and very happy to know that they all stay good and healthy.  Regardless of the challenges, they all remains very positive and tough.",
          "As the Head of HTC, I am extremely proud of having them in our HTC family.  I sure they will stay healthy and get back soon, and I committed to treat them a nice dinner when they are back to the office. ",
          "I think this 'war' will last for a while.  We need all of you to hang in there, work as a team, to get through the challenges.",
          "During this difficult period, some of you must have a lot of queries, you are very much welcome to contact me directly via WeChat 18820138843.",
          "Wuhan, hang in there, we all back you up !",
          "Stay safe & healthy"
        ]
      }
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.userInfo.staffId)
    let that = this;
    switch (options.id){
      case "4":
      this.setData({
        newdetail: this.data.newdetails[0]
      })
      break;
      case "1":
        this.setData({
          newdetail: this.data.newdetails[1]
        })
        break;
      case "5":
        this.setData({
          newdetail: this.data.newdetails[2]
        })
        break;
    }

    // let host = app.api.isProdEnv ? app.api.prodUrl : app.api.devUrl;
    // wx.request({
    //   url: host + '/api/news/detail',
    //   method: 'POST',
    //   data: {
    //     "openId": app.globalData.openId,
    //     "staffId": app.globalData.userInfo.staffId,
    //     "newsId": options.id
    //   },
    //   header: {
    //     'content-type': 'application/json',
    //     'X-IS-DUMMY': false
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.statusCode == 200) {
    //       // that.setData({
    //       //   newsList: res.data.newsInfoList
    //       // })
    //     } else {
    //       util.showErrorMessage(res.statusCode, res)
    //       console.log('fail : ', res)
    //     }
    //   },
    //   fail(res) {
    //     util.showErrorMessage();
    //     console.log(' fail : ', res)
    //   },
    // });
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