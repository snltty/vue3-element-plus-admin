/*
 * @Author: xr
 * @Date: 2021-04-09 22:40:49
 * @LastEditors: xr
 * @LastEditTime: 2021-04-10 10:14:19
 * @version: v1.0.0
 * @Descripttion: token 生成
 * @FilePath: \api\auth\token.js
 */
const md5 = require('md5-node');

const encodeToken = function (id) {
    return new Promise((resolve, reject) => {
        resolve(md5(`${id}_${Date.now()}`))
    })
}
module.exports = {
    encodeToken
};