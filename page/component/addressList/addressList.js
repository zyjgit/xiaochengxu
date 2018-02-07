Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },
  onLoad() {
    var that = this
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    // 城市三级联动
    wx.request({
      url: domainUrl+'xiaochengxumember/address.html',
      method: 'GET',
      data: {
        'memberId': memberId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        this.setData({
          addressList: res.data[0].addressList,
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },
  addsubmit() {
    wx.navigateTo({
      url: "../address/address"
    })
  },
  //删除
  deleteList(e) {
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    const index = e.currentTarget.dataset.index;//店铺商品index
    let addressList = this.data.addressList;
    console.log(addressList)
    console.log(addressList[index].id)
    wx.request({
      url: domainUrl+'xiaochengxumember/deleteaddress.html  ',
      method: 'POST',
      data: {
        'id': addressList[index].id,
        'memberId': memberId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log("error")
      }
    })
    addressList.splice(index, 1);
    this.setData({
      addressList: addressList
    });
  },
  //默认
  default(e) {
    var memberId = wx.getStorageSync('memberId')
    const index = e.currentTarget.dataset.index;//店铺商品index
    let addressList = this.data.addressList;
    var domainUrl = getApp().domainUrl
    console.log(addressList)
    console.log(addressList[index].id)
    // wx.showModal({
    //   title: '提示',
    //   content: '请填写完整资料',
    //   showCancel: false
    // })
    wx.request({
      url: domainUrl+'xiaochengxumember/setdefaultaddress.html',
      method: 'GET',
      data: {
        'id': addressList[index].id,
        'memberId': memberId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '../addressList/addressList'
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

})