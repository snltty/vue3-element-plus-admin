/*
 * @Author: xr
 * @Date: 2021-04-09 23:10:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-11 13:02:55
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\services\power.js
 */
const Sequelize = require('sequelize');
const connection = require('./connection')

const powerTable = connection.define('power', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    adminid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: ''
    },
    roleid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: ''
    }
});

const getPower = (adminid) => {
    return new Promise((resolve, reject) => {
        powerTable.findAll({
            where: {
                adminid: +adminid
            }
        }).then((res) => {
            resolve(res);
        });
    })
}


const addPower = (adminid, roleid) => {
    return new Promise((resolve, reject) => {
        powerTable.create({
            adminid: +adminid,
            roleid: +roleid
        }).then((res) => {
            resolve(res);
        });
    })
}


const delPower = (adminid) => {
    return new Promise((resolve, reject) => {
        powerTable.destroy({
            where: {
                adminid: +adminid
            }
        }).then((res) => {
            resolve(res);
        });
    })
}


module.exports = {
    powerTable, getPower, addPower, delPower
};