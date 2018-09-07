const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const Objectid = MongoDB.Objectid
const config = require('../config/mongodb')

class Db {
  static getInstance() {
    //单例 解决多次实例化实例不共享的问题
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {
    this.dbClient = '' //存储client对象
    this.connect()
  }

  // 连接mongosb
  connect() {
    let _that = this
    return new Promise((resolve, reject) => {
      // 解决多次数据库连接的问题
      if (!_that.dbClient) {
        MongoClient.connect(
          config.dbUrl,
          (err, client) => {
            if (err) {
              reject(err)
              return
            } else {
              console.log('Connected successfully to server')
              _that.dbClient = client.db(config.dbName)
              resolve(_that.dbClient)
            }
          }
        )
      } else {
        resolve(_that.dbClient)
      }
    })
  }

  // 查询
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).find(json)
        result.toArray((err, data) => {
          if (err) {
            reject(err)
            return
          }
          resolve(data)
        })
      })
    })
  }

  // 更新
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(
          json1,
          { $set: json2 },
          (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          }
        )
      })
    })
  }

  // 插入
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insert(json, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
    })
  }

  // 移除
  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
    })
  }

  getObjectId(id) {
    return new Objectid(id)
  }
}

module.exports = Db.getInstance()
