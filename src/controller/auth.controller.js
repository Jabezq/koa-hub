class AuthController {
  async login(ctx, next) {
    ctx.body = 'login';
  }
}

module.exports = new AuthController();