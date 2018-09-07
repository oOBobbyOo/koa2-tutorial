const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const { sequelize, Sequelize } = require('./tools/sequelize')
const formatDate = require('../utils/formatDate') //日期处理
const tableName = 'tmp_mota_yt_email' // 数据库表名

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true
    }
  },
  {
    freezeTableName: true, // Model 对应的表名将与model名相同
    tableName: tableName,
    timestamps: false
  }
)

User.findAll({
  where: {
    status: '-4'
  },
  attributes: ['id', 'email', 'timestamp', 'status']
}).then(result => {
  // console.log(result)

  const arr = []
  for (let i = 0, len = result.length; i < len; i++) {
    result[i].dataValues['timestamp'] = formatDate(
      result[i].dataValues['timestamp']
    )
    arr.push(result[i].dataValues)
  }

  const datas = arr.map(item => Object.values(item))
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
