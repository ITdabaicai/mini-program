// pages/deliverymsg/deliverymsg.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:'上门日期',
    rest:'上门时间',
    time:'08:00',
    userName: '',
    usertel: '',
    date:'',
    hidden:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date()
    let a  = date.toLocaleDateString();
    let b = a.split('/');
    let c = b.join('-')
    this.setData({
      date:c
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
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      usertel: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  sub:function(){
    var that = this;
    that.data.hidden = false;
    wx.showModal({
      title: '',
      content: '确认派单',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          that.data.hidden = true;
          util.tusi('已取消')
        } else {
          wx.request({
            url: app.baseUrl.Url+'purchaseOrder/update/sendOrders',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: { 'orderNo': wx.getStorageSync("orderNo"), 'negotiatorName': that.data.userName, 'negotiatorMobile': that.data.usertel, 'buyingProcess': that.data.date + that.data.time },
            success: function (res) {
              if (res.statusCode != '200') {
                that.data.hidden = true;
                util.getmodal('', '请填写正确信息', false, '确定')
              } else {
                that.data.hidden = true;
                util.tusi('派单成功', that.data.setInter = setInterval(function (){
                  wx.navigateBack();
                  that.endSetInter();
                }, 2000))
              }
            }
          }) 
        }
      }
    })




   
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})