/*
 * @Author: xr
 * @Date: 2021-03-23 21:28:03
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 11:24:06
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\eachs\login.js
 */
import store from '../../store/index'
import config from '../../configs/index'

const updateLoginInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({
            user: {
                id: 1,
                username: 'test',
                avatar: '',
                admin: true,
                superadmin: true,
                menus: [],
                roles: []
            }
        })
        // getLoginInfo().then(({ data, res }) => {
        //     resolve(data);
        // }).catch(reject);
    });
}

const each = (to, from, next, router) => {
    //不需要登录验证  或者 是登录页  就跳转  否则没登录就跳转到登录页
    if (config.login === false || config.loginName == to.name) {
        return true;
    } else {
        //没登录
        if (store.state.login.loginInfo.user.id <= 0) {
            updateLoginInfo().then((data) => {
                if (data.user.id > 0 && data.user.admin === true) {
                    store.dispatch('login/setLoginInfo', data);
                    next({ name: config.homeName });
                } else {
                    next({ name: config.loginName });
                }
            }).catch((err) => {
                next({ name: config.loginName });
            });
            return false;
        }
    }
    return true;
}
export default {
    each
}