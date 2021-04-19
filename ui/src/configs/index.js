/*
 * @Author: xr
 * @Date: 2021-03-23 21:53:58
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 10:30:58
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\configs\index.js
 */
const packageJson = require('../../package.json');
export default {
    "siteName": packageJson.desc
    , "login": true //是否验证登录 process.env.NODE_ENV !== 'development'
    , "menuAuth": true //是否验证菜单  不验证就全部菜单可见

    , "homeName": 'Home' //首页
    , "loginName": "Login" //登录页面

    , "staticUrl": "http://localhost:3000/"  //静态资源地址   没有静态资源服务器就是api服务器
    , "baseUrl": "http://localhost:3000/private" //接口地址
}