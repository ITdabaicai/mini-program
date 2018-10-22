//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    time:[],
    time2:[],
    hidden:true
  },
  //事件处理函数
  onLoad: function () {
   
  },
  onShow() {
    var that = this;
    that.data.hidden = false;
    wx.request({
      url: app.baseUrl.Url+'operations/query/dealOrder',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      success: function (res) {
        that.data.hidden = true;
        if (res.data.dtop.length != 0 || res.data.dtor.length != 0) {
          that.setData({
            time: res.data.dtop,
            time2: res.data.dtor,
            timelength: 1
          })
        } else {
          that.setData({
            time: res.data.dtop,
            time2: res.data.dtor,
            timelength: 0
          });
        }
      }
    })
  },
  // 存储订单号
  getordernum:function(e){
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ord);
  },



  // 查看详情
  godetail: function (e) {
    this.getordernum(e);
    wx.setStorageSync("buttonType", e.currentTarget.dataset.type);
    wx.setStorageSync("ordertype", e.currentTarget.dataset.ordertype);
    util.gonext('gohandledetail');
  },

  // 购买
  // 确认接单
  getorder:function(e){
    var that = this;
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ord);
    wx.showModal({
      title: '',
      content: '确认接单',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
          wx.request({
            url: app.baseUrl.Url+'purchaseOrder/update/acceptOrders',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: {'orderNo':wx.getStorageSync("orderNo")},
            success: function (res) {
              if (res.statusCode != 200){
                util.getmodal('', '系统内部错误', false, '确定');
                that.onShow()
              }else{
                util.tusi('接单成功', that.onShow)
              }
           
            }
          })
        }        
      }
    });

  },
  // 确认派单
  sendorder:function(e){
    this.getordernum(e);
    util.gonext('deliverymsg');
  },
  // 结束订单
  endorder:function(e){
    var that = this;
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ord);
    wx.showModal({
      title: '',
      content: '确认关闭',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
        wx.request({
          url: app.baseUrl.Url+'purchaseOrder/update/closeOrder',
          method: 'PUT',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("retoken")
          },
          data: { 'orderNo': wx.getStorageSync("orderNo") },
          success: function (res) {
            util.tusi('关闭成功', that.onShow)
          }
        })
       }
      }
    });
  },
  // 经销商动态更新
  updataorder:function(e){
    this.getordernum(e);
    util.gonext('bddt');
  },
  // 经销商上报反馈
  repororder:function(e){
    this.getordernum(e);
    util.gonext('bdres');
  },
  // 服务商上报反馈
  reporproorder:function(e) {
    this.getordernum(e);
    util.gonext('bdprob');
  },
  // 维保
  // 经销商/服务商 确认接单
  getorderw: function (e) {
    var that = this;
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ord);
    wx.showModal({
      title: '',
      content: '确认接单',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
          wx.request({
            url: app.baseUrl.Url+'repairOrder/update/confirmOrder',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: { 'orderNo': wx.getStorageSync("orderNo") },
            success: function (res) {
              if (res.statusCode != 200) {
                util.getmodal('', '系统内部错误', false, '确定');
                that.onShow();
              } else {
                util.tusi('接单成功', that.onShow)
              }

            }
          })
        }
      }
    });

  },
  // 经销商确认派单
  sendorderw: function (e) {
    this.getordernum(e);
    util.gonext('choosefw');
  },
  // 服务商更新动态
  updataorderw: function (e) {
    this.getordernum(e);
    util.gonext('bdrdt');
  },
  // 服务商上报反馈
  repororderw: function (e) {
    this.getordernum(e);
    util.gonext('bdrres');
  },
  // 经销关闭派单
  endorderw: function (e) {
    var that = this;
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ord);
    wx.showModal({
      title: '',
      content: '确认关闭',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
          wx.request({
            url: app.baseUrl.Url+'repairOrder/update/closeOrder',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: { 'orderNo': wx.getStorageSync("orderNo") },
            success: function (res) {
              util.tusi('关闭成功', that.onShow)
            }
          })
        }
      }
    });
  },
  // 经销商确认结果
  clearorderw:function(e){
    this.getordernum(e);
    var that= this;
    wx.showModal({
      title: '',
      content: '确认此报单结果',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        if (res.cancel) {
          util.tusi('已取消')
        } else {
          wx.request({
            url: app.baseUrl.Url+'/repairOrder/update/confirmResult',
            method: 'PUT',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync("retoken")
            },
            data: { 'orderNo': wx.getStorageSync("orderNo") },
            success: function (res) {
              util.tusi('结果已确认', that.onShow)
            }
          })
        }
      }
    });
  }
})
