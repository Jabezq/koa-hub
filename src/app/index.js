const Koa = require('koa');
const { koaBody } = require('koa-body');

const autoRequireRouter = require('../router/index');
const errorHandler = require('./error-handle');

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    // 指定文件上传的保存目录
    uploadDir: './uploads',
    // 保留文件的扩展名
    keepExtensions: true,
  }
}));

// 动态挂载路由
autoRequireRouter(app);

app.on('error', errorHandler);

module.exports = app;