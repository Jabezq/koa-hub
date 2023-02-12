const app = require('./app/index');
const { APP_PORT } = require('./app/config');

app.listen(APP_PORT, () => {
  console.log(`服务已启动，${APP_PORT}端口监听中...`);
})