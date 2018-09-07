/**
 * 用户信息表
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|{}}
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false, //非空
        primaryKey: true, //主键
        comment: '账号'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '昵称'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '手机号'
      },
      sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '性别'
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        allowNull: false,
        comment: '角色'
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否删除'
      }
    },
    {
      underscored: true, //额外字段以下划线来分割
      // createdAt: "created_at",
      // updatedAt: "updated_at",
      timestamps: false, //取消默认生成的createdAt、updatedAt字段
      freezeTableName: true, // Model 对应的表名将与model名相同
      //静态方法，即user模型自带的方法
      classMethods: classMethods,
      comment: '用户信息类'
      // paranoid: true      //虚拟删除
      //实例方法
      // instanceMethods: instanceMethods
    }
  )
}

//静态方法
const classMethods = {
  //根据id查询
  getUserById: function(id) {
    return this.findById(id)
  },
  //获取所有
  getUsers: function(options) {
    return this.findAll(options)
  },
  //根据id更新数据
  updateUserById: function(values, id) {
    return this.update(values, {
      where: {
        id: id
      }
    })
  },
  //根据id删除数据
  deleteById: function(id) {
    return this.destroy({
      where: {
        id: id
      }
    })
  }
}
