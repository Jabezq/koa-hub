const errorTypes = require('../constant/error-types');
const server = require('../server/user.server');
const cryptoPassword = require('../utils/crypto-password');

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 检查用户名和密码是否为空
  if (!username || !password || username === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);

    return ctx.app.emit('error', error, ctx);
  }

  // 检查用户名是否存在
  const result = await server.queryByUsername(username);
  const user = result[0];

  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);

    return ctx.app.emit('error', error, ctx);
  }

  // 检查密码是否正确
  const md5Password = cryptoPassword(password);
  if (md5Password !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);

    return ctx.app.emit('error', error, ctx);
  }

  ctx.request.body = user;
  
  await next();
}

module.exports = {
  verifyLogin
}