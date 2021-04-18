/*
 * @Author: xr
 * @Date: 2021-03-20 15:31:29
 * @LastEditors: xr
 * @LastEditTime: 2021-04-18 15:06:06
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \ui\src\components\contextMenu\js.js
 */

import { inject, onUnmounted, provide, reactive } from 'vue'

const contextMenuName = Symbol();
export const useContextMenu = () => {
    return inject(contextMenuName);
}
export const initContextMenu = () => {
    const state = reactive({
        show: false,
        x: 0, y: 0,
        data: [
            { 'text': '关闭' }
        ]
    });

    const click = () => state.show = false;
    document.addEventListener('click', click);
    onUnmounted(() => document.removeEventListener('click', click));
    const handleShowContextMenu = ({ x = 0, y = 0, data = [] }) => {
        state.data = data || [];
        state.show = true;
        state.x = x;
        state.y = y;
    }

    provide(contextMenuName, state);

    return {
        state, handleShowContextMenu
    };
}