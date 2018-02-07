Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      memberId: '',
      memberName: '',
      phone: '',
      mobile: '',
      addressInfo: '',
      provinceId: '',
      cityId: '',
      areaId: '',
      addAll: '',
      zipCode: ''
    },
    provinces: [],
    citys: [],
    areas: [],
    indexP: '',
    indexC: '',
    indexA: '',
    provinceName: '',
    cityName: '',
    areaName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    // 城市三级联动
    wx.request({
      url: domainUrl+'xiaochengxumember/newaddress.html',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        this.setData({
          provinces: res.data[0].provinceList,
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
    wx.request({
      url: domainUrl+'xiaochengxumember/editaddress.html',
      method: 'GET',
      data: {
        'id': options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var address = res.data[0].address
        console.log(address)
        this.setData({
          'address.id': address.id,
          'address.memberId': address.memberId,
          'address.memberName': address.memberName,
          'address.phone': address.phone,
          'address.mobile': address.mobile,
          'address.addressInfo': address.addressInfo,
          'address.provinceId': address.provinceId,
          'address.cityId': address.cityId,
          'address.areaId': address.areaId,
          'address.addAll': address.addAll,
          'address.zipCode': address.zipCode,
          provinces: res.data[0].provinceList,
          citys: res.data[0].cityList,
          areas: res.data[0].areaList,
        })
        //省
        for (var i = 0; i < this.data.provinces.length; i++) {
          var provinceId = this.data.address.provinceId
          if (provinceId == this.data.provinces[i].id) {
            this.setData({
              indexP: i,
              provinceName: this.data.provinces[i].regionName
            })
          }
        }
        // 市
        for (var i = 0; i < this.data.citys.length; i++) {
          var provinceId = this.data.address.cityId
          if (provinceId == this.data.citys[i].id) {
            this.setData({
              indexC: i,
              cityName: this.data.citys[i].regionName
            })
          }
        }
        //区
        for (var i = 0; i < this.data.areas.length; i++) {
          var provinceId = this.data.address.areaId
          if (provinceId == this.data.areas[i].id) {
            this.setData({
              indexA: i,
              areaName: this.data.areas[i].regionName
            })
          }
        }
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },
  provinceChange: function (e) {//选择省
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'getRegionByParentId',
      method: 'GET',
      data: {
        parentId: this.data.provinces[e.detail.value].id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        this.setData({
          citys: res.data.data,
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
    this.setData({
      'address.provinceId': this.data.provinces[e.detail.value].id,
      indexP: e.detail.value,
      indexC: '',
      indexA: '',
      provinceName: this.data.provinces[e.detail.value].regionName,
      cityName: '',
      areaName: ''
    })
  },
  cityChange: function (e) {//选择市
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'getRegionByParentId',
      method: 'GET',
      data: {
        parentId: this.data.citys[e.detail.value].id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        this.setData({
          areas: res.data.data,
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
    this.setData({
      'address.cityId': this.data.citys[e.detail.value].id,
      indexC: e.detail.value,
      indexA: '',
      cityName: this.data.citys[e.detail.value].regionName,
      areaName: ''
    })
  },
  areasChange: function (e) {//区县
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var domainUrl = getApp().domainUrl
    wx.request({
      url: domainUrl+'getRegionByParentId',
      method: 'GET',
      data: {
        parentId: this.data.areas[e.detail.value].id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log("error")
      }
    })
    this.setData({
      'address.areaId': this.data.areas[e.detail.value].id,
      indexA: e.detail.value,
      areaName: this.data.areas[e.detail.value].regionName
    })
  },
  // 点击添加新地址
  formSubmit(e) {
    var self = this;
    var addAll = '';
    var domainUrl = getApp().domainUrl
    addAll += this.data.provinceName + this.data.cityName + this.data.areaName
    this.setData({
      'address.addAll': addAll
    })
    console.log(this.data.address)
    if (self.data.address.memberName && self.data.address.phone && self.data.address.addressInfo) {
      wx.request({
        url: domainUrl+'xiaochengxumember/saveaddress.html',
        method: 'POST',
        dataType: "json",
        data: this.data.address,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (res) => {
          console.log("success")
          wx.navigateTo({
            url: '../addressList/addressList'
          })
        },
        fail: (res) => {
          console.log("error")
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  },
  bindName(e) {
    this.setData({
      'address.memberName': e.detail.value
    })
  },
  bindPhone(e) {
    this.setData({
      'address.phone': e.detail.value,
      'address.mobile': e.detail.value
    })
  },
  bindDetail(e) {
    this.setData({
      'address.addressInfo': e.detail.value
    })
  },
  bindZipCode(e) {
    this.setData({
      'address.zipCode': e.detail.value
    })
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