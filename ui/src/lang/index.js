/*
 * @Author: xr
 * @Date: 2021-03-26 14:58:06
 * @LastEditors: xr
 * @LastEditTime: 2021-03-26 15:04:03
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\lang\index.js
 */
const files = require.context('.', false, /\.js$/);
const modules = {};
files.keys().forEach(key => {
    if (key == './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});
export default modules;
