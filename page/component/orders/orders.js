// page/component/orders/orders.js
Page({
  data: {
    address: {},
    orders: [],
    cartAmount: '',
    logisticsFeeAmount:'',
    hasAddress: false,
    total: 0,
    orderInfo:{
      memberId:'',                               // 用户ID
      addressId:'',                              // 收货地址ID
      // invoiceStatus:'',                          // 发票状态：0、不要发票；1、单位；2个人
      // invoiceTitle:'',                           // 发票抬头
      // invoiceType:'',                            // 发票类型（内容），明细、办公用品等
      paymentCode:'',                            // 支付方式code   ONLINE: 在线支付（实际支付的时候再修改）；OFFLINE:货到付款
      paymentName:'',                            // 支付方式名称
      // ip:'',                                     // 下单用户的IP地址
      // remark:'',                                 // 订单备注
      // source:'',                                 // 订单来源：1、pc；2、H5；3、Android；4、IOS
      // integral:'',                               // 订单使用的积分数
      // sellerCouponMap:'',                        // 使用商家优惠券信息，key：商家ID，value：优惠券信息
      // 限时抢购、团购、集合竞价提交订单需要字段
      // productId:'',                              // 商品ID
      // productGoodsId:'',                         // 货品ID
      // sellerId:'',                               // 商家ID
      // number:'',                                 // 购买数量
      // actGroupId:'',                             // 团购ID
      // actBiddingId:'',                           // 集合竞价ID
      // actIntegralId:''                           // 积分换购ID

    }
 
  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function () {
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'xiaochengxu/order/ordercommit.html',
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
      fail:(res)=>{
        wx.showModal({
          title: '提示',
          content: 'fail',
          showCancel: false
        })
      }
    })
  },
  onLoad() {
    var that = this
    var memberId = wx.getStorageSync('memberId')
    console.log(memberId)
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'xiaochengxu/order/info.html',
      method: 'GET',
      data: {
        'memberId': memberId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var info=res.data[0]
        console.log(info)
        this.setData({
          address: res.data[0].address,
          orders: res.data[0].cartInfoVO.cartListVOs,
          cartAmount: res.data[0].cartInfoVO.checkedDiscountedCartAmount,
          logisticsFeeAmount: res.data[0].cartInfoVO.logisticsFeeAmount,
          'orderInfo.memberId': memberId,                               // 用户ID
          'orderInfo.addressId': info.address.id,                              // 收货地址ID
          // 'orderInfo.invoiceStatus': '0',                          // 发票状态：0、不要发票；1、单位；2个人
          // 'orderInfo.invoiceTitle': '',                           // 发票抬头
          // 'orderInfo.invoiceType': '',                            // 发票类型（内容），明细、办公用品等
          'orderInfo.paymentCode': info.orderCommitVO.paymentCode, // 支付方式code   ONLINE: 在线支付（实际支付的时候再修改）；OFFLINE:货到付款
          'orderInfo.paymentName': info.orderCommitVO.paymentName,                            // 支付方式名称
          // 'orderInfo.ip': '',                                     // 下单用户的IP地址
          // 'orderInfo.remark': '',                                 // 订单备注
          // 'orderInfo.source': '2',                                 // 订单来源：1、pc；2、H5；3、Android；4、IOS
          // 'orderInfo.integral': '0',                               // 订单使用的积分数
          // 'orderInfo.sellerCouponMap': '',                        // 使用商家优惠券信息，key：商家ID，value：优惠券信息
          //限时抢购、团购、集合竞价提交订单需要字段
        //   'orderInfo.productId': '',                              // 商品ID
        //  'orderInfo.productGoodsId': '',                         // 货品ID
        //   'orderInfo.sellerId': '',                               // 商家ID
        //   'orderInfo.number': '',                                 // 购买数量
        //   'orderInfo.actGroupId': '',                             // 团购ID
        //   'orderInfo.actBiddingId': '',                           // 集合竞价ID
        //   'orderInfo.actIntegralId': ''                           // 积分换购ID

        })
      }
    })
  },
})