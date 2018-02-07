Page({
  data: {
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: '',
    paySign: '',
    orderSn: '',//订单号
    paySn: '',
    payAmount: '',//实付款
    balance: '',//账户余额
    balancePassword: '',//支付密码
    paySessionstr: '',//支付码
    selectOrderBalance: '',//是否选中余额付款 ，若选中为"on"
    openid: '',
    items: [
      { name: 'on', value: '使用余额（账户当前余额元）' },
    ]
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value[0])
    if (e.detail.value[0] == on) {
      this.setData({
        selectOrderBalance: e.detail.value[0],
      })
    } else {
      this.setData({
        selectOrderBalance: '',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var memberId = wx.getStorageSync('memberId')
    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      orderSn: options.orderSn,
      paySessionstr: options.paySessionstr,
      paySn: options.paySn,
      payAmount: options.payAmount,
      selectOrderBalance: '',
      openid: openid
    })

    var domainUrl = getApp().domainUrl
    console.log(openid)
  },
  bindPay(e) {
    this.setData({
      balancePassword: e.detail.value
    })
  },

  payMent: function (e) {

    var domainUrl = getApp().domainUrl
    var memberId = wx.getStorageSync('memberId')
    var that = this.data
    console.log(that.selectOrderBalance)
    console.log(typeof that.selectOrderBalance)

    wx.request({
      url: domainUrl + 'xiaochengxu/wxpay',
      method: 'POST',
      data: {
        'memberId': memberId,
        'optionsRadios': 'wxxcxpay',  //wxxcxpay    默认微信小程序付款
        'paySessionstr': '',  //支付码
        'fromType': '2',//从下单页过来的订单为"1",从订单列表也付款的为"2"
        'selectOrderBalance': that.selectOrderBalance,//是否选中余额付款 ，若选中为"on"
        'balancePassword': that.balancePassword,//余额支付密码
        'paySn': that.paySn,//支付单号
        'orderSn': that.orderSn, //订单号
        'openid': that.openid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        console.log(res.data[0])
        console.log("支付!")
        if (that.selectOrderBalance == 'on') {
          wx.request({
            url: domainUrl + 'xiaochengxu/order/checkbalancepwd.html',
            method: 'GET',
            data: {
              'balancePwd': that.balancePassword,
              'memberId': memberId,
            },
            header: {
              "content-type": "application/json"//默认
            },
            success: function (res) {
              console.log(res)
            },
            'fail': function (res) {
              console.log("支付失败!")
              wx.showModal({
                title: '支付失败',
                content: '支付密码错误',
                showCancel: false
              })
            }

          })
        }
        var timeStamp = res.data[0].timeStamp
        wx.requestPayment({
          'timeStamp': res.data[0].timeStamp,
          'nonceStr': res.data[0].nonceStr,
          'package': res.data[0].package,
          'signType': 'MD5',
          'paySign': res.data[0].sign,
          'success': function (res) {
            console.log("支付成功!")
            wx.showModal({
              title: '支付成功',
              content: '支付成功：' + res,
              showCancel: false
            })
            wx.navigateTo({
              url: "../index",
            })
          },
          'fail': function (res) {
            console.log("支付失败!")
            wx.showModal({
              title: '支付失败',
              content: '支付失败' + timeStamp,
              showCancel: false
            })
            // wx.showModal({
            //   title: '支付失败',
            //   content:  res.data.timeStamp,
            //   showCancel: false
            // })
          }
        })
      },
      fail: function (err) {
        console.log(err)
        wx.showModal({
          title: 'err',
          content: '支付失败：' + err,
          showCancel: false
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