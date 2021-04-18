/*
 * @Author: xr
 * @Date: 2021-03-20 12:22:32
 * @LastEditors: xr
 * @LastEditTime: 2021-03-20 22:08:15
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \admin-ui\src\libs\store\index.js
 */

import { useStore, mapState, mapActions } from 'vuex'

export const myMapStates = (...args) => {
    const store = useStore();
    const states = mapState(...args);

    for (let j in states) {
        states[j] = states[j].bind({ $store: store })();
    }
    return states;
}

export const myMapActions = (...args) => {
    const store = useStore();
    const actions = mapActions(...args);

    for (let j in actions) {
        actions[j] = actions[j].bind({ $store: store });
    }
    return actions;
}