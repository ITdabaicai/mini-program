// pages/numpass/numpass.js
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'获取验证码',
    disabled: true,
    loading: false,
    timer:'',
    mobile:'',
    code:'',
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
  watchtelnum: function (event) {
    if (event.detail.value.length<11){
      this.setData({ disabled: true });
      this.data.mobile = event.detail.value
      return event.detail.value
    }
   else{
      this.data.mobile = event.detail.value
      this.setData({mobile:event.detail.value});
      this.setData({ disabled: false });      
    }
  },
  watchtelcode: function (event) {
    this.setData({ code: event.detail.value });
  },
  tryget: function (e) {
    var that = this;
    that.setData({ 
      loading: true,
      disabled:true,
      text: "60"
       });
    that.Countdown(that.data.text);
    wx.request({
      url: app.baseUrl.Url+'third/' + that.data.mobile+'/verify',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync("retoken")
      },
      success: function (res) {
        util.tusi('发送成功')
                
      },
    })
    
  },
  Countdown: function(num) {
    let that = this;
    let toint= parseInt(num);
    this.setData({
        timer: setInterval(function () {  
                toint--;
                that.setData({
                  text: toint
                });
          if (toint <= 0) {
            clearInterval(that.data.timer);
            that.setData({
              loading: false,
              disabled: false,
              text: '获取验证码'
            });  
              }
            }, 1000)
        })

  
  },
  gologin:function(){
    var that =this;
    if (that.data.mobile.length==0){
      util.getmodal('', '请填写手机号', false, '确定')
    } else if (that.data.mobile.length > 0 && that.data.mobile.length<10){
      util.getmodal('', '手机号格式错误', false, '确定')
    }else{
      if (that.data.code.length < 4) {
        util.getmodal('', '验证码格式错误', false, '确定')
      } else {
        that.setData({
          hidden:false
        })
        wx.request({
          url: app.baseUrl.Url+'user',
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("retoken")
          },
          data: { authCode: that.data.code, mobile: that.data.mobile },
          success: function (res) {
            if(res.statusCode!=200){
              that.setData({
                hidden: true
              })
              util.getmodal('', '验证码错误', false, '确定')
            }else{
              wx.setStorageSync("tel", res.data.mobile);   
            var juese = [
                { name: '总部', index: 0 },
                { name: '总部业务员', index: 1 },
                { name: '代理商', index: 2 },
                { name: '代理商业务员', index: 3 },
                { name: '经销商', index: 4 },
                { name: '经销商业务员', index: 5 },
                { name: '服务商', index: 6 },
                { name: '普通用户', index: 7 }
              ];
              for (var index in juese) {
                if (res.data.identity == juese[index].name)
                  wx.setStorageSync("juese",juese[index].index);
              };
              if(res.data.name!=null){
                wx.setStorageSync("token",1);
                wx.setStorageSync("name", res.data.name);
                wx.setStorageSync("qrcode", res.data.qrCode);
                that.setData({
                  hidden: true
                })
                wx.reLaunch({
                  url: '/pages/myself/myself',
                })
              }else{
                that.setData({
                  hidden: true
                })
                util.gonext('login');

              }   
            }              
          },
        })
      }
    }
  

  }
})