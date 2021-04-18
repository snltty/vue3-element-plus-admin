/*
 * @Author: xr
 * @Date: 2021-03-20 17:42:02
 * @LastEditors: xr
 * @LastEditTime: 2021-04-06 14:23:35
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\tabs\btnMove.js
 */

import { reactive, nextTick, onUnmounted } from 'vue'

export const useBtnMove = () => {

    const btnMoveState = reactive({
        showBtn: false,
        translateX: 0, scrollWrapDom: null, scrollDom: null
    });

    let startX = 0, wrapLeft = 0, beginX = 0, wrapWidth = 0, scrollWidth = 0;

    /**
         * @author: xr
         * @descripttion: 获取尺寸
         * @param {*}
         * @return {*}
         */
    const getTableSize = () => {
        wrapWidth = parseFloat(getComputedStyle(btnMoveState.scrollWrapDom).width);
        scrollWidth = parseFloat(getComputedStyle(btnMoveState.scrollDom).width);
    }
    /**
     * @author: xr
     * @descripttion:  判断是否需要显示按钮
     * @param {*}
     * @return {*}
     */
    const triggerShowBtn = () => {
        nextTick(() => {
            getTableSize();
            if (scrollWidth >= wrapWidth) {
                btnMoveState.showBtn = true;
            } else {
                btnMoveState.showBtn = false;
            }
        })
    }
    /**
     * @author: xr
     * @descripttion: 滚动x坐标
     * @param {*} num  滚动距离  正负数
     * @return {*}
     */
    const handleChangeX = (num) => {
        getTableSize();
        let x = btnMoveState.translateX + wrapWidth * 0.8 * num;
        let max = wrapWidth - scrollWidth - 10;
        if (x <= max) {
            x = max;
        } else if (x >= 0) {
            x = 0;
        }
        btnMoveState.translateX = x;
        triggerShowBtn();
    };
    const mouseDown = (ev) => {
        getTableSize();
        btnMoveState.scrollDom.classList.remove('trans');
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        startX = ev.clientX - wrapLeft;
        beginX = btnMoveState.translateX;
        ev.preventDefault();
    }
    const mouseMove = (ev) => {
        if (scrollWidth < wrapWidth) {
            btnMoveState.translateX = 0;
        } else {
            let x = (ev.clientX - wrapLeft - startX) + beginX;
            let max = wrapWidth - scrollWidth - 10;
            if (x <= max) {
                x = max;
            } else if (x >= 0) {
                x = 0;
            }
            btnMoveState.translateX = x;
        }
    }
    const mouseUp = (ev) => {
        btnMoveState.scrollDom.classList.add('trans');
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        ev.preventDefault();
    }

    nextTick(() => {
        triggerShowBtn();
        wrapLeft = btnMoveState.scrollWrapDom.getBoundingClientRect().left;
        btnMoveState.scrollDom.addEventListener('mousedown', mouseDown);
    });

    window.addEventListener('resize', triggerShowBtn);
    onUnmounted(() => {
        window.removeEventListener('resize', triggerShowBtn);
        btnMoveState.scrollDom.removeEventListener('mousedown', mouseDown);
    });


    return {
        btnMoveState,
        handleChangeX, triggerShowBtn
    }

}