// pages/myself/myself.js

var util = require('../../utils/util.js')
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */  
  data: {
    mypositionleft: 0,
    allCount:0,
    sendCount: 0,
    dealCount: 0,
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (wx.getStorageSync("retoken") == '') {
      wx.setStorageSync("juese", 7);
      wx.setStorageSync("token", 0);
    }
    var that = this
    that.setData({
      juese: wx.getStorageSync("juese"),
      token: wx.getStorageSync("token")
    });

    if (wx.getStorageSync("token") != 0) {
      that.setData({
        name: wx.getStorageSync("name"),
        tel: wx.getStorageSync("tel"),
        avatarUrl: wx.getStorageSync("avatarUrl"),
      });
      wx.request({
        url: app.baseUrl.Url+'user/query/declaration/count',
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync("retoken")
        },
        success: function (res) {
          that.setData({
            allCount: res.data.allCount,
            dealCount: res.data.dealCount,
            sendCount: res.data.sendCount
          });
        },
      })
      var query = wx.createSelectorQuery();
      query.select('.myname').boundingClientRect(function (rect) {
        if (rect.width == 36) {
          that.setData({
            mypositionleft: rect.width + 220 + 'rpx'
          });
        } else if (rect.width == 54) {
          that.setData({
            mypositionleft: rect.width + 240 + 'rpx'
          });
        } else {
          that.setData({
            mypositionleft: rect.width + 260 + 'rpx'
          });
        }
      }).exec();
    }
    
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
  // 扫一扫
  click: function () {
    var a = util.istoken();
    if (a != false) {
      var that = this;
      var show;
      wx.scanCode({
        success: (res) => { 
        
          wx.request({
            url: app.baseUrl.Url+'user/generateQrCode',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: {'superiorId':res.result},
            success: function (res) {
              var juese = [
                { name: '总部', index: 0 },
                { name: '总部业务员', index: 1 },
                { name: '代理商', index: 2 },
                { name: '代理商业务员', index: 3 },
                { name: '经销商', index: 4 },
                { name: '经销商业务员', index: 5 },
                { name: '服务商', index: 6 },
                { name: '普通用户', index: 7 }
              ];
              for (var index in juese) {
                  if (res.data.identity == juese[index].name){
                    wx.setStorageSync("juese", juese[index].index);
                    wx.setStorageSync("qrcode", res.data.qrCode)
                  };
                  util.tusi('扫码完成');
                  that.onShow();
                }
            }
          })
        },
      })
    }
 
  },
  // 从属
  gorelation:function(){
    if (wx.getStorageSync("juese")==6){
      util.getmodal('权限提示','您的身份暂时没有权限查看此页面',false,'知道了')
    }else{
      util.gonext('relation')
    }  
  },
  // 二维码
  goewm:function(){
    util.gonext('ewm')
  },
  //报单查看 
  lookf: function (e) {
    var a = util.istoken()
    if (a != false) {
      wx.setStorageSync("lookf", e.currentTarget.dataset.lookf);
      util.gonext('lookforder')
    }
  },
  // 登录
    getUserInfoFun: function () {
      var that = this;
      that.setData({
        hidden: false
      }) 
      // 个人授权
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function (res) {
          wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
          wx.setStorageSync("city", res.userInfo.city);
          wx.setStorageSync("province", res.userInfo.province);
          wx.setStorageSync("nickName", res.userInfo.nickName);
          wx.request({
            url: app.baseUrl.Url+'third/token/refresh',
            method: 'POST',
            success: function (res) {
              that.data.hidden = true;
              wx.setStorageSync("retoken", res.data.refresh_token);
              // openid
              wx.login({
                success: function (res) {
                  wx.request({
                    url: app.baseUrl.Url+'user/getOpenid',
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: { code: res.code },
                    success: function (res) {
                      wx.setStorageSync("openid", res.data.openid);
                      wx.setStorageSync("session_key", res.data.session_key);
                      // 地址授权
                      wx.getLocation({
                        success: function (res) {
                          wx.setStorageSync("latitude", res.latitude);
                          wx.setStorageSync("longitude", res.longitude);
                          that.setData({
                            hidden: true
                          })
                          util.gonext('num')
                        },
                        fail:function(res){
                          wx.getLocation({
                            success: function (res) {
                              wx.setStorageSync("latitude", res.latitude);
                              wx.setStorageSync("longitude", res.longitude);
                              util.gonext('num')
                            },
                            })
                          that.setData({
                            hidden: true
                          })
                          util.gonext('num')
                        }
                      })
                    },
                  })
                }
              })
            },
          })
        },
      })
   
 

    },
  // 致电
    callkefu:function(e){
      var kefunum ='010-42352677';
      util.callnum(kefunum); 
    },
  // 注销
    getout:function(){
      wx.request({
        url: app.baseUrl.Url+'user/logout',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync("retoken")
        },
        success: function (res) {
          wx.setStorageSync("retoken", '');
          wx.setStorageSync("token", 0);
          wx.setStorageSync("juese", 7);
          wx.reLaunch({
            url: '/pages/myself/myself',
          })
        },
      })
    },
})