// pages/login/login.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    hidden: true
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
  watchtelname:function(event){
    this.data.name = event.detail.value
  },
  sub:function(){
    var that = this;
    that.setData({
      hidden: false
    })
    if (that.data.name.length<1){
      that.setData({
        hidden: true
      })
        util.getmodal('', '姓名错误', false, '确定') 
     }else{
       wx.request({
         url: app.baseUrl.Url+'user',
         method: 'PUT',
         header: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'token': wx.getStorageSync("retoken")
         },
         data: { 
           wid: wx.getStorageSync("openid"),
           province: wx.getStorageSync("province"),
           city: wx.getStorageSync("city"),
           nickname: wx.getStorageSync("nickName"),
           latitude: wx.getStorageSync("latitude"),
           longitude: wx.getStorageSync("longitude"),
           headUrl: wx.getStorageSync("avatarUrl"),
           name: that.data.name
          },
          success:function(res){
            if (res.statusCode != 200) {
              that.setData({
                hidden: true
              })
              util.getmodal('', '请输入真实姓名', false, '确定')
            }else{
              wx.setStorageSync("token", 1);
              wx.setStorageSync("name", that.data.name);
              that.setData({
                hidden: true
              })
              wx.reLaunch({
                url: '/pages/myself/myself',
              })
            }
            }
         
         })
     }
  }
})