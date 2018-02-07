 // tabBer切换
  // {
  //   "pagePath": "page/component/cart/cart",
  //   "iconPath": "image/32.png",
  //   "selectedIconPath": "image/32.png",
  //   "text": "购物车"
  // },

// page/component/new-pages/cart/cart.js
var app = getApp()
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: true,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    totalnumb: 0,
    memberId: '',
  },
  onLoad() {
    
    var that = this, cartListVOs = "";
    var productA = ""
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'xiaochengxucart/detail.html?memberId=' + memberId,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        cartListVOs = res.data.cartListVOs
        console.log(cartListVOs)
        if (cartListVOs.length >= '1') {
          for (var i = 0; i < cartListVOs.length; i++) {
            for (var j = 0; j < res.data.cartListVOs[i].cartList.length; j++) {
              productA = res.data.cartListVOs[i].cartList[j]//.product.masterImg
              productA.product.masterImg = "https://img.ehalfresh.com/ejsimage" + productA.product.masterImg
            }
          }
        }
        that.setData({
          carts: cartListVOs,//
        })
        console.log(that.data.carts)
      }
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow1() {
     console.log(456)
    // var that = this, cartListVOs = "";
    // var productA = ""
    // var memberId = wx.getStorageSync('memberId')
    // var domainUrl = getApp().domainUrl
    // console.log(memberId)
    // wx.request({
    //   url: domainUrl + 'xiaochengxucart/detail.html?memberId=' + memberId,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     cartListVOs = res.data.cartListVOs
    //     console.log(cartListVOs)
    //     console.log(cartListVOs.length >= '1')
    //     if (cartListVOs.length >= '1') {
    //       for (var i = 0; i < cartListVOs.length; i++) {
    //         for (var j = 0; j < res.data.cartListVOs[i].cartList.length; j++) {
    //           productA = res.data.cartListVOs[i].cartList[j]//.product.masterImg
    //           productA.product.masterImg = "https://img.ehalfresh.com/ejsimage" + productA.product.masterImg
    //         }
    //       }
    //     } 
    //     that.setData({
    //       carts: res.data.cartListVOs,//
    //     })
    //   }
    // })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const cartsindex = e.currentTarget.dataset.cartsindex;//店铺index
    const index = e.currentTarget.dataset.index;//店铺商品index
    let carts = this.data.carts;
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    const checked = carts[cartsindex].cartList[index].checked;
    // carts[cartsindex].cartList[index].checked = !checked;
    if (checked == 1) {
      carts[cartsindex].cartList[index].checked = 0
    } else {
      carts[cartsindex].cartList[index].checked = 1
    }
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.getNumber()
    console.log(carts[cartsindex].cartList[index].checked)
    wx.request({
      url: domainUrl+'xiaochengxucart/cartchecked.html',
      method: 'GET',
      data: {
        'cartId': carts[cartsindex].cartList[index].id,
        'memberId': memberId,
        'checked': carts[cartsindex].cartList[index].checked
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log("success")
      },
      fail: (res) => {
        console.log("error")
      }
    })
    console.log(this.data.carts)
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const cartsindex = e.currentTarget.dataset.cartsindex;//店铺index
    const index = e.currentTarget.dataset.index;//店铺商品index
    let carts = this.data.carts;
    let cartList = this.data.carts[cartsindex].cartList;
    var domainUrl = getApp().domainUrl
    console.log(cartsindex)
    console.log(index)
    console.log(carts)
    console.log(carts[cartsindex])
    console.log(carts[cartsindex].cartList[index])
    console.log(carts[cartsindex].cartList[index].id)
    wx.showModal({
      title: '提示',
      content: '购物车id：' + carts[cartsindex].cartList[index].id,
      showCancel: false
    })
    wx.request({
      url: domainUrl+'xiaochengxucart/deleteCartById.html',
      method: 'POST',
      data: {
        'cartId': carts[cartsindex].cartList[index].id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log("success")
      },
      fail: (res) => {
        console.log("error")
      }
    })
    console.log(cartList)
    cartList.splice(index, 1);
    this.setData({
      carts: carts
    });
    console.log(carts[cartsindex].cartList.length == 0)
    console.log(!carts.length)
    if (carts[cartsindex].cartList.length == 0) {
      console.log(carts)
      carts.splice(cartsindex, 1);
    }
    console.log(carts.length)
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();//计算总价
      this.getNumber()
    }

    
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    // const selected = carts[cartsindex].cartList[index].selected;
    // for (let i = 0; i < carts.length; i++) {
    //   // carts[i].selected = selectAllStatus;
    // }
    for (let i = 0; i < carts.length; i++) {
      console.log(carts[i])
      for (let j = 0; j < carts[i].cartList.length; j++) {
        carts[i].cartList[j].selected = selectAllStatus
      }
    }

    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
    this.getNumber()
  },
  /**
   * 绑定加数量事件
   */
  addCount(e) {
    var domainUrl = getApp().domainUrl
    const cartsindex = e.currentTarget.dataset.cartsindex;//店铺index
    const index = e.currentTarget.dataset.index;//店铺商品index
    let carts = this.data.carts;
    let num = carts[cartsindex].cartList[index].count;
    let Total = carts[cartsindex].cartList[index].currDiscountedAmount;
    let price = carts[cartsindex].cartList[index].product.malMobilePrice;
    num = num + 1;
    Total = (num * price).toFixed(2)
    carts[cartsindex].cartList[index].currDiscountedAmount = Total
    carts[cartsindex].cartList[index].count = num
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.getNumber()
    console.log(carts[cartsindex].cartList[index].count)
    console.log(num)
    console.log(carts[cartsindex].cartList[index].id)
    wx.request({
      url: domainUrl+'xiaochengxucart/updatecartById.html',
      method: 'POST',
      data: {
        'count': carts[cartsindex].cartList[index].count,
        'id': carts[cartsindex].cartList[index].id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log("++++++")
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },
  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const cartsindex = e.currentTarget.dataset.cartsindex;//店铺index
    const index = e.currentTarget.dataset.index;//店铺商品index
    let carts = this.data.carts;
    var domainUrl = getApp().domainUrl
    let num = carts[cartsindex].cartList[index].count;
    // let Total = carts[index].Total
    // let price = carts[index].price
    let Total = carts[cartsindex].cartList[index].currDiscountedAmount;
    let price = carts[cartsindex].cartList[index].product.malMobilePrice;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    Total = (num * price).toFixed(2);
    carts[cartsindex].cartList[index].currDiscountedAmount = Total
    carts[cartsindex].cartList[index].count = num
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.getNumber()
    console.log(price)
    console.log(Total)
    wx.request({
      url: domainUrl+'xiaochengxucart/updatecartById.html',
      method: 'POST',
      data: {
        'count': num,
        'id': carts[cartsindex].cartList[index].id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log("----")
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {  // 循环列表得到每个数据
      for (let j = 0; j < carts[i].cartList.length; j++) {
        if (carts[i].cartList[j].checked) {                     // 判断选中才会计算价格
          total += carts[i].cartList[j].count * carts[i].cartList[j].product.malMobilePrice
        }
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  // 小计
  getTotal() {
    let carts = this.data.carts;
    for (var i = 0; i < carts.length; i++) {
      let num = carts[i].num;
      let Total = carts[i].Total;
      let price = carts[i].price
      Total = (num * price).toFixed(2)
      carts[i].Total = Total;
      carts[i].num = num;
    }
    this.setData({
      carts: carts
    });
  },
  // 产品数量
  getNumber() {
    let carts = this.data.carts;
    let total = 0;
    console.log(carts)
    // for (var i = 0; i < carts.length; i++) {
    //   if (carts[i].selected) {
    //     total += carts[i].num
    //   }
    // }
    for (let i = 0; i < carts.length; i++) {  // 循环列表得到每个数据
      for (let j = 0; j < carts[i].cartList.length; j++) {
        if (carts[i].cartList[j].selected) {
          total += carts[i].cartList[j].count
        }
      }

    }
    this.setData({
      carts: carts,
      totalnumb: total
    })
  },
  // 去结算
  // goBuy() {
  // var memberId = wx.getStorageSync('memberId')
  // console.log(memberId)
  // wx.request({
  //   url: 'https://ehalfresh.4kb.cn/xiaochengxu/order/info.html',
  //   method: 'GET',
  //   data: {
  //     'memberId': memberId,
  //   },
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: (res) => {
  //     console.log("去结算")
  //     console.log(res)
  //   }
  // })
  // }
})