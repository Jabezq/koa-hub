const Router = require('koa-router');

const uploadRouter = new Router({
  prefix: '/upload'
})

const {
  upload,
  fetch
} = require('../controller/upload.controller');

const {
  verifyAuth
} = require('../middleware/auth.middleware');

uploadRouter.post('/', verifyAuth, upload);
uploadRouter.get('/:imageId', fetch);

module.exports = uploadRouter;
