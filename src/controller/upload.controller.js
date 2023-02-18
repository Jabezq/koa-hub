const fs = require('fs');

const uploadServer = require('../server/upload.server');

class UploadController {
  async upload(ctx, next) {
    const user_id = ctx.user.id;
    const info = ctx.request.files.image;

    const result = await uploadServer.upload(info, user_id);

    ctx.body = result;
  }

  async fetch(ctx, next) {
    const image_id = ctx.params.imageId;

    const imageInfo = await uploadServer.fetch(image_id);

    ctx.response.set('content-type', imageInfo.mimetype);
    ctx.body = fs.createReadStream(`./uploads/${imageInfo.filename}`);
  }
}

module.exports = new UploadController();
