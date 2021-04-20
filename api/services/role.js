/*
 * @Author: xr
 * @Date: 2021-04-09 23:10:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 10:43:37
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\services\role.js
 */
const Sequelize = require('sequelize');
const connection = require('./connection')

const roleTable = connection.define('role', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    remark: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    apis: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    menus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
});


const getRoleAll = () => {
    return new Promise((resolve, reject) => {
        roleTable.findAll().then((res) => {
            resolve(res);
        });
    })
}

const getRolePage = ({
    p = 1, ps = 10, name = '', id = '', sort = 'id desc'
}) => {
    return new Promise((resolve, reject) => {
        let sorts = sort.replace(/\s{1,}/g, ' ').replace(/^\s|\s$/g, '').split(' ');
        let where = {};
        if (name) {
            where['name'] = { [Sequelize.Op.like]: '%' + name + '%' };
        }
        if (id) {
            where['id'] = { [Sequelize.Op.in]: (id + '').split(',').map(c => +c) };
        }
        roleTable.findAndCountAll({
            order: [sorts],
            limit: Number(ps),
            offset: (p - 1) * ps,
            where: where
        }).then((res) => {
            resolve(res);
        });
    })
}

const delRole = (id = 0) => {
    return new Promise((resolve, reject) => {
        roleTable.destroy({
            where: {
                id: id
            }
        }).then((res) => {
            resolve(res);
        });
    })
}

const updateRole = (id = 0, name = '', remark = '', apis = '', menus = '') => {
    return new Promise((resolve, reject) => {

        roleTable.update({
            name: name,
            remark: remark,
            apis: apis,
            menus: menus,
        }, {
            where: {
                id: id
            }
        }).then((res) => {
            resolve(res);
        });
    })
}

const addRole = (name = '', remark = '', apis = '', menus = '') => {
    return new Promise((resolve, reject) => {
        roleTable.create({
            name: name,
            remark: remark,
            apis: apis,
            menus: menus
        }).then((res) => {
            resolve(res);
        });
    })
}



module.exports = {
    roleTable,
    getRoleAll, getRolePage, delRole, updateRole, addRole
};