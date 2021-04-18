/*
 * @Author: xr
 * @Date: 2021-04-09 23:10:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 14:53:36
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\services\admin.js
 */
const Sequelize = require('sequelize');
const connection = require('./connection')

const adminTable = connection.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
});

const getAdminApis = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select 
            role.apis
              from power left join role on role.id=power.roleid left join admin on admin.id=power.adminid  where admin.id= :id`, {
            replacements: { id: id }, type: connection.QueryTypes.SELECT
        }).then((data) => {
            resolve(Array.from(new Set(data.map(c => c.apis).join(',').split(','))));
        })
    })
}

const getAdminByUsername = (username) => {
    return new Promise((resolve, reject) => {
        adminTable.findOne({
            where: {
                username: { [Sequelize.Op.eq]: username }
            }
        }).then((data) => {
            resolve(data)
        })
    })
}

const getAdminPage = ({
    p = 1, ps = 10, username = '', sort = 'id desc'
}) => {
    return new Promise((resolve, reject) => {
        let sorts = sort.replace(/\s{1,}/g, ' ').replace(/^\s|\s$/g, '').split(' ');
        let where = {};
        if (username) {
            where['username'] = { [Sequelize.Op.like]: '%' + username + '%' };
        }
        adminTable.findAndCountAll({
            order: [sorts],
            limit: Number(ps),
            offset: (p - 1) * ps,
            where: where
        }).then((res) => {
            resolve(res);
        });
    })
}

const deleteAdmin = (id = 0) => {
    return new Promise((resolve, reject) => {
        adminTable.destroy({
            where: {
                id: id
            }
        }).then((res) => {
            resolve(res);
        });
    })
}

const updateAdmin = (id = 0, username = '') => {
    return new Promise((resolve, reject) => {

        adminTable.update({
            username: username
        }, {
            where: {
                id: id
            }
        }).then((res) => {
            resolve(res);
        });
    })
}

const addAdmin = (username = '', password = '') => {
    return new Promise((resolve, reject) => {
        adminTable.create({
            username: username,
            password: password
        }).then((res) => {
            resolve(res);
        });
    })
}


module.exports = {
    adminTable,
    getAdminByUsername,
    getAdminApis,
    getAdminPage,
    deleteAdmin,
    updateAdmin,
    addAdmin
};