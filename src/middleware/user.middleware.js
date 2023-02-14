const errorTypes = require('../constant/error-types');
const server = require('../server/user.server');
const cryptoPassword = require('../utils/crypto-password');
const emitError = require('../utils/error-emit');

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 检查用户名和密码是否为空
  if (!username || !password || username === '' || password === '') {
    return emitError(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 检查用户名是否存在
  const result = await server.queryByUsername(username);
  if (result.length) {
    return emitError(errorTypes.USER_ALREADY_EXISTS, ctx);
  }

  await next();
}

const md5Password = async (ctx, next) => {
  const { password } = ctx.request.body;

  const hash = cryptoPassword(password);
  ctx.request.body.password = hash;

  await next();
}

module.exports = {
  verifyUser,
  md5Password
}