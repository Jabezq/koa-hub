const pool = require('../app/database');

class UserServer {
  async register(info) {
    const { username, password } = info;

    const statement = `INSERT INTO users (username, password) VALUES (? , ?);`;

    const result = await pool.execute(statement, [username, password]);

    return result[0];
  }

  async queryByUsername(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`;

    const result = await pool.execute(statement, [username]);

    return result[0];
  }
}

module.exports = new UserServer();