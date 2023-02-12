const Router = require('koa-router');

const {
  register
} = require('../controller/user.controller');

const {
  verifyUser,
  md5Password
} = require('../middleware/user.middleware');

const userRouter = new Router({
  prefix: '/user'
});

userRouter.post('/', verifyUser, md5Password, register);

module.exports = userRouter;