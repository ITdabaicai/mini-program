// pages/relation/relation.js
var util = require('../../utils/util.js')
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[],
    neirong:[],
    ishasyw: true,
    ishasfw: true,
    sliderLeft: 85,
    activeIndex: 0,
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
    that.setData({
      juese: wx.getStorageSync("juese")
    })
    switch (wx.getStorageSync("juese")) {
      case 0:
        that.setData({
          tab: ["业务员", "代理商"],
        })
        that.tongyong('1','0')
        break;
      case 2:
        that.setData({
          tab: ["业务员", "经销商"],
        })
        that.tongyong('1', '0')
        break;
      case 4:
        that.setData({
          tab: ["业务员", "服务商"],
        })
        that.tongyong('1', '0')
        break;
      default :
        that.setData({
          tab: [],
        })
        that.tongyong('0','0');
    }
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
  onGetCode:function(e){
       this.setData({
         activeIndex :e.detail.val
       })
      if (this.data.activeIndex==0){
        this.tongyong('1', '0')
      }else{
        this.tongyong('0', '1')
      }
    },
    tongyong:function(first,end){
      var that =this;
      wx.request({
        url: app.baseUrl.Url+'/user/query/affiliation',
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync("retoken")
        },
        data: { 'business': first, 'nextLevel': end},
        success: function (res) {
          if(first==0&&end==0){
            if (res.data.length != 0) {
              that.setData({
                neirong3: res.data,
                ishasfw: true
              })
            } else {
              that.setData({
                ishasfw: false
              })
            }   
          }else{
            if (first == 1) {
              if (res.data.length != 0) {
                that.setData({
                  neirong: res.data,
                  ishasyw: true
                })
              } else {
                that.setData({
                  ishasyw: false
                })
              }
            } else {
              if (res.data.length != 0) {
                that.setData({
                  neirong2: res.data,
                  ishasfw: true
                })
              } else {
                that.setData({
                  ishasfw: false
                })
              }
            }           
          }   
        },
      })
    },
    call:function(e){
      util.callnum(e.currentTarget.dataset.num);
    }
  })
 