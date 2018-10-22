// pages/bddt/bddt.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    _num: 0,  
    method: [
    { name: '不出水' }, 
    { name: '电机已烧' }, 
    { name: '需要换配件' },
    { name: '线路出现问题' }, 
    { name: '其他' },
     ]
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
  clickNum: function(e){
    this.setData({
      _num: e.currentTarget.dataset.num
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      ceshi: e.detail.value
    })
  },  
  sub:function(e){
    var that = this;
    that.data.hidden=false;
    var note = '';
    if (that.data._num != 6) {
      note = that.data.method[that.data._num].name
    } else {
      note = that.data.ceshi
    };
    wx.request({
      url: app.baseUrl.Url+'repairOrder/update/orderDynamic',
      method: 'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo"), 'orderDynamic': note},
      success: function (res) {
        that.data.hidden = true;
        util.tusi('更新成功', that.data.setInter = setInterval(function () {
          wx.navigateBack();
          that.endSetInter();
        }, 2000))
      }
    })
  },
   endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})