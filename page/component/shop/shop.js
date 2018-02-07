var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    seller: '',
    banners: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.linkId)
    var that = this
    wx.request({
      url: app.domainUrl + '/xiaochengxu/store/' + options.linkId + '.html',
      method: 'GET',
      success: function (res) {
        var bannerUrl = res.data[0].banners
        var DataLinks = ""
        if (bannerUrl.length != 0) {
          for (var i = 0; i < bannerUrl.length; i++) {
            DataLinks = bannerUrl[i].linkUrl
            DataLinks.split('/')[DataLinks.split('/').length - 1].split('.')[0]
            bannerUrl[i].linkU = DataLinks.split('/')[DataLinks.split('/').length - 2]
          }
        }
        console.log(res.data[0].floors[0].datas)
        that.setData({
          shopList: res.data[0].floors[0].datas,
          seller: res.data[0].seller,
          banners: res.data[0].banners
        })
      }
    })
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