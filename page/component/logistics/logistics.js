Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      detail: "北京市海淀区双清路甲79号",
      namstate: "安福民",
      phone: "13403167483"
    },
    orderDetail: [],
    logistics:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var domainUrl = getApp().domainUrl
    console.log(options)
    wx.request({//物流信息
      url: domainUrl+'xiaochengxumember/ordersLogsdetail.html/?id=' + options.id,
      success: function (res) {
        console.log(res)
        that.setData({
          logistics: res.data
        })
      }
    })
    
    wx.request({//订单详情
      //url: 'https://m.ehalfresh.com/xiaochengxuproduct/'+that.data.refId+'.html',
      url: domainUrl+'xiaochengxumember/ordersdetail.html/?id=' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       console.log(res.data)
       that.setData({
         orderDetail: res.data
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
  onShow() {


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
   * 去付款
   */

  goPay() {
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl + 'xiaochengxu/order/ordercommit.html',
      method: 'POST',
      data: this.data.orderInfo,
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success: (res) => {

        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        wx.navigateTo({
          url: "../payMentOrder/payMentOrder?payAmount=" + res.data.data.payAmount + "&balance=" + res.data.data.balance + "&paySessionstr=" + res.data.data.paySessionstr + "&paySn=" + res.data.data.paySn,
        })
        wx.showModal({
          title: '提示',
          content: 'success',
          showCancel: false
        })
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: 'fail',
          showCancel: false
        })
      }
    })
  },
})