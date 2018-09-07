const path = require('path')
const fs = require('fs')
const mysql = require('mysql')
const xlsx = require('node-xlsx')
const db = require('./config/mysql')
const formatDate = require('../utils/formatDate') //日期处理
const tableName = 'tmp_mota_yt_email' // 数据库表名

const connection = mysql.createConnection(db)

// 与数据库建立连接
connection.connect(err => {
  if (err) {
    // 连接失败时的错误处理
    console.log(err)
    return
  }
})

// 查询数据库
connection.query(`SELECT * FROM ${tableName} WHERE status="-4"`, function(
  error,
  results
) {
  if (error) throw error
  // console.log(results)

  let datas = []
  results.forEach(row => {
    row['timestamp'] = formatDate(row['timestamp'])
    let newdata = []
    for (let key in row) {
      // console.log(key)
      newdata.push(row[key])
    }
    datas.push(newdata)
  })

  // console.log(datas)

  const buffer = xlsx.build([{ name: tableName, data: datas }])

  fs.writeFile(
    path.resolve(__dirname, `../xlsx/${tableName}.xlsx`),
    buffer,
    'binary',
    error => {
      if (error) throw error
      console.log('writeFile success')
    }
  )
})

// 关闭连接
connection.end()
