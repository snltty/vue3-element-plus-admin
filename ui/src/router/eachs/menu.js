/*
 * @Author: xr
 * @Date: 2021-03-22 15:32:36
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 16:33:50
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\eachs\menu.js
 */
import store from '../../store/index'
import config from '../../configs/index'

const getAllMenuName = (options) => {
    let res = [];
    for (let i = 0; i < options.length; i++) {
        res.push(options[i].name);
        res = res.concat(getAllMenuName(options[i].children || []));
    }
    return res;
}

const each = (to, from, next, router) => {
    if (store.state.menu.inited === false && to.name != config.loginName) {
        console.time('菜单初始化时间');
        if (config.menuAuth === false || store.state.login.loginInfo.user.superadmin === true) {
            let menus = getAllMenuName(router.options.routes);
            if (store.state.login.loginInfo.user.superadmin === true) {
                menus.push('superadmin')
            }
            store.dispatch('menu/changeAuthMenus', menus);
        } else {
            store.dispatch('menu/changeAuthMenus', store.state.login.loginInfo.user.menus);
        }
        console.timeEnd('菜单初始化时间');
    }
    //首页   登录页 或者 有权限的页面 验证通过， 否则跳转到首页
    if (to.name == config.homeName || to.name == config.loginName || store.state.menu.authMenus.indexOf(to.name) >= 0) {
        return true;
    }
    next({ name: config.homeName });
    return false;
}
export default {
    each
}