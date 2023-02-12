const errorTypes = require('../constant/error-types');

function errorHandle(err, ctx) {
  let status, message;

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名和密码不能为空！"
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在！"
      break;
    default: 
      status = 404;
      message = "NOT FOUND";
  }
  
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;