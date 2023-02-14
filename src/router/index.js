const fs = require('fs');

const autoRequireRouter = (app) => {
  try {
    const files = fs.readdirSync(__dirname);
    files.forEach(item => {
      if (item == 'index.js') return;
  
      const router = require(`./${item}`);
  
      app.use(router.routes())
          .use(router.allowedMethods());
    })
  } catch {
    console.log('Failed to read the router directory.');
  }
}

module.exports = autoRequireRouter;
