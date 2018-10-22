//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部', '维修', '购买'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    aindex:0,
    height: '',
    tab: ["进行中", "已结束","已关闭"],
    sliderLeft: 45,
    activeIndex: 0,
    total:'',
    state:'全部',
    ortype: "进行中",
    firstcount:1,
    firstpage:10,
    time:[],
    hidden: true
  },
  //事件处理函数
  onLoad: function () {

  },
  onShow:function(){
    this.getmsg('10');
  },
  // 状态
  onGetCode: function (e) {
    this.setData({
      activeIndex: e.detail.val
    })
    this.data.ortype = this.data.tab[this.data.activeIndex];
    this.data.firstcount = 1 ;
    let Size = this.data.firstpage
    this.getmsg(Size);
  },
  // 查看详情
  godetail: function (e) {
    wx.setStorageSync("orderNo", e.currentTarget.dataset.ordernum);
    wx.setStorageSync("ordertype", e.currentTarget.dataset.ordertype);
    util.gonext('detail');
  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  // 筛选条件
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      aindex: Index,
      show: !this.data.show
    });
    this.data.state = this.data.selectData[this.data.index];
    this.data.show = true;
    let Size = this.data.firstpage
    this.getmsg(Size);
  },
  // 接口
  getmsg: function (pageindex){
    var that = this;
    that.setData({
      hidden: false
    }) 
    wx.request({
      url: app.baseUrl.Url+'operations/query/orderList',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'state': that.data.ortype, 'type': that.data.state, 'pageIndex': 1, 'pageSize': pageindex },
      success: function (res) {
        that.setData({
          hidden: true
        }) 
         that.setData({
          time: res.data.data,
          pageCount: res.data.pageCount,
          total: res.data.count
        })
      },
    })
  },
  // 上拉加载
  onReachBottom: function () {
    var that=this;
    if (that.data.firstcount<this.data.pageCount){
      that.data.firstcount = that.data.firstcount+1;
      let Size = that.data.firstcount * that.data.firstpage;
      that.getmsg(Size);
    }else{
      util.tusi('已加载全部')
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: app.baseUrl.Url+'operations/query/orderList',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("retoken")
      },
      data: { 'state': that.data.ortype, 'type': that.data.state, 'pageIndex': 1, 'pageSize': 10 },
      success: function (res) {
        that.setData({
          time: res.data.data,
          pageCount: res.data.pageCount,
          total: res.data.count,
          firstcount:1
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        util.tusi('刷新成功')
      },
    })
    
  }
})
