/*
 * @Author: xr
 * @Date: 2021-04-09 23:11:35
 * @LastEditors: xr
 * @LastEditTime: 2021-04-10 10:21:37
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\services\connection.js
 */
const Sequelize = require("sequelize");
const config = require('../config')
const sequelize = new Sequelize(config.database.db, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: "mysql",
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
module.exports = sequelize;