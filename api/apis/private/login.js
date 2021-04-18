/*
 * @Author: xr
 * @Date: 2021-04-09 22:31:38
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 14:55:35
 * @version: v1.0.0
 * @Descripttion: 后端登录相关接口
 * @FilePath: \api\apis\private\login.js
 */
const express = require('express');
const router = express.Router();
const md5 = require('md5-node');
const { getAdminByUsername, getAdminApis } = require('../../services/admin');
const { encodeToken } = require('../../auth/token')
const { setLoginCache } = require('../../auth/cache')
const adminAuth = require('../../auth/adminAuth')
const config = require('../../config')

//后台管理登录
router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    if (!username) return res.send({ code: -1, msg: '请输入username' });
    if (!password) return res.send({ code: -1, msg: '请输入password' });
    next();
}, function (req, res, next) {
    const { username, password } = req.body;
    //根据管理员名查到管理员信息
    getAdminByUsername(username).then((admin) => {
        //查到了管理员。并且密码一致，登录成功
        if (admin && md5(password) == admin.password) {
            //要返回哪些管理员信息
            const adminInfo = {
                username: admin.username,
                id: admin.id,
                //超级管理员
                superadmin: config.superadmin === admin.id
            };
            //生成一下token
            encodeToken(adminInfo.id).then((token) => {
                //获取到 api权限列表
                getAdminApis(adminInfo.id).then((apis) => {
                    //保存一些数据到缓存
                    setLoginCache(token, { ...adminInfo, apis });
                    res.send({
                        code: 0, data: {
                            admin: adminInfo,
                            token: token,
                            apis
                        }, msg: ''
                    });
                });
            })
        } else {
            //没查到用户，或者密码不一致，登录失败
            res.send({
                code: -1, msg: '登录失败'
            });
        }
    })
});

module.exports = router;