const pool = require('../app/database');

class MomentServer {
  async createMoment(user_id, content) {
    const statement = `INSERT INTO moment (user_id, content) values (?, ?);`;

    const [result] = await pool.execute(statement, [user_id, content])

    return result;
  }
}

module.exports = new MomentServer();