/*
 * @Author: xr
 * @Date: 2021-03-23 19:21:14
 * @LastEditors: xr
 * @LastEditTime: 2021-03-23 19:27:30
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\layout\gloal\index.js
 */
const files = require.context('.', false, /\.vue$/);
export default {
    install: (app) => {
        files.keys().forEach(key => {
            app.component(key.replace(/(\.\/|\.vue)/g, ''), files(key).default);
        });
    }
}