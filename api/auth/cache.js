/*
 * @Author: xr
 * @Date: 2021-04-10 01:02:04
 * @LastEditors: xr
 * @LastEditTime: 2021-04-11 19:32:14
 * @version: v1.0.0
 * @Descripttion: 登录信息缓存 登录成功后 保存一些信息到内存中，方便在请求接口时拿出来使用
 * @FilePath: \api\auth\cache.js
 */
const NodeCache = require("node-cache");
const myCache = new NodeCache();

//设置登录缓存  
const setLoginCache = (token, data) => {
    myCache.set(token, data, 24 * 60 * 60);
}

//获取后台登录缓存
const getAdminLoginCache = (token) => {
    let cache = myCache.get(token);
    if (cache) {
        myCache.ttl(token, 24 * 60 * 60)
    }
    return cache || { id: 0, superadmin: false, username: '', apis: [] };
}

//获取前端登录缓存
const getUserLoginCache = (token) => {
    let cache = myCache.get(token);
    if (cache) {
        myCache.ttl(token, 24 * 60 * 60)
    }
    return cache || { id: 0, username: '' };
}

module.exports = {
    setLoginCache, getAdminLoginCache, getUserLoginCache
}