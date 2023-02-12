const pool = require('../app/database');

class AuthServer {
  async getByUsername(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`;

    const result = await pool.execute(statement, [username]);

    return result[0];
  }
}

module.exports = new AuthServer();