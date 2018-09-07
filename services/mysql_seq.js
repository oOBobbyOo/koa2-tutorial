const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const { sequelize } = require('./tools/sequelize')
const formatDate = require('../utils/formatDate') //日期处理
const tableName = 'tmp_mota_yt_email' // 数据库表名

sequelize
  .query(`SELECT * FROM ${tableName} WHERE status = :status`, {
    raw: true,
    replacements: { status: '-4' }
  })
  .then(rows => {
    // console.log(rows)

    // 转二维数组
    const datas = rows[0].map(function(item) {
      item['timestamp'] = formatDate(item['timestamp'])

      var arr = Object.keys(item)
      return arr.map(function(prop) {
        return item[prop]
      })
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
  .catch(err => {
    console.log(err)
  })
