/*
 * @Author: xr
 * @Date: 2021-03-23 21:28:03
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 16:12:11
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\eachs\login.js
 */
import store from '../../store/index'
import config from '../../configs/index'
import { loginInfo } from '../../apis/login'

const getLoginInfo = () => {
    return new Promise((resolve, reject) => {
        if (!store.state.login.loginInfo.inited) {
            loginInfo().then(({ data, res }) => {
                store.dispatch('login/setLoginInfo', {
                    user: data.data
                });
                resolve(data.data);
            })
        } else {
            resolve(store.state.login.loginInfo.user);
        }
    })
}

const each = (to, from, next) => {
    //不需要登录验证  或者 是登录页  就跳转  否则没登录就跳转到登录页
    if (config.login === false || config.loginName == to.name) {
        return next();
    } else {
        getLoginInfo().then((user) => {
            //没登录
            if (user.id <= 0) {
                next({ name: config.loginName });
            } else {
                next();
            }
        });
    }
}
export default {
    each
}