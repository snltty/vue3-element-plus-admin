/*
 * @Author: xr
 * @Date: 2021-04-09 22:23:18
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 14:55:45
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\index.js
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//获取数据中间件 使得可以使用 body数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//允许跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//后端管理接口模块
const private = require('./apis/private/index')
app.use('/private', private);

//上传的图片显示
app.use('/uploads', express.static(__dirname + '/uploads'));

// 请求不存在的地址时 返回 404信息
app.use(function (req, res) {
    res.status(404).send({ code: 404, msg: '404' });
});

const server = app.listen(3000, '0.0.0.0', function (req, res, next) {
    console.log(`\n服务已运行 http://${server.address().address}:${server.address().port}`);
});