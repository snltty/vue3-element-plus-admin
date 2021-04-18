/*
 * @Author: xr
 * @Date: 2021-03-20 12:07:24
 * @LastEditors: xr
 * @LastEditTime: 2021-03-20 12:19:17
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\store\modules\index.js
 */

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    if (key == './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default modules;
