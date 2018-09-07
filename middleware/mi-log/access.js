/**
 * 记录用户端信息函数
 * @param {any} ctx  全局上下文参数
 * @param {string} message  log 打印信息
 * @param {Object} commonInfo  log 打印公共信息
 * @returns
 */

module.exports = (ctx, message, commonInfo) => {
  const {
    method, // 请求方法 get post或其他
    url, // 请求链接
    host, // 发送请求的客户端的host
    headers // 请求中的headers
  } = ctx.request
  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'], // 请求的源地址
    userAgent: headers['user-agent'] // 客户端信息 设备及浏览器信息
  }
  return JSON.stringify(Object.assign(commonInfo, client))
}
