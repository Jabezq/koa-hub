const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../app/config');
const errorTypes = require('../constant/error-types');
const server = require('../server/user.server');
const emitError = require('../utils/error-emit');
const cryptoPassword = require('../utils/crypto-password');

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 检查用户名和密码是否为空
  if (!username || !password || username === '' || password === '') {
    return emitError(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 检查用户名是否存在
  const result = await server.queryByUsername(username);
  const user = result[0];

  if (!user) {
    return emitError(errorTypes.USER_DOES_NOT_EXISTS, ctx);
  }

  // 检查密码是否正确
  const md5Password = cryptoPassword(password);
  if (md5Password !== user.password) {
    return emitError(errorTypes.PASSWORD_IS_INCORRECT, ctx);
  }

  ctx.request.body = user;
  
  await next();
}

/**
 * 验证token中间件
 */
const verifyAuth = async (ctx, next) => {
  console.log('--- auth.middleware/verify token ---');

  const result = ctx.headers.authorization;
  if (!result) {
    return emitError(errorTypes.UNANTHORIZED, ctx);
  }
  const token = result.replace('Bearer ', '');

  try {
    const authResult = jwt.verify(token, SECRET_KEY);

    // 验证结果赋值给ctx
    ctx.user = authResult;

    await next();
  } catch {
    return emitError(errorTypes.UNANTHORIZED, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}