// pages/choosefw/choosefw.js

var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:'报单已成交',
    _num: 0,  
    method: [
    { name: '对方已购买' },
    { name: '对方需要低价采购国产产品' },
    { name: '其他' }
     ],
    actionSheetHidden: true,
    actionSheetItems: ['报单未成交', '报单已成交'],
    imgs: [],
    imgsurl:[],
    hidden:true
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
  chooseImg() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.tempFilePaths = res.tempFilePaths;
        that.setData({
          imgs: that.data.imgs.concat(res.tempFilePaths)
        });
        for (var index in res.tempFilePaths) {
          that.uploadQiniu(res.tempFilePaths[index])
        }
      }
    })
  },
  uploadQiniu(tempFilePaths) {
    var that =this;
    let domain = '';
    let token = '';
    wx.request({
      url: app.baseUrl.Url+'third/qiniu/upload/refresh',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      success: function (res) {
        domain = res.data.domain;
        token = res.data.auth;
        wx.uploadFile({
          url: 'https://upload-z2.qiniup.com',
          name: 'file',
          filePath: tempFilePaths,
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            token: token,
          },
          success: function (res) {
            let data = JSON.parse(res.data)
            that.setData({
              imgsurl: that.data.imgsurl.concat(domain + data.key)
            });
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
    })

 
  },


  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var imgsurl = this.data.imgsurl;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    imgsurl.splice(index, 1);
    this.setData({
      imgs: imgs,
      imgsurl:imgsurl
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },









  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  bindItemTap: function (e) {
    this.setData({
      res: e.currentTarget.dataset.name,
      actionSheetHidden: !this.data.actionSheetHidden
    });

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
  fsub:function(e){
    var that =this;
    that.data.hidden=false;
    var note ='';
    if(that.data._num!=2){
      note = that.data.method[that.data._num].name
    }else{
      note = that.data.ceshi
    }

    wx.request({
      url: app.baseUrl.Url+'purchaseOrder/update/feedback',
      method: 'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo"), 'result': '报单未成交', 'outstandingCause': note},
      success: function (res) {
        that.data.hidden = true;
        util.tusi('上报成功', that.data.setInter = setInterval(function () {
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
  bindremarkAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  sub:function(e){
    var that =this;
    that.data.hidden = false;
    if (that.data.remark!=undefined){
      wx.request({
        url: app.baseUrl.Url+'/purchaseOrder/update/feedback',
        method: 'PUT',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync("retoken")
        },
        data: { 'orderNo': wx.getStorageSync("orderNo"), 'result': '报单已成交', 'note': that.data.remark, 'imager': that.data.imgsurl },
        success: function (res) {
          that.data.hidden = true;
          util.tusi('上报成功', that.data.setInter = setInterval(function () {
            wx.navigateBack();
            that.endSetInter();
          }, 2000))
        }
      })
    }else{
      util.getmodal('','信息未填写完整',false,'确定')
    }
  
  }
})