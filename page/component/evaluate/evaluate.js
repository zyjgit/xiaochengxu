Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: '',
    orderDetail: [],
    isChecked: false
  },
  serviceSelection() {
    var that=this
    console.log(this.data)
    console.log(this.data.isChecked)
    if (this.data.isChecked == true) {
      this.setData({
        isChecked: false
      })
    } else {
      this.setData({
        isChecked: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    console.log(memberId)
    wx.request({
      url: domainUrl+'xiaochengxumember/addcomment.html?memberId=' + '267' + '&id=' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderList: res.data,
        })
        that.setData({
          orderDetail: res.data.orderProductList,
        })
        // console.log(that.data.orderList)
        // console.log(that.data.id)
        // console.log(that.data.productGoodId)
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