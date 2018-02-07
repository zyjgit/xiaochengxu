var order = []
var app=getApp()
Page({
  data: {
    //获取微信账户昵称权限
    nickName:"",
    userInfoAvatar:'',
    successMSG:"",
    errorMSG:"",
    //首页数据
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 800,
    toView: 'red',
    scrollTop: 100,
    goods: []
  },


  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  // 定义事件
  tappro: function (e) {
    var id = e.target.dataset.val;
    wx.setStorageSync("cateId", id)
    wx.switchTab({
      url: "category/category",
      success: function (e) {
        var page = getCurrentPages().pop();
        console.log(page)
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  onLoad() {
    var dataImage = "";
    var bannerGoods = "";
    var productA = ""
    var that = this
    var $http = [];
    var nickName="";
    wx.request({
      url: app.domainUrl+ 'previewindexbanners.html',
      success: function (res) {
        //swiper轮播
        var DateImgUrls = res.data.data
        var DataLinks = ""
        for (var i = 0; i < DateImgUrls.length; i++) {
          DateImgUrls[i].image = "https://img.ehalfresh.com/ejsimage" + DateImgUrls[i].image
          DataLinks = res.data.data[i].linkUrl
          DataLinks.split('/')[DataLinks.split('/').length - 1].split('.')[0]
          // DateImgUrls[i].linkUrl = DataLinks.split('/')[DataLinks.split('/').length - 1].split('.')[0]
          //console.log(DataLinks.substring("/"))
           DateImgUrls[i].linkUrl = DataLinks.split('/')[DataLinks.split('/').length - 2]
        }
        // that.data.imgUrls = DateImgUrls
        // console.log(that.data.imgUrls)
        console.log(DateImgUrls)
        that.setData({
          imgUrls: DateImgUrls
        })
        console.log(DateImgUrls[0].linkUrl.indexOf('store') == -1)
      }
    })
    var domainUrl = getApp().domainUrl
    //首页板块列表
    wx.request({
      url: domainUrl+'previewindexfloor.html',
      success: function (res) {
        dataImage = res.data
        for (var i = 0; i < dataImage.length; i++) {
          //dataImage[i].advImage banner图片
          dataImage[i].advImage = "https://img.ehalfresh.com/ejsimage" + dataImage[i].advImage
          //dataImage[i].advLinkUrl产品详情的id
          dataImage[i].advLinkUrl = dataImage[i].advLinkUrl.split('/')[dataImage[i].advLinkUrl.split('/').length - 1].split(".")[0]
          for (var j = 0; j < res.data[i].datas.length; j++) {
            productA = res.data[i].datas[j]//.product.masterImg
            productA.product.masterImg = "https://img.ehalfresh.com/ejsimage" + productA.product.masterImg
         
          }
        }
        that.setData({
          goods: res.data
        })
        console.log(res.data)
      }
    }),
      app.getUserInfo()

    //允许获取当前地址
    //wx.getLocation({
      //type: 'gcj02', //返回可以用于wx.openLocation的经纬度
//success: function (res) {
        //console.log(res) 
        // wx.openLocation({
        //   //address:"",
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   //speed: res.speed,
        //   //accuracy: res.accuracy
        // })
      //}
    //})
  },   
 
  //转发、分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '伊鲜网-国际清真食品贸易平台',
      // path: 'page/component/index',
      imageUrl: 'http://www.ehalfresh.com/resources/front/img/img/pro2.png',
      success: function (res) {
        // shareAppMessage: ok
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})