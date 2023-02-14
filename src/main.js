const app = require('./app/index');
const { APP_PORT } = require('./app/config');

app.listen(APP_PORT, () => {
  console.log(`Service started. Port ${APP_PORT} is listening...`);
})