/*
 * @Author: xr
 * @Date: 2021-04-10 21:48:08
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:20:56
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\apis\private\admin.js
 */
const express = require('express');
const router = express.Router();
const { getAdminPage, deleteAdmin, updateAdmin, addAdmin } = require('../../services/admin');
const { getPower, addPower, delPower } = require('../../services/power');
const config = require('../../config')
const adminAuth = require('../../auth/adminAuth')
const md5 = require('md5-node');

//管理员分页
router.get('/page', adminAuth, function (req, res, next) {
    const { p = 1, ps = 10, username = '', sort = 'id desc' } = req.query;
    getAdminPage({ p: +p, ps: +ps, username, sort }).then((data) => {
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

//删除管理员
router.post('/delete', adminAuth, function (req, res, next) {
    const id = Number(req.query.id);
    if (id === config.superadmin) {
        res.send({
            code: -1,
            msg: '超级管理员不可删除'
        });
    } else {
        deleteAdmin(id).then(() => {
            res.send({
                code: 0
            });
        })
    }
})

//修改管理员信息
router.post('/update', adminAuth, function (req, res, next) {
    const { id, username, avatar } = req.body;
    updateAdmin(+id, username, avatar).then(() => {
        res.send({
            code: 0
        })
    })
})

//新增管理员
router.post('/add', adminAuth, function (req, res, next) {
    const { username, password, avatar } = req.body;
    addAdmin(username, md5(password), avatar).then(() => {
        res.send({
            code: 0
        })
    })
})

//获取权限
router.get('/power', adminAuth, async function (req, res, next) {
    const { adminid = 0 } = req.query;
    getPower(adminid).then((data) => {
        res.send({
            code: 0,
            data: data,
            msg: ''
        })
    })
})

//更新权限
router.post('/power', adminAuth, async function (req, res, next) {
    const { adminid = 0, rids = '' } = req.body;

    //删除之前的权限，
    await delPower(adminid);

    //增加新的权限
    rids.split(',').forEach(async (rid) => {
        await addPower(adminid, rid);
    });

    res.send({
        code: 0,
        msg: ''
    })
})

module.exports = router;