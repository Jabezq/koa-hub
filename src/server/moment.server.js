const pool = require('../app/database');

class MomentServer {
  async createMoment(user_id, content) {
    const statement = `INSERT INTO moment (user_id, content) values (?, ?);`;

    const [result] = await pool.execute(statement, [user_id, content])

    return result;
  }

  async getMomentDetail(moment_id) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.username) author 
      FROM 
        moment m 
      LEFT JOIN 
        user u 
      ON 
        m.user_id = u.id
      WHERE
        m.id = ?;
    `;

    const [result] = await pool.execute(statement, [moment_id]);

    return result[0];
  }

  async getMomentList(pageNo, pageSize) {
    var pageNo = String((pageNo - 1) * pageSize);

    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.username) author 
      FROM 
        moment m 
      LEFT JOIN 
        user u 
      ON 
        m.user_id = u.id 
      LIMIT 
        ?, ?;
    `;
    
    // LIMIT的分页占位符必须是字符串类型
    const [result] = await pool.execute(statement, [pageNo, pageSize]);

    return result;
  }

  async updateMoment(moment_id, content) {
    const statement = `
      UPDATE 
        moment 
      SET 
        content = ? 
      WHERE 
        id = ?;
    `;

    const [result] = await pool.execute(statement, [content, moment_id]);

    return result;
  }

  async removeMoment(moment_id) {
    const statement = `
      DELETE FROM moment WHERE id = ?;
    `;

    const result = await pool.execute(statement, [moment_id]);

    return result;
  }
}

module.exports = new MomentServer();