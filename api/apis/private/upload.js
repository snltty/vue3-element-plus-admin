/*
 * @Author: xr
 * @Date: 2021-04-10 21:48:08
 * @LastEditors: xr
 * @LastEditTime: 2021-04-11 15:05:28
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \api\apis\private\upload.js
 */
const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/adminAuth')
const formidable = require('formidable');
const fs = require('fs');

router.post('/upload', adminAuth, function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './uploads/';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
    }
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.send({
                code: -1,
                msg: err
            });
        }
        res.send({
            code: 0,
            data: files.file.path.replace(/\\/g, '/')
        })
    });
});


module.exports = router;