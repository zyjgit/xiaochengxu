// page/component/list/list.js
var app=getApp()
Page({
  data: {
    orderList: {},
    memberId: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    console.log(memberId)
    wx.request({
      url: domainUrl + 'xiaochengxumember/order.html?memberId=' + memberId,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderList: res.data,
        })
        console.log(that.data.orderList)
      }
    })


  },
  onCancel: function (e) {
    var memberId = wx.getStorageSync('memberId')
    console.log(e.target.dataset)
    var id = e.target.dataset.id;
    wx.request({
      url: app.domainUrl + 'xiaochengxumember/cancalorder.html',
      method:'GET',
      data:{
        'id': id,
        'memberId':memberId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        wx.showModal({
          title: '取消订单',
          content: '取消成功!',
          showCancel: false
        })
      }
    })
  }
})