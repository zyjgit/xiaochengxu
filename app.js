App({
  onLaunch: function () {
    // console.log('App Launch')
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log(logs)
  },
  onShow: function () {
    // console.log('App Show')  
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
  getUserInfo: function (cb) {
    var that = this
    var code = "";
    var nickName = "";
    var memberId = "";
    var domainUrl = this.domainUrl
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //授权获取用户名、头像、地址
      wx.login({
        success: function (res) {
          code = res.code
          console.log(code)
          
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              nickName = res.userInfo.nickName
              console.log(nickName)
              wx.request({
                url:domainUrl+"xiaochengxuwechat/memberWxsign/auth.html?code=" + code + "&nickName=" + nickName,
                success:function(res){
                console.log(res)  
                  wx.setStorage({
                    key: "memberId",
                    data: res.data.memberId
                  })
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  },
   domainUrl: 'https://ehalfresh.4kb.cn/' //本地测试
  //  domainUrl: 'https://m.ehalfresh.com/' //正式
})
