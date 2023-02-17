const pool = require('../app/database');

class AuthServer {
  async getPermission(id, moment_id) {
    const statement = `
      SELECT 
        * 
      FROM 
        moment 
      WHERE 
        id = ? 
      AND 
        user_id = ?;
    `;

    const [result] = await pool.execute(statement, [moment_id, id]);

    return result.length ? true : false;
  }
}

module.exports = new AuthServer();