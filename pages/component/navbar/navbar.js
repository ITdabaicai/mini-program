// pages/component/navbar/navbar.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  properties: {
    // 这里定义了tabs属性，属性值可以在组件使用时指定，类似于react的props和proptype
    tabs: {
      type: [],
      value: ["PHOTO1", "BLOG1"],
    },
    neirong: Array,
    ishasyw:Boolean,
    ishasfw:Boolean,
    sliderLeft:Number,
  
  },
  data: {
    // 初始化一些默认值ß
    activeIndex: 0,
    sliderOffset: 0
  },
  created: function () {
    //空间被创建时触发
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  methods: {
      // 按钮行为触发状态机变化
      tabClick: function (e) {
        this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
        });
        var that = this;
        var val = that.data.activeIndex; //通过这个传递数据
        var myEventDetail = {
          val: val
        } // detail对象，提供给事件监听函数
        this.triggerEvent('myevent', myEventDetail) //myevent自定义名称事件，父组件中使用
      }
    },

});