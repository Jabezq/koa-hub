const crypto = require('crypto');

// md5加密
const cryptoPassword = (password) => {
  const hash = crypto.createHash('md5')
                      .update(password)
                      .digest('hex');

  return hash;
}

module.exports = cryptoPassword;