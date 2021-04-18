/*
 * @Author: xr
 * @Date: 2021-03-26 14:58:06
 * @LastEditors: xr
 * @LastEditTime: 2021-04-08 17:10:48
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\extends\index.js
 */
const files = require.context('.', false, /\.js$/);
files.keys().forEach(key => {
    if (key == './index.js') return;
    files(key).default;
});