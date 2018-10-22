// pages/choosefw/choosefw.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 0,  
    neirong:[]
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
    var that =this;
    wx.request({
      url: app.baseUrl.Url+'user/query/serviceUserList',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      success: function (res) {
          that.setData({
            neirong:res.data,
            id: res.data[0].id
          })  
      }
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
  clickNum: function(e){
    this.setData({
      _num: e.currentTarget.dataset.num,
      id: e.currentTarget.dataset.id
    })
  },
  sub:function(e){
    var that = this;
    wx.showModal({
      title: '',
      content: '确认派单',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
            wx.request({
              url: app.baseUrl.Url+'repairOrder/update/sendOrder',
              method: 'PUT',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("retoken")
              },
              data: { 'serviceId': that.data.id, 'orderNo': wx.getStorageSync("orderNo") },
              success: function (res) {
                util.tusi('派单成功', that.data.setInter=setInterval(function () {
                  wx.navigateBack();
                  that.endSetInter();
                }, 2000))  
              }
            })
        }
      }
    });
  },
  // 清除计时器
  endSetInter: function () {
    var that = this;
    clearInterval(that.data.setInter)
  },
})