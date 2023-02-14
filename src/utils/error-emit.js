/**
 * 错误事件
 * @param {string} errorMessage 错误信息
 * @param {*} ctx 
 */
const emitError = (errorMessage, ctx) => {
  const error = new Error(errorMessage);

  return ctx.app.emit('error', error, ctx);
}

module.exports = emitError;