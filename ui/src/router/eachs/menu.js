/*
 * @Author: xr
 * @Date: 2021-03-22 15:32:36
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 16:13:11
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\router\eachs\menu.js
 */
import store from '../../store/index'
import config from '../../configs/index'
import router from '../../router/index'

const getAllMenuName = (options) => {
    let res = [];
    for (let i = 0; i < options.length; i++) {
        res.push(options[i].name);
        res = res.concat(getAllMenuName(options[i].children || []));
    }
    return res;
}

const each = (to, from, next) => {
    const menu = store.state.menu;
    const user = store.state.login.loginInfo.user;

    if (menu.inited === false && to.name != config.loginName) {
        console.time('菜单初始化时间');
        if (config.menuAuth === false || user.superadmin === true) {
            let menus = getAllMenuName(router.options.routes);
            if (user.superadmin === true) {
                menus.push('superadmin')
            }
            store.dispatch('menu/changeAuthMenus', menus);
        } else {
            store.dispatch('menu/changeAuthMenus', user.menus);
        }
        console.timeEnd('菜单初始化时间');
    }
    //首页   登录页 或者 有权限的页面 验证通过， 否则跳转到首页
    if (to.name == config.homeName || to.name == config.loginName || menu.authMenus.indexOf(to.name) >= 0) {
        return next();
    }
    return next({ name: config.homeName });
}
export default {
    each
}