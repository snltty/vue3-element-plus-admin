/*
 * @Author: xr
 * @Date: 2021-04-10 21:48:08
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 10:42:20
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\apis\private\role.js
 */
const express = require('express');
const router = express.Router();
const { getRoleAll, getRolePage, delRole, updateRole, addRole } = require('../../services/role');
const adminAuth = require('../../auth/adminAuth')

//所有
router.get('/all', adminAuth, function (req, res, next) {
    getRoleAll().then((data) => {
        res.send({
            code: 0,
            data: data,
            msg: ''
        });
    }).catch(() => {
        res.send({
            code: -1,
            data: [],
            msg: '获取失败'
        });
    })
});
//分页
router.get('/page', adminAuth, function (req, res, next) {
    const { p = 1, ps = 10, id = '', name = '', sort = 'id desc' } = req.query;
    getRolePage({ p: +p, ps: +ps, id, name, sort }).then((data) => {
        res.send({
            code: 0,
            data: {
                p: +p, ps: +ps,
                ...data
            },
            msg: ''
        });
    })
});

//删除
router.post('/del', adminAuth, function (req, res, next) {
    delRole(Number(req.query.id || 0)).then(() => {
        res.send({
            code: 0
        });
    })
})

//修改
router.post('/update', adminAuth, function (req, res, next) {
    const { id = 0, name = '', remark = '', apis = '', menus = '' } = req.body;
    updateRole(+id, name, remark, apis, menus).then(() => {
        res.send({
            code: 0
        })
    })
})

//新增
router.post('/add', adminAuth, function (req, res, next) {
    const { name = '', remark = '', apis = '', menus = '' } = req.body;
    addRole(name, remark, apis, menus).then(() => {
        res.send({
            code: 0
        })
    })
})


module.exports = router;