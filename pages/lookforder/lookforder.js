// pages/handleform/handleform.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    total2:0,
    msg:[],
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
    var that = this;
    that.data.hidden = false;
    var Surl = ''
    if (wx.getStorageSync("lookf") == 'a') {
      Surl = app.baseUrl.Url+'user/query/allDeclaration'
    } else if (wx.getStorageSync("lookf") == 's') {
      Surl = app.baseUrl.Url+'user/query/sendDeclaration'
    } else {
      Surl = app.baseUrl.Url+'user/query/dealDeclaration'
    }
    wx.request({
      url: Surl,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      success: function (res) {
        that.data.hidden = true;
        if (res.data.dtop != null || res.data.dtop != null) {
          that.setData({
            total: 1,
            msg: res.data.dtop,
            msg2: res.data.dtor
          })
        }
      },
    })
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
  godetail:function(e){
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ordernum);
    wx.setStorageSync("ordertype", e.currentTarget.dataset.ordertype);
    util.gonext('detail')
  }
})