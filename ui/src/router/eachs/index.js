/*
 * @Author: xr
 * @Date: 2021-03-22 15:32:01
 * @LastEditors: xr
 * @LastEditTime: 2021-03-22 15:35:32
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\eachs\index.js
 */
const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    if (key == './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default modules;