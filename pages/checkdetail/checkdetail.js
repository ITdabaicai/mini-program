// pages/repairsdetail/repairsdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this;
    that.data.hidden=false;
    wx.request({
      url: app.baseUrl.Url+'repairOrder/update/serviceReporting',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'orderNo': wx.getStorageSync("orderNo") },
      success: function (res) {
        that.data.hidden = true;
        if (res.data.result =='维保失败'){
          that.setData({
            succes: true,
            dealres: res.data.result
          })
        }else{
          if (res.data.imager.length>1){
          let a = res.data.imager.split(",");
            that.setData({
              succes: false,
              remark: res.data.note,
              imgs: a
            })
          }else{
            let a = res.data.imager;
            that.setData({
              succes: false,
              remark: res.data.note,
              imgs: a
            })
          }
        
        }
      },
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
})