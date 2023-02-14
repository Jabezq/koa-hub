const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../app/config');

class AuthController {
  async login(ctx, next) {
    const { id, username } = ctx.request.body;
    const userInfo = {
      id,
      username
    }

    const token = jwt.sign(userInfo, SECRET_KEY, {
      expiresIn: '24h'
    });

    ctx.body = {
      id,
      username,
      token
    };
  }
}

module.exports = new AuthController();