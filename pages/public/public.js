// pages/userpublic/userpublic.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
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
    this.setData({
      juese: wx.getStorageSync("juese")
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
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  gettype: function (e) {
    this.setData({
      type: e.detail.value
    });
  },
  getBname: function (e) {
    this.setData({
      Bname: e.detail.value
    });
  },
  getname: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  getphone:function(e){
    this.setData({
      phone: e.detail.value
    });
  },
  getadd: function (e) {
    this.setData({
      add: e.detail.value
    });
  },
  sub:function(){
    var that =this;
    that.setData({
      hidden: false
    })
    if (that.data.add != undefined && that.data.phone != undefined && that.data.name != undefined && that.data.type != undefined && that.data.Bname != undefined){
      if (that.data.juese==7){
        wx.request({
          url: app.baseUrl.Url+'repairOrder',
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("retoken")
          },
          data: {
            'repairSpecifications': that.data.type,
            'repairName': that.data.name,
            'repairMobile': that.data.phone,
            'company': that.data.Bname,
            'inthecity': that.data.region[0] + that.data.region[1] + that.data.region[2],
            'detailAddress': that.data.add
          },
          success: function (res) {
            if (res.statusCode != 200) {
              that.setData({
                hidden: true
              })
              util.getmodal('', '信息填写有误', false, '确定')
            } else { 
              that.setData({
                hidden: true
              })       
              util.tosi('提交成功', that.data.setInter = setInterval(function () {
                wx.navigateBack();
                that.endSetInter();
              }, 2000))

            }
          },
        })  
      }else{
        wx.request({
          url: app.baseUrl.Url+'purchaseOrder',
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("retoken")
          },
          data: {
            'productSpecifications': that.data.type,
            'buyerName': that.data.name,
            'buyerMobile': that.data.phone,
            'company': that.data.Bname,
            'inthecity': that.data.region[0] + that.data.region[1] + that.data.region[2],
            'detailAddress': that.data.add
          },
          success: function (res) {
            if (res.statusCode != 200) {
              that.setData({
                hidden: true
              });
              util.getmodal('', '信息填写有误', false, '确定')
            } else {
              that.setData({
                hidden: true
              })
              util.tosi('提交成功', that.data.setInter = setInterval(function () {
                wx.navigateBack();
                that.endSetInter();
              }, 2000))
            }
          },
        })
      }
     
 
    }else{
      that.setData({
        hidden: true
      });
      util.getmodal('', '信息未填写完整', false, '确定')
    }
  
  },
  // 清除计时器
  endSetInter: function () {
    var that = this;
    clearInterval(that.data.setInter)
  },
})