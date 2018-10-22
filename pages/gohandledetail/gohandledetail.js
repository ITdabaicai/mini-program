// pages/detail/detail.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: ['已下单', '已结束', '处理中'],
    total:'',
    buttonType:'',
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
    var that = this;
      that.setData({
        hidden: false
      }) 
    that.setData({
      buttonType: wx.getStorageSync("buttonType"),
    })
    wx.request({
      url: app.baseUrl.Url+'operations/query/operations',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo") },
      success: function (res) {
          that.setData({
            hidden: true
          }) 
        that.setData({
          total: res.data,
          totallength: res.data.length,
          ordernum: wx.getStorageSync("orderNo"),
          ordertype: wx.getStorageSync("ordertype"),
          nowstate: res.data[0].nowState,
        })
      },
    });
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
  callnum: function (e) {
    let num = e.currentTarget.dataset.num
    util.callnum(num);
  },
  // 确认接单
  getorder: function (e) {
      var that = this;
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
              data: { 'orderNo': wx.getStorageSync("orderNo") },
              success: function (res) {
                if (res.statusCode != 200) {
                  util.getmodal('', '系统内部错误', false, '确定');
                } else {
                  util.tusi('接单成功', that.data.setInter = setInterval(function () {
                    wx.navigateBack();
                    that.endSetInter();
                  }, 2000))
                }
              }
            })
          }
        }
      });
    },
  // 确认派单
  sendorder: function (e) {
    util.gonext('deliverymsg');
  },
  // 结束订单
  endorder: function (e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '确认关闭',
      showCancel: true,
      confirmText: '确认',
      confirmColor: '#00ce9f',
      success: function (res) {
        wx.request({
          url: app.baseUrl.Url+'purchaseOrder/update/closeOrder',
          method: 'PUT',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("retoken")
          },
          data: { 'orderNo': wx.getStorageSync("orderNo") },
          success: function (res) {
            util.tusi('关闭成功', that.data.setInter = setInterval(function () {
              wx.navigateBack();
              that.endSetInter();
            }, 2000))
          }
        })
      }
    });
  },
  // 经销商动态更新
  updataorder: function (e) {
    util.gonext('bddt');
  },
  // 经销商上报反馈
  repororder: function (e) {
    util.gonext('bdres');

  },
  // 服务商上报反馈
  reporproorder: function (e) {
    util.gonext('bdprob');
  },

  // 维保
  // 经销商/服务商 确认接单
  getorderw: function (e) {
    var that = this;
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
                util.tusi('接单成功', that.data.setInter = setInterval(function () {
                  wx.navigateBack();
                  that.endSetInter();
                }, 2000))
              }

            }
          })
        }
      }
    });

  },
  // 经销商确认派单
  sendorderw: function (e) {
    util.gonext('choosefw');
  },
  // 服务商更新动态
  updataorderw: function (e) {
    util.gonext('bdrdt');
  },
  // 服务商上报反馈
  repororderw: function (e) {
    util.gonext('bdrres');
  },
  // 经销关闭派单
  endorderw: function (e) {
    var that = this;
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
              util.tusi('关闭成功', that.data.setInter = setInterval(function () {
                wx.navigateBack();
                that.endSetInter();
              }, 2000))
            }
          })
        }
      }
    });
  },
  // 经销商确认结果
  clearorderw: function (e) {
   var that = this;
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
              util.tusi('结果已确认', that.data.setInter = setInterval(function () {
                wx.navigateBack();
                that.endSetInter();
              }, 2000))
            }
          })
        }
      }
    });
  },






  // 查看反馈详情-购买
  thedetail:function(e){
    util.gonext('repairsdetail');
  },
  // 查看反馈详情-维修
  rthedetail:function(e){
    util.gonext('checkdetail');
  },
  // 清除计时器
  endSetInter: function () {
    var that = this;
    clearInterval(that.data.setInter)
  },
})