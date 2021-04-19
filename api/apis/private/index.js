/*
 * @Author: xr
 * @Date: 2021-04-09 22:26:44
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 10:29:32
 * @version: v1.0.0
 * @Descripttion: 后端接口
 * @FilePath: \api\apis\private\index.js
 */
const express = require('express');
const router = express.Router();
const { getAdminLoginCache } = require('../../auth/cache');

//全局解析一下token数据 以便于下面的路由直接使用数据
router.use(function (req, res, next) {
    const token = req.headers['authorization'];
    const cache = getAdminLoginCache((token || '-1').replace('Bearer ', ''));
    req.admin = { ...cache };
    return next();
})

const login = require('./login.js');
router.use('/login', login);

const admin = require('./admin');
router.use('/admin', admin);

const role = require('./role');
router.use('/role', role);

const upload = require('./upload');
router.use('/upload', upload);

module.exports = router;