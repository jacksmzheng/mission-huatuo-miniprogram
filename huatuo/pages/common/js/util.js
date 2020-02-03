const { $Message } = require('../../dist/base/index');

function handleError(message) {
  $Message({
    content: message || '请完善信息!',
    type: 'error'
  });
}

function showErrorMessage(code, content) {
  switch (code){
    case 400:
      content
      break;
    case 500:
      content
      break;
    default:
      content = "网络请求错误，请稍后重试！"
      break;
  }
  wx.showToast({
    title: content,
    icon: 'none',
    duration: 2000,
  })
}


module.exports = {
  showErrorMessage,
  handleError: handleError

}