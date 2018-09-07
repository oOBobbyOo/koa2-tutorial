const mysql = require('mysql')
const db = require('../config/mysql')

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
  connectionLimit: 10 // 最大连接数，默认为10
})

//数据库基本操作方法
const query = function(sql, params, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('数据库链接失败')
      callback(err, null, null)
    } else {
      connection.query(sql, params, function(err, results, fields) {
        if (err) {
          console.log('数据操作失败')
          callback(err, null, null)
        }
        //释放连接
        connection.release()
        //事件驱动回调
        callback && callback(err, results, fields)
      })
    }
  })
}

module.exports = query
