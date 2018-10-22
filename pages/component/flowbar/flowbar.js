// pages/component/flowbar/flowbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    src: '../../icon/barback.png'
  },
  ready: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback: function () {
      wx.navigateBack();
    },
    gettitle:function(e){
      wx.getStorage({
        key:'title',
        success: function (res) {
         this.data.title=res;
         console.log(res);
        } 
      })
    }
  }
})
