// page/component/new-pages/user/address/address.js
Page({
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
    indexP:'',
    indexC:'',
    indexA:'',
    animationAddressMenu: {},
    addressMenuIsShow: false,
    provinces: [],
    citys: [],
    areas: [],
    provinceName: '',
    cityName: '',
    areaName: ''
  },
  // 页面加载取本地缓存
  onLoad() {
    var that = this
    var memberId = wx.getStorageSync('memberId')
    var domainUrl = getApp().domainUrl
    this.setData({
      'address.memberId': memberId
    })
    console.log(memberId)
    // 城市三级联动
    wx.request({
      url: domainUrl+'xiaochengxumember/newaddress.html',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        // var address = res.data[0]
        // // var id = res.data[0].provinceList[0].id
        // console.log(address)
        // console.log(id)
        this.setData({
          provinces: res.data[0].provinceList,
        })
      },
      fail: (res) => {
        console.log("error")
      }
    })
  },
  provinceChange: function (e) {//选择省
    var domainUrl = getApp().domainUrl
    console.log(this.data.provinces[e.detail.value].id)
    console.log(this.data.provinces[e.detail.value].regionName)
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
      indexC:'',
      indexA:'',
      provinceName: this.data.provinces[e.detail.value].regionName,
      cityName: '',
      areaName: ''

    })
  },
  cityChange: function (e) {//选择市
    var domainUrl = getApp().domainUrl
    console.log(this.data.citys[e.detail.value].id)
    console.log(this.data.citys[e.detail.value].regionName)
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    var domainUrl = getApp().domainUrl
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    var addAll='';
    var domainUrl = getApp().domainUrl
    addAll += this.data.provinceName + this.data.cityName + this.data.areaName 
    this.setData({
      'address.addAll': addAll
    })
    if (self.data.address.memberName && self.data.address.phone && self.data.address.addressInfo) {
      wx.request({
        url: domainUrl+'xiaochengxumember/saveaddress.html',
        method: 'POST',
        dataType: "json",
        // data: {
        //   'memberAddress': memberAddress,
        // },
        data: this.data.address,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (res) => {
          console.log("success")
          wx.navigateTo({
            url: '../addressList/addressList',
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
  // 取页面数据
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
})