/*
 * @Author: xr
 * @Date: 2021-03-21 22:02:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 14:49:43
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\apis\login.js
 */
import config from '../configs/index'
import Request from '../libs/request/index'
import store from '../store/index'
const request = new Request({ timeout: 5000, baseURL: config.baseUrl });

request.instance.interceptors.request.use(config => {
    config.headers["Authorization"] = store.state.login.token;
    return config;
}, (err) => {
    return Promise.reject(err);
});