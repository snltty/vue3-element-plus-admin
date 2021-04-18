/*
 * @Author: xr
 * @Date: 2021-03-20 21:19:21
 * @LastEditors: xr
 * @LastEditTime: 2021-03-25 00:25:26
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \admin-ui\src\store\modules\tabs.js
 */
import router from '../../router/index'


const state = {
    keepLiveRoute: []
};
const getters = {
}
const mutations = {
    changeKeepLiveRoutes (state, names) {
        state.keepLiveRoute = names;
    }
}
const actions = {
    changeKeepLiveRoutes (context, names) {
        context.commit('changeKeepLiveRoutes', names);
    }
}

export default {
    namespaced: true,
    state, getters, mutations, actions
}