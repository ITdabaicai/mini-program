// pages/baodan/baodan.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({

    })

    var that = this;
    wx.getStorage({
      key: 'juese',
      success: function (res) {
        that.setData({
          juese: res.data
        });
      }
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
  gohandle:function(){
    var a = util.istoken()
    if (a != false) {
      util.gonext('gohandle')
    }
  },
  gopublic:function(){
    var a = util.istoken()
    if (a != false) {
      if (this.data.juese == 7 || this.data.juese == 6){
          util.gonext('public')
      }else{
        wx.showModal({
          title: '权限提示',
          content: "您的身份暂时没有进行此权限操作/查看此页面",
          showCancel: false,
          confirmText: "知道了",
          confirmColor: '#00ce9f'
        })
      }
    }
  },
})