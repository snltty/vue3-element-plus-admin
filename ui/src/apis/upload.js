/*
 * @Author: xr
 * @Date: 2021-04-19 16:56:46
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 16:56:59
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\apis\upload.js
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

export const upload = (file) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        request.upload({
            url: '/upload/upload', data: formData
        }).then((res) => {
            resolve({
                data: res.data,
                res
            });
        }).catch((e) => {
            reject(e);
        });
    })
}