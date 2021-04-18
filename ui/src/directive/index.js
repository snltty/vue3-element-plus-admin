/*
 * @Author: xr
 * @Date: 2021-04-02 17:45:24
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:05:50
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\directive\index.js
 */
const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    if (key == './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default (app) => {
    for (let j in modules) {
        modules[j](app);
    }
};

