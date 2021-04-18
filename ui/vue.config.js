/*
 * @Author: xr
 * @Date: 2021-03-20 13:35:54
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:14:27
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\vue.config.js
 */
const package = require('./package.json');
module.exports = {
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = package.desc;
                return args
            })
    }
}