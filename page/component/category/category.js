Page({
  data: {
    goodsList:"",
    currentTab:399,
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
  // 生命周期
  // 页面加载底部导航跳转加载
  // onLoad:function(){
  //   // var cateId = 0;
  //   // console.log(cateId)
  //   wx.request({
  //     url: "https://ehalfresh.tunnel.qydev.com/xiaochengxucate/catelist.html",
  //     success:function(res){
  //       console.log(res)
  //     }
  //   })
  // },
// 页面卸载，加载完毕
  // onUnlond:function(){
  //   wx.removeStorage({
  //     key:"cateId"
  //   })
  // },
  //首页导航跳转加载
  onShow:function(){
    var that = this;
    var cateId = "";
    var domainUrl = getApp().domainUrl
    cateId = wx.getStorageSync("cateId")
    console.log(cateId == "")
    // if (cateId == ""){
    //   return cateId=399
    // }
    console.log(cateId)
    wx.request({
      method: 'POST',
      url: domainUrl+"xiaochengxulist/catelist.html?cateId=" + cateId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        for (var i = 0; i < res.data.length;i++){
          res.data[i].masterImg = "https://img.ehalfresh.com/ejsimage" + res.data[i].masterImg
         // console.log(that.data.goodsList[i].id)
        }
        that.setData({
          goodsList: res.data
        })
      }
    })
  },
  //列表导航点击加载
  clicktap: function (event){
    var that = this
    var cateId = "";
    var domainUrl = getApp().domainUrl
    cateId = event.target.dataset.val
    console.log(event.target)
    if (this.data.currentTab === event.target.dataset.val) {
      return false;
    } else {
      that.setData({
        currentTab: event.target.dataset.val
      })
    }  
    wx.request({
      method: 'POST',
      url: domainUrl+"xiaochengxulist/catelist.html?cateId=" + cateId,
      success:function(res){
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].masterImg = "https://img.ehalfresh.com/ejsimage" + res.data[i].masterImg
        }

        that.setData({
          goodsList: res.data
        })
      
      }
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },  
  onLoad:function(){
    // var cateId = 0;
    // console.log(cateId)
    // wx.request({
    //   url: "https://ehalfresh.tunnel.qydev.com/previewindexfloor.html",
    //   success:function(res){
    //     console.log(res.data)
    //   }
    // })

  },
})