const Router = require('koa-router');

const {
  register
} = require('../controller/user.controller');

const {
  verifyUser
} = require('../middleware/user.middleware');

const userRouter = new Router({
  prefix: '/user'
});

userRouter.post('/', verifyUser, register);

module.exports = userRouter;