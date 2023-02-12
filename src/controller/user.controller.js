const server = require('../server/user.server');

class UserController {
  async register(ctx, next) {
    const info = ctx.request.body;

    // 数据库操作
    const sqlResult = await server.register(info);

    // 返回数据
    ctx.body = sqlResult;
  }
}

module.exports = new UserController();