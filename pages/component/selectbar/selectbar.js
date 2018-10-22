// pages/component/bar/bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部记录', '维修记录', '购买记录'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    height:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击下拉显示框
    selectTap() {
      this.setData({
        show: !this.data.show
      });
    },
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: Index,
        show: !this.data.show
      });
      this.data.show=true;
    },
  }
})
