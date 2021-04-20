/*
 * @Author: xr
 * @Date: 2021-03-21 22:02:17
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 10:54:07
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\apis\role.js
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

export const getRoles = ({ p = 1, ps = 10, name = '', id = '', sort = 'id desc' }) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'role/page', params: {
                p, ps, name, id, sort
            }
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const addRole = (data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'role/add', data: data
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const updateRole = (data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'role/update', data: data
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}

export const deleteRole = (id) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'role/delete', params: { id }
        }).then((res) => {
            resolve({
                data: res.data
                , res
            });
        })
    })
}