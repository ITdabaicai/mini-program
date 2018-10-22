// pages/detail/detail.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: ['已下单','已结束','处理中'],
    total:'',
    hidden: true
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.setData({
      hidden: false
    }) 
    wx.request({
      url: app.baseUrl.Url+'operations/query/operations',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo")},
      success: function (res) {
        that.setData({
          hidden: true
        }) 
        that.setData({
          total: res.data,
          totallength: res.data.length,
          ordernum: wx.getStorageSync("orderNo"),
          ordertype: wx.getStorageSync("ordertype"),
          nowstate:res.data[0].nowState,
        })
      },
    })
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
  callnum:function(e){
   let num = e.currentTarget.dataset.num
   util.callnum(num);
  },
  // 查看反馈详情

  // 查看反馈详情-购买
  thedetail: function (e) {
    util.gonext('repairsdetail');
  },
  // 查看反馈详情-维修
  rthedetail: function (e) {
    util.gonext('checkdetail');
  },
})