const server = require('../server/moment.server');

class MomentController {
  async create(ctx, next) {

    const user_id = ctx.user.id;
    const { content } = ctx.request.body;

    const result = await server.createMoment(user_id, content);

    ctx.body = result;
  }
}

module.exports = new MomentController();