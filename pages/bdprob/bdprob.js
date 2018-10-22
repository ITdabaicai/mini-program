// pages/bdprob/bdprob.js\
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
    { name: '成交报单后且已兑现提成' }, 
    { name: '接单派单不够及时' }, 
    { name: '多次报单未能成功' },
    { name: '成交保单后未能兑现提成'}, 
    { name: '配合方面不积极' },
    { name: '业务人员业务不熟悉' },
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
    that.data.hidden = false;
    var note = '';
    if (that.data._num != 6) {
      note = that.data.method[that.data._num].name
    } else {
      note = that.data.ceshi
    };
    wx.request({
      url: app.baseUrl.Url+'purchaseOrder/update/problemFeedback',
      method: 'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo"),'problem': note},
      success: function (res) {
        that.data.hidden = true;
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 2000,
          mask: true,
          success: function (res) {
            that.data.setInter = setInterval(function () {
              wx.navigateBack();
              that.endSetInter();
            }, 2000);

          }
        })
      }
    })
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})