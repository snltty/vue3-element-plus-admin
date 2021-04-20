/*
 * @Author: xr
 * @Date: 2021-03-21 22:02:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 15:48:34
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

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'login/login', data: { username, password }
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const loginInfo = () => {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'login/info'
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}