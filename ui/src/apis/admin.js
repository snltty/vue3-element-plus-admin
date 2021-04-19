/*
 * @Author: xr
 * @Date: 2021-03-21 22:02:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 17:15:52
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\apis\admin.js
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

export const getAdmins = ({ p = 1, ps = 10, username = '', sort = 'id desc' }) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'admin/page', params: {
                p, ps, username, sort
            }
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const addAdmin = (data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'admin/add', data: data
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const updateAdmin = (data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'admin/update', data: data
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const deleteAdmin = (id) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'admin/delete', params: { id }
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}