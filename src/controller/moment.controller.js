const server = require('../server/moment.server');

class MomentController {
  async create(ctx, next) {
    const user_id = ctx.user.id;
    const { content } = ctx.request.body;

    const result = await server.createMoment(user_id, content);

    ctx.body = result;
  }

  async detail(ctx, next) {
    const moment_id = ctx.params.momentId;

    const result = await server.getMomentDetail(moment_id);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { pageNo, pageSize } = ctx.query;
    
    const result = await server.getMomentList(pageNo, pageSize);

    ctx.body = result;
  }

  async update(ctx, next) {
    const moment_id = ctx.params.momentId;
    const { content } = ctx.request.body;

    const result = await server.updateMoment(moment_id, content);
    
    ctx.body = result;
  }

  async remove(ctx, next) {
    const moment_id = ctx.params.momentId;

    const result = await server.removeMoment(moment_id);

    ctx.body = result;
  }
}

module.exports = new MomentController();