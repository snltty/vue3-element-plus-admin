/*
 * @Author: xr
 * @Date: 2021-03-20 12:43:07
 * @LastEditors: xr
 * @LastEditTime: 2021-04-20 15:46:11
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\store\modules\login.js
 */
console.time('login-store初始化时间')

const defaultLoginInfo = JSON.parse(JSON.stringify({
    user: {
        id: 0,
        username: '',
        avatar: '',
        admin: false,
        superadmin: false,
        menus: []
    }
}));

const state = {
    loginInfo: JSON.parse(JSON.stringify(defaultLoginInfo)),
    token: sessionStorage.getItem('token') || '',
    inited: false
}

console.timeEnd('login-store初始化时间')

const getters = {

}
const mutations = {
    setLoginInfo (state, loginInfo) {
        state.loginInfo = loginInfo;
        state.inited = true;
    },
    setToken (state, token) {
        state.token = token;
        sessionStorage.setItem('token', token);
    },
    logout (state) {
        state.loginInfo = JSON.parse(JSON.stringify(defaultLoginInfo));
        state.token = '';
        state.inited = false;
        sessionStorage.removeItem('token');
    }
}
const actions = {
    setLoginInfo (context, loginInfo) {
        context.commit('setLoginInfo', loginInfo);
    },
    setToken (context, authInfo) {
        context.commit('setToken', authInfo);
    },
    logout (context) {
        context.commit('logout');
    }
}

export default {
    namespaced: true,
    state, getters, mutations, actions
}