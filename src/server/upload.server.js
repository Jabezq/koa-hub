const pool = require('../app/database');

class UploadServer {
  async upload(info, user_id) {
    const {
      newFilename,
      mimetype,
      size
    } = info;

    const statement = `
      INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (? ,? ,? ,?);
    `;

    const [result] = await pool.execute(statement, [newFilename, mimetype, size, user_id]);

    return result;
  }

  async fetch(image_id) {
    const statement = `
      SELECT * FROM avatar WHERE id = ?;
    `;

    const [result] = await pool.execute(statement, [image_id]);

    return result[0];
  }
}

module.exports = new UploadServer();
