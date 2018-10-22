// 登录状态判断
function istoken(){
  if (wx.getStorageSync("token")==0){
    wx.showModal({
      title: '',
      content: "请先登录",
      showCancel: false,
      confirmText: "好的",
      confirmColor: '#00ce9f'
    });
    return false;
  }
}
// 提示框
function getmodal(title, content, showCancel,confirmText){
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    confirmText: confirmText,
    confirmColor: '#00ce9f',
  });
}
// 电话拨打
function callnum(num){
  wx.makePhoneCall({
    phoneNumber: num 
  })
}
// 页面跳转
function gonext(add){
    wx.navigateTo({
      url: '/pages/'+add+'/'+add,
    })
}
// 吐司
function tusi(title,successFun){
  wx.showToast({
    title: title,
    icon: 'succes',
    duration: 2000,
    mask: true,
    success: function (res) {
      typeof successFun == 'function' && successFun(res.data)
    },
  })
}


module.exports = {
  istoken:istoken,
  getmodal: getmodal,
  callnum: callnum,
  gonext: gonext,
  tusi: tusi
}
