/*
 * @Author: xr
 * @Date: 2021-03-20 12:53:09
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:03:37
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\libs\request\index.js
 */
import axios from 'axios'
import router from '../../router/index'
import store from '../../store/index'
import config from '../../configs/index'
axios.defaults.adapter = require('axios/lib/adapters/http');

export default class Request {
    instance = null
    constructor({
        timeout = 15000, baseURL = '', withCredentials = false
    }) {
        this.instance = axios.create({
            baseURL: baseURL,
            timeout: timeout
        })
        this.instance.defaults.withCredentials = withCredentials;

        this.instance.interceptors.response.use(res => {
            return res;
        }, err => {
            if (err.response) {
                if (err.response.status == 401 || err.response.status == 403) {
                    store.dispatch('login/logout');
                    router.push({ name: config.loginName });
                }
            }
            return Promise.reject(err);
        });
    }
    get ({ url = '', params = {} }) {
        return this.instance.get(url, { params: params });
    }
    post ({ url = '', data = {}, params = {} }) {
        return this.instance.post(this._parseParams(url, params), data);
    }
    _parseParams (url, params) {
        let [path, query] = url.split('?');
        let _params = [];
        for (let j in params) {
            _params.push(`${j}=${params[j]}`);
        }
        if (query) {
            _params.push(query);
        }
        return `${path}?${_params.join('&')}`;
    }
}