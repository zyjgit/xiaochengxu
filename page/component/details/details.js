 // page/component/details/details.js
Page({
  data:{
    goods:{}, 
    productGoodId:null,
    id:"",
    num:1,
    memberId: '',
   },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },
  urlCart(){
    // wx.switchTab({
    //   url: "../cart/cart",
    //    success: function (e) {
    //     var page = getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //      page.onLoad()
    //     console.log('去购物车')
    //   //  page.onShow();
    //   }
    // })
    wx.navigateTo({
      url: "../cart/cart",
      //  success: function (e) {
      //   var page = getCurrentPages().pop();
      //   if (page == undefined || page == null) return;
      //   // page.onLoad()
      //   console.log('去购物车')
      //   //  page.onShow();
      // }
    })
  },
  addCart(){
  var that=this;
  var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'xiaochengxucart/addtocart.html',
      method: 'POST',
      data:{
        'productId': that.data.id,
        'productGoodId': that.data.productGoodId,
        'number': that.data.num,
        'memberId': that.data.memberId,
      },
       header: {  
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
      success: (res) => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '添加成功',
          showCancel: false
        })


      }
    })
  },

  //转发页面（分享）
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '伊鲜网',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad(options){
    var productId=""
    var that = this
    this.setData({
      refId: options.refId
    })
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    console.log(memberId)
    that.setData({
      memberId: memberId,
    })
    wx.request({
      url: domainUrl+'xiaochengxuproduct/'+that.data.refId+'.html',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        res.data.masterImg = "https://img.ehalfresh.com/ejsimage" + res.data.masterImg
        res.data.actualSales = res.data.actualSales+50
        res.data.productPicture = res.data.productPicture.split(',').slice(0,res.data.productPicture.split(',').length-1)
        that.setData({
          id: res.data.id,
          productGoodId: res.data.productGoodsId,
          goods:res.data
        })
      }
    })
  }
})
//productGoodsId、id、number