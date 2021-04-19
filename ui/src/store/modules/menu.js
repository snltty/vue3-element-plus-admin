/*
 * @Author: xr
 * @Date: 2021-03-20 21:19:21
 * @LastEditors: xr
 * @LastEditTime: 2021-04-19 16:33:06
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\store\modules\menu.js
 */
import config from '../../configs/index'

const setCache = (state) => {
    sessionStorage.setItem('menu-cache', JSON.stringify(state));
};
const getCache = () => {
    return {
        group: '默认分组',
        authMenus: JSON.parse(sessionStorage.getItem('menu-cache') || JSON.stringify([config.homeName])),
        inited: false,
    }
}

const state = getCache();
const getters = {
}
const mutations = {
    changeGroup (state, name) {
        state.group = name;
    },
    changeAuthMenus (state, authMenus) {
        state.authMenus = authMenus.concat([config.homeName]);
        state.inited = true;
        setCache(state);
    },
    addAuthMenus (state, authMenus) {
        state.authMenus = state.authMenus.concat(authMenus);
        setCache(state);
    },
    removeAuthMenus (state, authMenus) {
        state.authMenus = state.authMenus.filter(c => authMenus.indexOf(c) === -1);
        setCache(state);
    },
    clear (state) {
        state.authMenus = [];
        state.inited = false;
        setCache(state);
    }
}
const actions = {
    changeGroup (context, name) {
        context.commit('changeGroup', name);
    },
    changeAuthMenus (context, authMenus = []) {
        context.commit('changeAuthMenus', authMenus);
    },
    addAuthMenus (context, authMenus) {
        context.commit('addAuthMenus', authMenus);
    },
    removeAuthMenus (context, authMenus) {
        context.commit('removeAuthMenus', authMenus);
    },
    clear (context) {
        context.commit('clear');
    }
}

export default {
    namespaced: true,
    state, getters, mutations, actions
}