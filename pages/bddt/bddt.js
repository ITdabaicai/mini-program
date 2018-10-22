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
    { name: '已交流在选型配套' }, 
    { name: '在报价阶段' }, 
    { name: '已签合同' },
    { name: '已成交(发货中)' }, 
    { name: '已安装' },
    { name: '对方已购买' },
    { name: '对方需要低价采购国产产品' }
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
  sub:function(e){
    var that = this;
    that.data.hidden=false;
    wx.request({
      url: app.baseUrl.Url+'purchaseOrder/update/orderDynamic',
      method: 'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo"), 'orderDynamic': that.data.method[that.data._num].name},
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