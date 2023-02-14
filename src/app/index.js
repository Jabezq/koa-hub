const Koa = require('koa');
const { koaBody } = require('koa-body');

const autoRequireRouter = require('../router/index');
const errorHandler = require('./error-handle');

const app = new Koa();

app.use(koaBody());

// 动态挂载路由
autoRequireRouter(app);

app.on('error', errorHandler);

module.exports = app;