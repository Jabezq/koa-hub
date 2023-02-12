const Koa = require('koa');
const { koaBody } = require('koa-body');

const userRouter = require('../router/user.router');
const errorHandler = require('./error-handle');

const app = new Koa();

app.use(koaBody());

app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

app.on('error', errorHandler);

module.exports = app;